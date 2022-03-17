// src/components/ReplyListTweet.vue
// ReplyList.vue使用
<template>
  <div class="w-100">
    <div class="wrapper d-flex">
      <img
        @click.stop.prevent="goBack"
        class="arrow"
        src="https://i.imgur.com/3y7W3fG.png"
        alt=""
      />
      <h5 class="returnTweet">推文</h5>
    </div>
    <div class="wrapper">
      <div class="user d-flex" @click.stop.prevent="toUserPage">
        <img
          class="avatar"
          :data-userId="tweet.UserId"
          :src="tweet.tweetedUser.avatar | emptyImage"
          alt=""
        />
        <div class="info py-3">
          <h5 class="account" :data-userId="tweet.UserId">
            {{ tweet.tweetedUser.name }}
          </h5>
          <h5 class="grey-font" :data-userId="tweet.UserId">
            @{{ tweet.tweetedUser.account }}
          </h5>
        </div>
      </div>
      <p class="tweetContent">
        {{ tweet.description }}
      </p>
      <div class="datetime d-flex">
        <p class="grey-font mb-3 ml-3">
          {{ tweet.updatedAt | formatDate }}
        </p>
      </div>
    </div>
    <div class="wrapper d-flex">
      <span class="record d-flex">
        <p class="number">{{ tweet.totalReplies }}</p>
        <p class="text">回覆</p>
      </span>
      <span class="record d-flex">
        <p class="number">{{ tweet.totalLikes }}</p>
        <p class="text">喜歡次數</p>
      </span>
    </div>
    <div class="wrapper">
      <div class="d-flex justify-content-between p-3 w-50">
        <img
          @click.stop.prevent="afterShowReplyModal(tweet.id)"
          class="icon"
          :src="iconReply"
          alt=""
        />
        <button :disabled="isProcessing">
          <img
            class="icon"
            @click.stop.prevent="clickLikeBtn(tweet.isLiked, tweet.id)"
            :src="tweet.isLiked === false ? iconUnLike : iconIsLike"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateFilter } from "./../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import tweetAPI from "../apis/tweetData";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [formatDateFilter, emptyImageFilter],
  props: {
    tweet: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      iconUnLike: "https://i.imgur.com/fWY8yOj.png",
      iconIsLike: "https://i.imgur.com/LQTMNI0.png",
      likeIcon: "",
      iconReply: "https://i.imgur.com/EwJRYkP.png",
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    clickLikeBtn(status, tweetId) {
      if (status === false) {
        this.isProcessing = true;
        this.addTweetCardLike(tweetId);
        event.target.src = this.iconIsLike;
        this.tweet.isLiked = true;
        this.tweet.totalLikes += 1;
      } else {
        this.isProcessing = true;
        this.deleteTweetLike(tweetId);
        event.target.src = this.iconUnLike;
        this.tweet.isLiked = false;
        this.tweet.totalLikes -= 1;
      }
    },
    async addTweetCardLike(id) {
      try {
        this.isProcessing = true;
        await tweetAPI.addTweetLike(id);

        Toast.fire({
          icon: "success",
          title: "成功加入喜歡的內容",
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

        Toast.fire({
          icon: "success",
          title: "成功取消喜歡的內容",
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
    goBack() {
      this.$router.back();
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
    afterShowReplyModal(replyTweetId) {
      this.$emit("after-show-reply-modal", replyTweetId);
    },
  },
};
</script>


<style scoped lang="scss">
@import "../assets/scss/reply.scss";
</style>