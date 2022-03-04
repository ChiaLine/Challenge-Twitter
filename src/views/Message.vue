<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />
    <div class="message-users">
      <MessageUserCards />
    </div>
    <div class="message-content">
        <p class="message-content-name">name</p>
        <span class="message-content-account">@account</span>
        <div class="m-5">未處理 個人聊天 輸入框 內容區 ???????</div>
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
.message-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.message-content {
  min-width: 600px;
  height: 74px;
  border-bottom: 1px solid #e6ecf0;
}
.message-content-name {
  margin-left: 24px;
  font-size: 24px;
  font-weight: 700;
}
.message-content-account {
  margin-left: 24px;
}
</style>
