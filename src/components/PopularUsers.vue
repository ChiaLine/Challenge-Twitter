<template>
  <div class="popular" :class="{ active: isActive }">
    <h6 class="popular-title">Popular</h6>
    <div class="popular-card">
      <div
        class="card-body"
        v-for="user in specificAmountUsers"
        :key="user.id"
        :class="{ active: isActive }"
      >
        <div class="card-left">
          <div class="card-img" @click.stop.prevent="toUserPage(user.id)">
            <img :src="user.avatar | emptyImage" />
          </div>
          <div class="card-text">
            <p class="text-top">{{ user.name }}</p>
            <p class="text-bottom">@{{ user.account }}</p>
          </div>
        </div>
        <button
          class="button-is-follow"
          v-if="user.isFollowed"
          @click.stop.prevent="deleteIsFollowed(user.id)"
          :disabled="isProcessing"
        >
          正在跟隨
        </button>
        <button
          class="button-no-follow"
          v-else
          @click.stop.prevent="addIsFollowed(user.id)"
          :disabled="isProcessing"
        >
          跟隨
        </button>
      </div>
    </div>
    <button
      class="card-button"
      v-show="!isActive"
      @click.stop.prevent="addCards"
    >
      顯示更多
    </button>
  </div>
</template>

<script>
import popularListAPI from "../apis/followData";
import { Toast } from "../utils/helpers";
import { emptyImageFilter } from "../utils/mixins";
import store from "./../store";
import { mapState } from "vuex";

export default {
  name: "PopularUsers",
  mixins: [emptyImageFilter],
  data() {
    return {
      isActive: false,
      isProcessing: false,
    };
  },
  computed: {
    // 當 vuex 的 popularUsers 改變，得到新資料
    ...mapState(["popularUsers"]),
    // 當 isActive 或 popularUsers，更新 specificAmountUsers 並重新渲染
    specificAmountUsers: function () {
      // 顯示六位或十位熱門用戶
      return this.isActive ? this.popularUsers : this.popularUsers.slice(0, 6);
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // 呼叫 vuex 串接熱門用戶資料
        await store.dispatch("fetchPopularUsers");
      } catch (error) {
        console.log(error);
      }
    },
    async addIsFollowed(userId) {
      try {
        this.isProcessing = true;
        await popularListAPI.addFollowed({ id: userId });
        await this.fetchUsers();
        await this.updateFollowCards();

        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試..",
        });
      }
    },
    async deleteIsFollowed(userId) {
      try {
        this.isProcessing = true;
        await popularListAPI.DeleteFollowed(userId);
        await this.fetchUsers();
        await this.updateFollowCards();

        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試..",
        });
      }
    },
    // 同步更新 Follow 頁面資料
    async updateFollowCards() {
      if (this.$route.params) {
        const { id: userId } = this.$route.params;
        await store.dispatch("fetchUserFollowings", { userId });
        await store.dispatch("fetchUserFollowers", { userId });
      }
    },
    addCards() {
      this.isActive = true;
    },
    toUserPage(userID) {
      // 取卡片使用者id
      if (this.$route.name !== "UserOther") {
        this.$router.push({ name: "UserOther", params: { id: userID } });
        return;
      }

      if (this.$route.name === "UserOther") {
        // 拿下路由 陣列
        let urlAry = window.location.href.split("/");
        // 改下路由 陣列最後id
        urlAry[urlAry.length - 1] = userID;
        // 把陣列合併用/分開
        let newUrl = urlAry.join("/");
        // 換成url重新整理
        window.location.href = newUrl;
        // 強制重整
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/popular.scss";
</style>
