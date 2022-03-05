<template>
  <div class="other">
    <UserProfileCard :initialUser="user" />
    <UserTweetListCard
      :initialUser="user"
      @after-show-reply-modal="afterShowReplyModal"
    />
  </div>
</template>

<script>
import UserTweetListCard from "../components/UserTweetListCard.vue";
import UserProfileCard from "../components/UserProfileCard.vue";
import getUserDataAPI from "./../apis/getUserData";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserOther",
  components: {
    UserTweetListCard,
    UserProfileCard,
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
      userIsLoading: true,
    };
  },
  async beforeRouteUpdate() {
    await this.fetchData(this.$route.params.id);
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    async fetchData(userId) {
      try {
        let { data } = await getUserDataAPI.getUserProfile(userId);
        this.user = data;
        this.userIsLoading = false;
      } catch (error) {
        this.userIsLoading = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    afterShowReplyModal(replyTweetId) {
      this.$emit("after-show-reply-modal", replyTweetId);
    },
  },
};
</script>

<style scoped>
.other-buttons {
  padding-bottom: 10px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}

.other-button {
  margin-left: 55px;
  font-weight: 500;
  color: #657786;
}
</style>
