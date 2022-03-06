<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />

    <!-- 左區卡片 -->
    <div class="message-users">
      <MessageUserCards :rooms="rooms" @change-room-id="changeRoomId" />
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
          <input
            @keyup.enter="sendMessage"
            v-model="inputMessage"
            type="text"
            placeholder="輸入訊息..."
          />
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
      rooms: [],
      previousMessages: [],
      currentRoomId: -1,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mixins: [emptyImageFilter, formatDateFilter],
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    changeRoomId(newRoomId) {
      console.log("newRoomId", newRoomId);
      this.currentRoomId = newRoomId;
    },
    sendMessage() {
      if (this.inputMessage) {
        console.log("sendMessage: ", this.inputMessage);
        this.$socket.client.emit("private message", {
          roomId: this.currentRoomId,
          message: this.inputMessage,
        });
        this.inputMessage = "";
      }
    },
    // 頁面切換時呼叫(created)
    connectUser() {
      console.log("進入私人聊天室");
      this.$socket.client.emit("enter private room");
    },
    // 頁面離開時呼叫(beforeDestroy)
    disconnectUser() {
      console.log("離開私人聊天室");
      // this.$socket.client.emit("leave chatroom");
    },
  },
  // 監聽事件放的位置
  sockets: {
    connect: function () {
      console.log("私人聊天室 web socket success");
    },
    // 獲取歷史聊天紀錄（???）
    [`render private messages`]: function (msg) {
      console.log("獲取歷史訊息: ", msg);
    },
    // 接收私信列表
    [`private message list`]: function (users) {
      console.log("接收私信列表: ", users);
      this.rooms = users;
    },
    // 接收私人消息
    [`private message`]: function (msg) {
      console.log("接收私人訊息: ", msg);
    },
  },
  created() {
    console.log("私人聊天室", this.previousMessages.length);
    // 告知伺服器使用者上線
    this.connectUser();
  },
  beforeDestroy() {
    // 離開頁面時告知後端伺服器
    this.disconnectUser();
    // 新增
    // this.$socket.client.off("render private messages");
    // this.$socket.client.off("private message list");
    // this.$socket.client.off("private message");
  },
};
</script>

<style lang="scss" scoped>
// 聊天室訊息輸入框、訊息顯示區域設定
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
  color: #6c757d;
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
