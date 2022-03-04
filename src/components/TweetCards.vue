<template>
  <div class="tweet-cards">
    <div class="tweet-card" v-for="card in tweetCards" :key="card.id">
      <div class="tweet-card-top">
        <div class="tweet-card-avatar">
          <div @click.stop.prevent="toUserPage">
            <img
              class="tweet-card-img"
              :data-userId="card.UserId"
              :src="card.tweetedUser.avatar | emptyImage"
            />
          </div>
        </div>
        <div
          class="tweet-card-content"
          @click.stop.prevent="toReplyList"
          :data-cardId="card.id"
        >
          <div>
            <span :data-cardId="card.id" class="tweet-card-name">{{
              card.tweetedUser.name
            }}</span>
            <span :data-cardId="card.id" class="tweet-card-account">
              @{{ card.tweetedUser.account }}．{{
                card.createdAt | formatDate
              }}
            </span>
            <p :data-cardId="card.id" class="tweet-card-description">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="tweet-card-icons">
        <button
          class="tweet-reply-icon"
          @click.stop.prevent="handleTweetCardReplyButton(card.id)"
        >
          <img class="icon-reply" :src="iconReply" />
          <span>{{ card.totalReplies }}</span>
        </button>
        <button
          class="tweet-like-icon"
          @click.stop.prevent="deleteTweetLike(card.id)"
          v-if="card.isLiked"
          :disabled="isProcessing"
        >
          <img class="icon-like" :src="iconIsLike" />
          <span>{{ card.totalLikes }}</span>
        </button>
        <button
          class="tweet-like-icon"
          @click.stop.prevent="addTweetCardLike(card.id)"
          v-else
          :disabled="isProcessing"
        >
          <img class="icon-like" :src="iconUnLike" />
          <span>{{ card.totalLikes }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { formatDateFilter } from "./../utils/mixins";
import tweetAPI from "../apis/tweetCards";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "TweetCards",
  data() {
    return {
      tweetCards: [],
      iconUnLike: "https://i.imgur.com/fWY8yOj.png",
      iconIsLike: "https://i.imgur.com/LQTMNI0.png",
      iconReply: "https://i.imgur.com/EwJRYkP.png",
      isProcessing: false,
    };
  },
  mixins: [emptyImageFilter, formatDateFilter],
  created() {
    this.fetchTweetCards();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchTweetCards() {
      try {
        const response = await tweetAPI.getTweetCards();
        const { data } = response;
        this.tweetCards = data;
      } catch (error) {
        console.error(error);
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    handleTweetCardReplyButton(replyTweetId) {
      this.$emit("after-show-reply-modal", replyTweetId);
    },
    async addTweetCardLike(id) {
      try {
        this.isProcessing = true;
        await tweetAPI.addTweetLike(id);
        await this.fetchTweetCards();

        Toast.fire({
          icon: "success",
          title: '成功加入喜歡的內容',
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    async deleteTweetLike(id) {
      try {
        this.isProcessing = true;
        await tweetAPI.deleteTweetLike(id);
        await this.fetchTweetCards();

        Toast.fire({
          icon: "success",
          title: '成功取消喜歡的內容',
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    toReplyList(e) {
      // 點選區塊後轉址到
      const cardId = e.target.dataset.cardid;
      if (cardId) {
        this.$router.push({
          name: "ReplyList",
          params: { id: cardId },
        });
      }
    },
    toUserPage(e) {
      const avatarUserId = Number(e.target.dataset.userid);
      const currentUserId = this.currentUser.id;
      if (avatarUserId === currentUserId) {
        this.$router.push({ name: "UserSelf" });
      } else if (avatarUserId) {
        this.$router.push({ name: "UserOther", params: { id: avatarUserId } });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/tweet-cards.scss";
</style>
