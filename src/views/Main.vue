<template>
  <div class="main">
    <UserCreateTweet @after-show-tweet-modal="afterShowModal"/>
    <TweetCards @after-show-reply-modal="afterShowReplyModal"/>
  </div>
</template>

<script>
import UserCreateTweet from '../components/UserCreateTweet.vue'
import TweetCards from '../components/TweetCards.vue'

export default {
  name: 'UserMain',
  components: {
    UserCreateTweet,
    TweetCards,
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    afterShowModal() {
      this.$emit("after-show-tweet-modal");
    },
    afterShowReplyModal(replyTweetId) {
      this.$emit("after-show-reply-modal",replyTweetId);
    },
  },
}
</script>
