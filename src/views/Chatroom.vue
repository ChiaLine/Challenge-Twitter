<template>
  <div class="h-100 d-flex justify-content-center">
    <NavBar @after-show-tweet-modal="afterShowTweetModal" />
    <div class="chatroom-users">
     <ChatroomUserCards />
    </div>
    <div class="chatroom-content">
      <h5 class="chatroom-content-title p-3">公開聊天室</h5>
      <PublicChat />
    </div>
    <TweetModal v-if="showModal" @after-hide-modal="afterHideModal" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ChatroomUserCards from "../components/ChatroomUserCards.vue";
import PublicChat from "../components/PublicChat.vue"
import TweetModal from "../components/TweetModal.vue";
// import { mapState } from "vuex";

export default {
  name: "Chatroom",
  components: {
    NavBar,
    TweetModal,
    ChatroomUserCards,
    PublicChat,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
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