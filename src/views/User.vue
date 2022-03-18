<template>
  <div class="user row">
    <NavBar class="col-2" @after-show-tweet-modal="afterShowTweetModal" />
    <router-view
      class="col-7"
      @after-show-tweet-modal="afterShowTweetModal"
      @after-show-reply-modal="afterShowReplyModal"
      @after-show-user-edit-modal="afterShowUserEditModal"
    />
    <PopularUsers class="col-3 popular-none"/>
    <TweetModal v-if="showTweetModal" @after-hide-modal="afterHideTweetModal" />
    <ReplyModal
      v-if="showReplyModal"
      @after-hide-reply-modal="afterHideReplyModal"
      :reply-tweet-id="replyTweetId"
    />
    <UserEditModal
      v-if="showUserEditModal"
      @after-hide-user-edit-modal="userEditModalOff"
    />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import TweetModal from "../components/TweetModal.vue";
import ReplyModal from "../components/ReplyModal.vue";
import UserEditModal from "../components/UserEditModal.vue";

export default {
  name: "User",
  components: {
    NavBar,
    PopularUsers,
    TweetModal,
    ReplyModal,
    UserEditModal,
  },
  data() {
    return {
      showTweetModal: false,
      showReplyModal: false,
      showUserEditModal: false,
      replyTweetId: -1,
    };
  },
  methods: {
    // Tweet Modal
    afterShowTweetModal() {
      this.showTweetModal = true;
    },
    afterHideTweetModal() {
      this.showTweetModal = false;
    },
    // ReplyModal
    afterShowReplyModal(replyTweetId) {
      this.showReplyModal = true;
      this.replyTweetId = replyTweetId;
    },
    afterHideReplyModal() {
      this.showReplyModal = false;
    },
    // UserEditModal
    afterShowUserEditModal() {
      this.showUserEditModal = true;
    },
    userEditModalOff() {
      this.showUserEditModal = false;
    },
  },
};
</script>
