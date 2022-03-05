<template>
  <div>
    <p class="tweet-title">首頁</p>
    <div
      class="create-tweet-card"
      @click.stop.prevent="handleTweetButtonCard()"
    >
      <div class="tweet-card-img-container">
        <img class="tweet-card-img" :src="currentUser.avatar | emptyImage" />
      </div>
      <span class="tweet-card-title">有什麼新鮮事?</span>
      <button class="tweet-card-button" @click.stop.prevent="handleTweetButtonCard()">
        推文
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { emptyImageFilter } from '../utils/mixins'

export default {
  name: "userCreateTweet",
  mixins: [ emptyImageFilter ],
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    handleTweetButtonCard() {
      this.$emit("after-show-tweet-modal");
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/user-create-tweet.scss";
</style>
