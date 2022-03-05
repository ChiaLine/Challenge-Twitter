<template>
  <div class="user-follow">
    <nav>
      <!-- 回上一頁區塊 -->
      <!-- 要再將連結修改成回到原使用者頁面，需要Id，要能判斷是self還是other -->
      <button @click.stop.prevent="goPreviousPage" class="wrapper d-flex">
        <img class="arrow" src="https://i.imgur.com/3y7W3fG.png" alt="" />
        <div class="m-2">
          <h5 class="userName">{{ user.name }}</h5>
          <h5 class="tweetNumber">{{ user.totalTweets }} 推文</h5>
        </div>
      </button>
      <!-- 卡片切換導覽列 -->
      <div class="card-buttons d-flex">
        <div v-for="type in dataType" :key="type.id">
          <button
            v-if="type.id === dataId"
            @click.stop.prevent="setDataId(type.id)"
            class="card-button chosen"
          >
            {{ type.buttonName }}
          </button>
          <button
            v-else
            @click.stop.prevent="setDataId(type.id)"
            class="card-button normal"
          >
            {{ type.buttonName }}
          </button>
        </div>
      </div>
    </nav>
    <!-- FollowCards 列表 -->
    <FollowCards :data-id="dataId" />
  </div>
</template>

<script>
import FollowCards from "../components/FollowCards.vue";
import userFollowAPI from "./../apis/userFollow";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserFollow",
  components: {
    FollowCards,
  },
  data() {
    return {
      dataId: 1,
      dataType: [
        {
          id: 1,
          buttonName: "跟隨者",
        },
        {
          id: 2,
          buttonName: "正在跟隨",
        },
      ],
      user: {
        id: -1,
        account: "dummyUser",
        name: "dummyUser",
        totalTweets: 0,
      },
    };
  },
  created() {
    const { type: currentType } = this.$route.query;
    this.checkInitialType(currentType);
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  methods: {
    setDataId(id) {
      this.dataId = id;
    },
    // TODO: isLoading
    async fetchUser(userId) {
      try {
        let response = await userFollowAPI.getUserProfile(userId);
        const { data } = response;
        this.user = { ...data };
      } catch (e) {
        Toast.fire({
          icon: "warning",
          title: "無法取得使用者資料",
        });
      }
    },
    goPreviousPage() {
      this.$router.go(-1);
    },
    checkInitialType(type) {
      if (type === "followers") {
        this.dataId = 1;
      } else if (type === "followings") {
        this.dataId = 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/user-follow.scss";
</style>