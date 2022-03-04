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
      <div class="chatroom-message-container">
        未處理 公開聊天內容區 ???????
      </div>
      <div class="chatroom-panel">
        <input
          class="chatroom-input"
          placeholder="輸入訊息..."
          type="text"
        />
        <button type="submit" class="chatroom-btn">
          <img class="chatroom-img" src="https://i.imgur.com/1WQnkAO.png" />
        </button>
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
    };
  },
  methods: {
    afterShowTweetModal() {
      console.log("afterShowModal--Setting");
      this.showModal = true;
    },
    afterHideModal() {
      console.log("afterHideModal--Setting");
      this.showModal = false;
    },
  },
  // computed: {
  //   ...mapState(["currentUser"]),
  // },
};
</script>

<style scoped>
/* 左區卡片 */
.chatroom-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

/* 右區聊天室 */
.chatroom-content {
  min-width: 600px;
  border-right: 1px solid #e6ecf0;
}

.chatroom-content-title {
  height: 74px;
  line-height: 37px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid #e6ecf0;
}

/* 聊天內容區 */
.chatroom-message-container {
  height: calc(100vh - 130px);
}

.chatroom-panel{
  height: 64px;
  padding: 10px;
  display: flex;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}

.chatroom-input{
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
.chatroom-btn {
  margin-bottom: 10px;
}
.chatroom-img {
  width: 25px;
  height: 25px;
}
</style>
