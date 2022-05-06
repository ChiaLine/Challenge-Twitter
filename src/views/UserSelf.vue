<template>
  <div class="user-self h-100 w-100">
    <UserProfileCard
      :initialUser="currentUser"
      @after-show-user-edit-modal="afterShowUserEditModal"
    />
    <UserTweetListCard
      @after-show-reply-modal="afterShowReplyModal"
      :initialUser="currentUser"
    />
  </div>
</template>

<script>
import UserTweetListCard from "../components/UserTweetListCard.vue";
import UserProfileCard from "../components/UserProfileCard.vue";
import { mapState } from "vuex";

export default {
  name: "UserSelf",
  components: {
    UserProfileCard,
    UserTweetListCard,
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
      userId: -1,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    afterShowReplyModal(replyTweetId) {
      this.$emit("after-show-reply-modal", replyTweetId);
    },
    afterShowUserEditModal() {
      this.$emit("after-show-user-edit-modal");
    },
  },
};
</script>
