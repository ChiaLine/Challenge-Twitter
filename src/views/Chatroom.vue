<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />
    <div class="chatroom-users">
     <ChatroomUserCards />
    </div>
    <div class="chatroom-content">
      <h5 class="chatroom-content-title p-3">公開聊天室</h5>
      <div class="m-5">未處理 公開聊天 輸入框 內容區 ???????</div>
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
.chatroom-users {
  min-width: 390px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.chatroom-content {
  min-width: 600px;
  height: 74px;
  border-bottom: 1px solid #e6ecf0;
}

.chatroom-content-title {
  line-height: 37px;
  font-size: 24px;
  font-weight: 700;
}
</style>