<template>
  <div class="container d-flex flex-column align-items-center">
    <img class="logo" src="https://i.imgur.com/WwFWS1D.png" alt="" />
    <h1 class="title">後台登入</h1>
    <LoginForm @handle-admin-submit="handleAdminSubmit"/>
    <div class="link-group align-self-end">
      <router-link
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.path"
        class="link"
      >
        {{ tab.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from "./../components/LoginForm";
import authorizationAPI from "../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      tabs: [
        {
          name: "前台登入",
          path: "/Login",
          id: 1,
        },
      ],
      // isProcessing: false,
    };
  },
  methods: {
    async handleAdminSubmit(account, password) {
      try {
        if (!account || !password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號密碼",
          });
          return;
        }

        // this.isProcessing = true;

        let response = await authorizationAPI.adminLogin( {account, password} );
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        localStorage.setItem("adminToken", data.token);
        this.$store.commit("setAdminUser");
        this.$router.push("./Admin");
      } catch (e) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: e.response.data.message,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/register-login.scss";
</style>