// src/views/Login.vue
<template>
  <div class="container d-flex flex-column align-items-center">
    <img class="logo" src="https://i.imgur.com/WwFWS1D.png" alt="" />
    <h1 class="title">登入 Alphitter</h1>
    <LoginForm @handleSubmit="handleAfterSubmit" />
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      tabs: [
        {
          name: "註冊 Alphitter",
          path: "/Regist",
          id: 1,
        },
        {
          name: "後台登入",
          path: "/AdminLogin",
          id: 2,
        },
      ],
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(account, password) {
      try {
        if (!account || !password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號密碼",
          });
          return;
        }

        this.isProcessing = true;

        let response = await authorizationAPI.signIn({ account, password });
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUserId", data.user.id);
        this.$store.commit("setCurrentUser", data.user);
        this.$socket.client.disconnect(true);
        this.$socket.client.auth.token = data.token;
        this.$socket.client.connect();
        this.$router.push("./User");
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