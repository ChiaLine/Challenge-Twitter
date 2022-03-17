<template>
  <div class="row">
    <NavBar class="col-2" @after-show-tweet-modal="afterShowTweetModal" />
    <div class="setting-main col-10">
      <h5 class="setting-title p-3">帳戶設定</h5>
      <div class="setting-form">
        <SetProfile class="p-3" @after-submit="handleAfterSubmit" />
      </div>
    </div>
    <TweetModal v-if="showModal" @after-hide-modal="afterHideModal" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SetProfile from "../components/SetProfile.vue";
import TweetModal from "../components/TweetModal.vue";
import getUserDataAPI from "./../apis/getUserData";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Setting",
  components: {
    NavBar,
    SetProfile,
    TweetModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    async handleAfterSubmit([account, name, email, password, checkPassword]) {
      try {
        await getUserDataAPI.update(this.currentUser.id, {
          account,
          name,
          email,
          password,
          checkPassword,
        });
        this.$router.go(0);
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style scoped>
.setting-main {
  border-left: 1px solid #e6ecf0;
  padding: 0;
}
.setting-form {
  max-width: 600px;
}

.setting-title {
  border-bottom: 1px solid #e6ecf0;
}
</style>
