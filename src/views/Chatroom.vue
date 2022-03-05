<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />

    <!-- 左區卡片 -->
    <div class="chatroom-users">
      <ChatroomUserCards />
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
            :key="message.id"
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
                <img :src="message.avatar" alt="avatar" />
              </div>
              <div class="content-container">
                <div class="text">
                  {{ message.content }}
                </div>
                <p class="time">{{ message.time }}</p>
              </div>
            </div>
            <!-- 3:自己的訊息 -->
            <div v-if="message.typeId === 3" class="card-self-container">
              <div class="text">
                {{ message.content }}
              </div>
              <p class="time">{{ message.time }}</p>
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
import ChatroomUserCards from "../components/ChatroomUserCards.vue";
import TweetModal from "../components/TweetModal.vue";
// import { mapState } from "vuex";

// import { socketApiHelper } from './../utils/helpers';

const dummyMessages = [
  {
    id: 1,
    content: "罐子離線",
    typeId: 1,
    type: "notification",
    createdAt: "上午3:59",
    avatar: "",
  },
  {
    id: 2,
    content:
      "Christine早安！下午見。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 2,
    type: "other",
    createdAt: "上午3:25",
    avatar: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_143.jpg",
  },
  {
    id: 3,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 4,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 5,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 6,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 7,
    content:
      "Christine早安！下午見。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 2,
    type: "other",
    createdAt: "上午3:25",
    avatar: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_143.jpg",
  },
  {
    id: 8,
    content: "罐子上線",
    typeId: 1,
    type: "notification",
    createdAt: "上午3:59",
    avatar: "",
  },
];

const URL1 = "https://twitter-api-chatroom.herokuapp.com/";
// const URL2 = "http://127.0.0.1:3000";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJlbWFpbCI6InVzZXIxMEBleGFtcGxlLmNvbSIsImFjY291bnQiOiJ1c2VyMTAiLCJuYW1lIjoidXNlcjEwIiwiYXZhdGFyIjoiaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS9wb3J0cmFpdHMvbWVuLzM4LmpwZyIsImNvdmVyIjpudWxsLCJpbnRyb2R1Y3Rpb24iOiJCZWF0YWUgb2NjYWVjYXRpIGVsaWdlbmRpIGRlbGVjdHVzIGF1dGVtLiIsInJvbGUiOiJ1c2VyIiwidG90YWxUd2VldHMiOjEwLCJ0b3RhbEZvbGxvd2luZ3MiOjMsInRvdGFsRm9sbG93ZXJzIjo1LCJ0b3RhbExpa2VkIjozLCJjcmVhdGVkQXQiOiIyMDIyLTAzLTAzVDEyOjUwOjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAzLTA0VDEyOjM3OjQ2LjAwMFoiLCJpYXQiOjE2NDY0NjM2NDYsImV4cCI6MTY0OTA1NTY0Nn0.ws0oTXDOkMLJJdT12cCSwOOHFdsrS9hX21LUfjKsIyU";

const { io } = require("socket.io-client");

const socket = io(URL1, {
  auth: { token: TOKEN },
});

// 這是接收目前在聊天室的使用者清單
socket.on("users", (users) => {
  console.log(users);
  // users.forEach(user => {
  //   const item = document.createElement('li')
  //   item.textContent = user.name
  //   usersPanel.appendChild(item)
  // })
});

// 接收訊息
socket.on("public message", (msg) => {
  console.log(msg);
  // const item = document.createElement("li");
  // item.textContent = msg;
  // messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
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
      messages: dummyMessages,
      inputMessage: "",
    };
  },
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    sendMessage() {
      if (this.inputMessage) {
        console.log('送出訊息')
        socket.emit("public message", this.inputMessage);
        this.inputMessage = "";
      }
    },
  },
  // computed: {
  //   ...mapState(["currentUser"]),
  // },
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
