<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />

    <!-- 左區卡片 -->
    <div class="message-users">
      <MessageUserCards />
    </div>

    <!-- 右區聊天室 -->
    <div class="message-content">
      <div class="message-content-title">
        <p class="message-content-name">name</p>
        <span class="message-content-account">@account</span>
      </div>
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
      <input v-model="inputMessage" type="text" placeholder="輸入訊息..." />
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
import TweetModal from "../components/TweetModal.vue";
import MessageUserCards from "../components/MessageUserCards.vue";
import { mapState } from "vuex";
import { formatDateFilter } from "./../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";

const URL1 = "https://twitter-api-chatroom.herokuapp.com/";
const TOKEN = localStorage.getItem('token')

const { io } = require("socket.io-client");

const socket = io(URL1, {
  auth: { token: TOKEN },
});


export default {
  name: "Message",
  components: {
    NavBar,
    TweetModal,
    MessageUserCards,
  },
  data() {
    return {
      showModal: false,
      messages: [],
      inputMessage: "",
    };
  },
  mixins: [emptyImageFilter, formatDateFilter],
  created() {
    // 這是接收目前在聊天室的使用者清單
    socket.on("users", (users) => {
      console.log('目前在聊天室的使用者清單', users);
    });

    // 接收訊息
    socket.on("public message", (msg) => {
      console.log(msg);
      console.log(typeof msg);
      if (msg.senderId === this.currentUser.id) {
        console.log("self msg");
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
        console.log("other msg");
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
    // 接收使用者上線通知
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
    // 接收使用者離線通知
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
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    // 這是送出聊天內容的按鈕
    sendMessage() {
      if (this.inputMessage) {
        console.log('送出訊息')
        socket.emit("public message", this.inputMessage);
        this.inputMessage = "";
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/chatroom.scss";
/* 左區卡片 */
.message-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

/* 右區聊天室 */
.message-content {
  min-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.message-content-title {
  height: 74px;
  border-bottom: 1px solid #e6ecf0;
}

.message-content-name {
  margin-left: 24px;
  font-size: 24px;
  font-weight: 700;
}

.message-content-account {
  margin-left: 20px;
  color: #6C757D;
}

/* 聊天內容區 */
.message-container {
  height: calc(100vh - 130px);
}
.message-panel {
  height: 64px;
  padding: 10px;
  display: flex;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}
.message-input {
  flex: 1;
  height: 35px;
  outline: none;
  border: none;
  padding: 10px;
  background: #e6ecf0;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 500;
}
.message-btn {
  margin-bottom: 10px;
}
.message-img {
  width: 25px;
  height: 25px;
}
</style>
