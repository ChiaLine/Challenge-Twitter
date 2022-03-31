<template>
  <div class="follow-cards">
    <div
      v-for="user in currentCardUsers"
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
      currentCardUsers: [],
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["userFollowings", "userFollowers"]),
  },
  created() {
    this.fetchCardsData();
  },
  methods: {
    // TODO: isLoading
    // async fetchCardsData() {
    //   const { id: userId } = this.$route.params;
    //   try {
    //     if (this.dataId === 1) {
    //       // 串接跟隨者
    //       let response = await userFollowAPI.getUserFollowers(userId);
    //       const { data } = response;
    //       this.currentCardUsers = data;
    //       if (data.length === 0) {
    //         Toast.fire({
    //           icon: "warning",
    //           title: "沒有跟隨者",
    //         });
    //       }
    //     } else {
    //       // 串接正在跟隨的使用者
    //       let response = await userFollowAPI.getUserFollowings(userId);
    //       const { data } = response;
    //       this.currentCardUsers = data;
    //       if (data.length === 0) {
    //         Toast.fire({
    //           icon: "warning",
    //           title: "沒有正在跟隨的使用者",
    //         });
    //       }
    //     }
    //   } catch (e) {
    //     Toast.fire({
    //       icon: "warning",
    //       title: e.response.data.message,
    //     });
    //   }
    // },
    async fetchCardsData() {
      const { id: userId } = this.$route.params;
      try {
        if (this.dataId === 1) {
          // 串接跟隨者
          await store.dispatch("fetchUserFollowers", { userId });
          this.currentCardUsers = this.userFollowers;
        } else {
          // 串接正在跟隨的使用者
          await store.dispatch("fetchUserFollowings", { userId });
          this.currentCardUsers = this.userFollowings;
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
        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });
        this.isProcessing = false;
        this.$router.go(0);
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
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
        this.isProcessing = false;
        this.$router.go(0);
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
      this.fetchCardsData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/follow-cards.scss";
</style>

