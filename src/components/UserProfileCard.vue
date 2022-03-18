// src/components/UserProfileCard.vue
<template>
  <div class="wrapper">
    <!-- 要再將連結修改成上一頁 -->
    <div class="d-flex">
      <img
        @click.stop.prevent="goBack"
        class="arrow"
        src="https://i.imgur.com/3y7W3fG.png"
        alt=""
      />
      <div class="m-2">
        <h5 class="returnTweet">{{ user.name }}</h5>
        <h5 class="tweetNumber">{{ user.totalTweets }}貼文</h5>
      </div>
    </div>
    <div class="position-relative">
      <img :src="user.cover | emptyImage" alt="" class="cover w-100" />
      <img
        :src="user.avatar | emptyImage"
        alt=""
        class="avatar ml-3 position-absolute"
      />
    </div>
    <div class="profile position-relative ml-3">
      <button
        v-if="isCurrentUser"
        class="editProfile btn position-absolute"
        @click.stop.prevent="showUserEditModal"
      >
        編輯個人資料
      </button>
      <div v-else class="followOther position-absolute d-flex">
        <button class="iconWrapper d-flex" 
        @click.stop.prevent="sendMessage(user.id)"
        >
          <img
            class="iconMail m-auto"
            src="https://imgur.com/nBCwk65.png"
            alt=""
          />
        </button>
        <button class="iconWrapper d-flex">
          <img
            class="iconNotify m-auto"
            src="https://imgur.com/fCt60a2.png"
            alt=""
          />
        </button>
        <button
          v-if="user.isFollowed"
          @click.stop.prevent="deleteIsFollow(user.id)"
          class="following btn"
          :disabled="isProcessing"
        >
          正在跟隨
        </button>
        <button
          v-else
          @click.stop.prevent="addIsFollow(user.id)"
          class="editProfile btn"
          :disabled="isProcessing"
        >
          跟隨
        </button>
      </div>
      <h2 class="name">{{ user.name }}</h2>
      <h5 class="account">@{{ user.account }}</h5>
      <p class="note">
        {{ user.introduction }}
      </p>
      <div class="follow d-flex">
        <router-link
          :to="{
            name: 'UserFollow',
            params: { id: user.id },
            query: { type: 'followings' },
          }"
          class="record d-flex mr-4"
        >
          <p class="number">{{ user.totalFollowings }}個</p>
          <p class="text">跟隨中</p>
        </router-link>
        <router-link
          :to="{
            name: 'UserFollow',
            params: { id: user.id },
            query: { type: 'followers' },
          }"
          class="record d-flex"
        >
          <p class="number">{{ user.totalFollowers }}位</p>
          <p class="text">跟隨者</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
import userFollowAPI from "./../apis/followData";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        email: "",
        name: "",
        avatar: "",
        cover: null,
        introduction: "",
        role: "",
        totalTweets: 0,
        totalFollowings: 0,
        totalFollowers: 0,
        totalLiked: 0,
        createdAt: "",
        updatedAt: "",
      },
      isCurrentUser: "",
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.checkCurrentPage();
  },
  methods: {
    checkCurrentPage() {
      const currentPage = this.$route.name;
      if (currentPage === "UserSelf") {
        this.user = {
          ...this.user,
          ...this.currentUser,
        };
        this.isCurrentUser = true;
      } else if (currentPage === "UserOther") {
        this.isCurrentUser = false;
      }
    },
    goBack() {
      this.$router.back();
    },
    showUserEditModal() {
      this.$emit("after-show-user-edit-modal");
    },
    // 加入追隨其他使用者
    async addIsFollow(userId) {
      try {
        this.isProcessing = true;
        await userFollowAPI.addFollowed({ id: userId });
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
    // 取消追隨其他使用者
    async deleteIsFollow(userId) {
      try {
        this.isProcessing = true;
        await userFollowAPI.DeleteFollowed(userId);
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
    // 使用socket發送使用者id給後端給
    sendMessage(userId) {
      console.log("發送userId給後端: ", userId);
      this.$socket.client.emit("to private message", userId);
      // 轉到私人訊息頁面
      this.$router.push({ name: "Message" });
    },
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
};
</script>


<style scoped lang="scss">
@import "../assets/scss/user-profile-card.scss";
</style>