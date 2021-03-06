<template>
  <div class="follow-cards">
    <template v-if="dataId === 1">
      <div
        v-for="user in userFollowers"
        :key="user.id"
        class="follow-card d-flex"
      >
        <img :src="user.avatar | emptyImage" alt="avatar" />
        <div class="text-area flex-grow-1 d-flex flex-column">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
              <p class="name">{{ user.name }}</p>
              <p class="account">@{{ user.account }}</p>
            </div>
            <button
              v-if="user.isFollowed"
              @click.stop.prevent="deleteIsFollow(user.id)"
              class="btn following-btn"
              :disabled="isProcessing"
            >
              正在跟隨
            </button>
            <button
              v-else
              @click.stop.prevent="addIsFollow(user.id)"
              class="btn follow-btn"
              :disabled="isProcessing"
            >
              跟隨
            </button>
          </div>
          <p class="introduction">{{ user.introduction }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-for="user in userFollowings"
        :key="user.id"
        class="follow-card d-flex"
      >
        <img :src="user.avatar | emptyImage" alt="avatar" />
        <div class="text-area flex-grow-1 d-flex flex-column">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
              <p class="name">{{ user.name }}</p>
              <p class="account">@{{ user.account }}</p>
            </div>
            <button
              v-if="user.isFollowed"
              @click.stop.prevent="deleteIsFollow(user.id)"
              class="btn following-btn"
              :disabled="isProcessing"
            >
              正在跟隨
            </button>
            <button
              v-else
              @click.stop.prevent="addIsFollow(user.id)"
              class="btn follow-btn"
              :disabled="isProcessing"
            >
              跟隨
            </button>
          </div>
          <p class="introduction">{{ user.introduction }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
import userFollowAPI from "./../apis/followData";
import store from "./../store";
import { mapState } from "vuex";

export default {
  name: "FollowCards",
  props: {
    dataId: {
      type: Number,
      default: 1,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      isProcessing: false,
    };
  },
  computed: {
    // 當 vuex 的 userFollowings, userFollowers 改變，得到新資料並重新渲染
    ...mapState(["userFollowings", "userFollowers"]),
  },
  created() {
    this.fetchCardsData();
  },
  methods: {
    // TODO: isLoading
    async fetchCardsData() {
      const { id: userId } = this.$route.params;
      try {
        if (this.dataId === 1) {
          // 呼叫 vuex 串接跟隨者
          await store.dispatch("fetchUserFollowers", { userId });
        } else {
          // 呼叫 vuex 串接正在跟隨的使用者
          await store.dispatch("fetchUserFollowings", { userId });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addIsFollow(userId) {
      try {
        this.isProcessing = true;
        await userFollowAPI.addFollowed({ id: userId });
        await this.fetchCardsData();
        await store.dispatch("fetchPopularUsers");
        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });
        this.isProcessing = false;
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試..",
        });
        this.isProcessing = false;
      }
    },
    async deleteIsFollow(userId) {
      try {
        this.isProcessing = true;
        await userFollowAPI.DeleteFollowed(userId);
        await this.fetchCardsData();
        await store.dispatch("fetchPopularUsers");
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
        this.isProcessing = false;
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試..",
        });
        this.isProcessing = false;
      }
    },
  },
  watch: {
    dataId: function () {
      // dataId 改變時，更新卡片資料
      this.fetchCardsData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/follow-cards.scss";
</style>

