// src/views/ReplyList.vue
<template>
  <div class="replyList">
    <ReplyListTweet v-show="!tweetIsLoading" :tweet="tweet" @after-show-reply-modal="afterShowReplyModal" />
    <div class="w-100">
      <ReplyListCards
        v-show="!cardsIsLoading"
        v-for="card in replyListCards"
        :key="card.id"
        :card="card"
        :tweetedUser="tweetedUser"
      />
    </div>
  </div>
</template>

<script>
import ReplyListTweet from "./../components/ReplyListTweet";
import ReplyListCards from "./../components/ReplyListCards";
import replyListAPI from "./../apis/replyData";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    ReplyListTweet,
    ReplyListCards,
  },
  data() {
    return {
      tweet: {},
      replyListCards: [],
      tweetedUser: "",
      tweetIsLoading: true,
      cardsIsLoading: true,
    };
  },
  created() {
    const tweetCardId = this.$route.params.id;
    this.fetchReplyListTweet(tweetCardId);
    this.fetchReplyListCards(tweetCardId);
  },
  methods: {
    async fetchReplyListTweet(tweetId) {
      try {
        let { data } = await replyListAPI.getReplyListTweet(tweetId);
        this.tweet = data;
        this.tweetIsLoading = false;
        this.tweetedUser = data.tweetedUser.account;
      } catch (error) {
        this.tweetIsLoading = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },

    async fetchReplyListCards(tweetId) {
      try {
        let { data } = await replyListAPI.getReplyListCards(tweetId);
        this.replyListCards = data;
        this.cardsIsLoading = false;
      } catch (error) {
        this.cardsIsLoading = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    afterShowReplyModal(replyTweetId) {
      this.$emit("after-show-reply-modal",replyTweetId)
    },
  },
};
</script>


<style scoped>
.replyList {
  width: 600px;
  /* border-radius: 5px; */
  /* border: 1px solid #e6ecf0; */
  /* background-color: rgb(238, 236, 234); */
}
</style>