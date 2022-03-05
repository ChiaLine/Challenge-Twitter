<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />

    <!-- 左區卡片 -->
    <div class="chatroom-users">
      <ChatroomUserCards :users="users"/>
    </div>

    <!-- 右區聊天室 -->
    <div class="chatroom-content">
      <h5 class="chatroom-content-title p-3">公開聊天室</h5>
      <div class="chatroom-container">
        <div class="display-container">
          <!-- 注意！訊息上下順序是相反的(column-reverse) -->
          <!-- 判斷是哪種訊息，搭配對應的class -->
          <div
            v-for="message in messages"
            :key="message.index"
            :class="{
              notification: message.typeId === 1,
              'card-other': message.typeId === 2,
              'card-self': message.typeId === 3,
            }"
          >
            <!-- v-if判斷相應內容 -->
            <!-- 1:上線離線通知 -->
            <span v-if="message.typeId === 1">{{ message.content }}</span>
            <!-- 2:其他使用者的訊息 -->
            <div v-if="message.typeId === 2" class="card-other-container">
              <div class="img-container">
                <img :src="message.avatar | emptyImage" alt="avatar" />
              </div>
              <div class="content-container">
                <div class="text">
                  {{ message.content }}
                </div>
                <p class="time">{{ message.time | formatDate }}</p>
              </div>
            </div>
            <!-- 3:自己的訊息 -->
            <div v-if="message.typeId === 3" class="card-self-container">
              <div class="text">
                {{ message.content }}
              </div>
              <p class="time">{{ message.time | formatDate }}</p>
            </div>
          </div>
        </div>
        <div class="input-container">
          <input @keyup.enter="sendMessage" v-model="inputMessage" type="text" placeholder="輸入訊息..." />
          <button @click="sendMessage">
            <img src="https://i.imgur.com/Jrjlukd.jpg" alt="" />
          </button>
        </div>
      </div>
    </div>
    
    <TweetModal v-if="showModal" @after-hide-modal="afterHideModal" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ChatroomUserCards from "../components/ChatroomUserCards.vue";
import TweetModal from "../components/TweetModal.vue";
import { mapState } from "vuex";
import { formatDateFilter } from "./../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";

// 正式後端伺服器
const URL1 = "https://twitter-api-chatroom.herokuapp.com/";

// 0305晚上靜易的測試伺服器，有些功能正式版還沒有，但不一定會開
// const URL1 = "https://dd0f-150-117-29-118.ngrok.io";

// 注意！helpers.js的baseURL也需要切換到同一個伺服器
// 目前正常顯示上下線通知、歷史聊天紀錄等功能，尚未發布到正式伺服器，因此更新前會收不到

// 取當前使用者token
const TOKEN = localStorage.getItem("token");

const { io } = require("socket.io-client");

const socket = io(URL1, {
  auth: { token: TOKEN },
});

export default {
  name: "Chatroom",
  components: {
    NavBar,
    TweetModal,
    ChatroomUserCards,
  },
  data() {
    return {
      showModal: false,
      messages: [],
      inputMessage: "",
      users: [],
    };
  },
  mixins: [emptyImageFilter, formatDateFilter],
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    sendMessage() {
      if (this.inputMessage) {
        socket.emit("public message", this.inputMessage);
        this.inputMessage = "";
      }
    },
    // 頁面切換到公開聊天室時呼叫(created)
    connectUser() {
      socket.connect();
      socket.emit("render chatroom", "我進來聊天室了");
    },
    // 頁面離開公開聊天室時呼叫(beforeDestroy)
    disconnectUser() {
      socket.disconnect(true);
    },
  },
  created() {
    // 告知伺服器使用者上線
    this.connectUser();
    // 獲取歷史聊天紀錄（後端只有在被告知使用者上線時，才會送出）
    socket.on("render chatroom", (data) => {
      console.log("msg清單: ", data);
    });
    // 這是接收目前在聊天室的使用者清單
    socket.on("users", (users) => {
      this.users = users
    });
    // 接收訊息其他使用者、自己的文字訊息
    socket.on("public message", (msg) => {
      if (msg.senderId === this.currentUser.id) {
        const thisMessage = {
          id: -1,
          content: msg.message,
          typeId: 3,
          type: "self",
          time: msg.createdAt,
          avatar: "",
        };
        this.messages.unshift(thisMessage);
      } else {
        const thisMessage = {
          id: -1,
          content: msg.message,
          typeId: 2,
          type: "other",
          time: msg.createdAt,
          avatar: msg.senderAvatar,
        };
        this.messages.unshift(thisMessage);
      }
    });
    // 接收並顯示使用者上線通知
    socket.on("user connect", (msg) => {
      const thisMessage = {
        id: -1,
        content: msg,
        typeId: 1,
        type: "notification",
        time: "",
        avatar: "",
      };
      this.messages.unshift(thisMessage);
    });
    // 接收並顯示使用者離線通知
    socket.on("user disconnect", (msg) => {
      const thisMessage = {
        id: -1,
        content: msg,
        typeId: 1,
        type: "notification",
        time: "",
        avatar: "",
      };
      this.messages.unshift(thisMessage);
    });
  },
  beforeDestroy() {
    // 離開頁面時告知後端伺服器
     this.disconnectUser();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
// 聊天室訊息輸入框、訊息顯示區域設定
@import "../assets/scss/chatroom.scss";

/* 左區卡片 */
.chatroom-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

.chatroom-content {
  min-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chatroom-content-title {
  height: 74px;
  line-height: 37px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid #e6ecf0;
}
</style>
