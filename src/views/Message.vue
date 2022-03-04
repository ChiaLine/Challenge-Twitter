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
      <div class="message-container">
        未處理 私人聊天內容區 ???????
      </div>
      <div class="message-panel">
        <input class="message-input" placeholder="輸入訊息..." type="text" />
        <button class="message-btn">
          <img class="message-img" src="https://i.imgur.com/1WQnkAO.png" />
        </button>
      </div>
    </div>

    <TweetModal v-if="showModal" @after-hide-modal="afterHideModal" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TweetModal from "../components/TweetModal.vue";
import MessageUserCards from "../components/MessageUserCards.vue";
// import { mapState } from "vuex";

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
.message-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

/* 右區聊天室 */
.message-content {
  min-width: 600px;
  border-right: 1px solid #e6ecf0;
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
