<template>
  <div class="modal-container">
    <div class="reply-modal d-flex flex-column">
      <div class="modal-header">
        <button @click.stop.prevent="hideModal">&#215;</button>
      </div>
      <div class="modal-body d-flex flex-column">
        <!-- 被回覆留言區塊 -->
        <div v-if="!isLoading" class="replied-tweet d-flex">
          <div class="mr-3 d-flex flex-column align-items-center">
            <img
              :src="tweet.tweetedUser.avatar | emptyImage"
              alt="tweetedUserAvatar"
            />
            <div class="flex-grow-1 my-2 decorated-line"></div>
          </div>
          <div>
            <div class="mb-1">
              <span class="name mr-1">{{ tweet.tweetedUser.name }}</span>
              <span class="tag-group">
                <span>@{{ tweet.tweetedUser.name }}</span>
                <span class="mx-1">&#8901;</span>
                <span>{{ tweet.createdAt | fromNow }}</span>
              </span>
            </div>
            <p class="description">{{ tweet.description }}</p>
            <p class="reply-target my-3">
              回覆給<span class="orange-name ml-1"
                >@{{ tweet.tweetedUser.name }}</span
              >
            </p>
          </div>
        </div>
        <!-- 新增留言區塊 -->
        <div class="writing-tweet flex-grow-1 d-flex">
          <div class="mr-3">
            <img :src="currentUser.avatar | emptyImage" alt="user image" />
          </div>
          <div class="flex-grow-1 d-flex flex-column align-items-end">
            <textarea
              type="text"
              class="flex-grow-1 pt-2 w-100"
              v-model="tweetContent"
              placeholder="推你的回覆"
            ></textarea>
            <div>
              <span class="warning">{{ warningContent }}</span>
              <button @click.stop.prevent="handleSubmit" :disabled="isProcessing">回覆</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";
import replyModalAPI from "./../apis/replyModal";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "ReplyModal",
  props: {
    replyTweetId: {
      type: Number,
      required: true,
    },
  },
  mixins: [emptyImageFilter, fromNowFilter],
  data() {
    return {
      tweet: "",
      tweetContent: "",
      warningContent: "",
      // render和請求被回覆的tweet有秒差，加入isLoading
      isLoading: true,
      isProcessing: false,
    };
  },
  computed: {
    // 到Vuex拿取拿取當前使用者資料
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchReplyTweet();
  },
  methods: {
    hideModal() {
      // 待優化: 可在關掉時，警告使用者未完成推文會消失
      this.tweetContent = "";
      this.warningContent = "";
      this.$emit("after-hide-reply-modal");
    },
    // 請求回傳被回覆的tweet資料
    async fetchReplyTweet() {
      try {
        const id = this.replyTweetId;
        let response = await replyModalAPI.getReplyListTweet(id);
        const { data } = response;
        this.tweet = data;
        this.isLoading = false;
      } catch (e) {
        Toast.fire({
          icon: "warning",
          title: e.response.data.message,
        });
      }
    },
    async handleSubmit() {
      let tweetId = this.replyTweetId;
      let comment = this.tweetContent;
      try {
        // 待優化: 即時回饋使用者是否超過140字
        // 字數驗證
        if (comment.trim().length === 0) {
          this.warningContent = "內容不可空白";
          return;
        } else if (comment.length > 140) {
          // TODO: 目前的字數計算方式，會在135字左右就被擋
          this.warningContent = "字數不可超過140字";
          return;
        }
        this.warningContent = "";
        // 發送推文內容至後端伺服器
        this.isProcessing = true;
        let response = await replyModalAPI.postTweetReply({ tweetId, comment });
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }
        // 發送成功提示
        Toast.fire({
          icon: "success",
          title: "成功發送回覆！",
        });
        this.isProcessing = false;
        this.hideModal();
        // TODO: 強制重整畫面顯示新推文，未來可再優化。
        this.$router.go(0);
      } catch (e) {
        Toast.fire({
          icon: "warning",
          title: e.response.data.message,
        });
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/reply-modal.scss";
</style>

