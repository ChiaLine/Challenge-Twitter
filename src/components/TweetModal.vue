<template>
  <div class="modal-container">
    <div class="tweet-modal d-flex flex-column">
      <div class="modal-header">
        <button @click.stop.prevent="hideModal">&#215;</button>
      </div>
      <div class="modal-body d-flex">
        <div class="mr-3">
          <img :src="this.currentUser.avatar | emptyImage" alt="user image" />
        </div>
        <div class="flex-grow-1 d-flex flex-column align-items-end">
          <textarea
            type="text"
            class="flex-grow-1 w-100 py-2"
            v-model="tweetContent"
            placeholder="有什麼新鮮事？"
          ></textarea>
          <div>
            <span class="warning">{{ warningContent }}</span>
            <button @click.stop.prevent="handleSubmit" :disabled="isProcessing">
              推文
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import tweetAPI from "./../apis/tweetData";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tweetContent: "",
      warningContent: "",
      isProcessing: false,
    };
  },
  mixins: [emptyImageFilter],
  computed: {
    // 到Vuex拿取拿取當前使用者資料
    ...mapState(["currentUser"]),
  },
  methods: {
    hideModal() {
      // 待優化: 可在關掉時，警告使用者未完成推文會消失
      this.tweetContent = "";
      this.warningContent = "";
      this.$emit("after-hide-modal");
    },
    async handleSubmit() {
      try {
        let description = this.tweetContent;
        // 字數驗證
        if (description.trim().length === 0) {
          this.warningContent = "內容不可空白";
          return;
        } else if (description.length > 140) {
          // TODO: 目前的字數計算方式，會在135字左右就被擋，因為換行符號會被算入
          this.warningContent = "字數不可超過140字";
          return;
        }
        this.warningContent = "";
        this.isProcessing = true;
        // 發送推文內容至後端伺服器
        let response = await tweetAPI.postTweet({ description });
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 發送成功提示
        // this.$emit("after-tweet"); ??
        Toast.fire({
          icon: "success",
          title: "成功發送推文！",
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
  // 待優化: 即時回饋使用者是否超過140字
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/tweet-modal.scss";
// TODO: 讓isProcessing按鈕樣式更明顯
</style>

