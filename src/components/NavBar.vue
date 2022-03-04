<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <a class="navbar-link" href="#/User">
        <img src="https://i.imgur.com/WwFWS1D.png" />
      </a>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item" 
      v-for="item in navItems" 
      :key="item.id"
      @click.stop.prevent="toggleActive(item.id)"
      >
        <router-link
          class="nav-link"
          :to="{
            name: item.to
          }"
          :class="{ active: item.active }"
        >
          <img class="navbar-icon home" :src="item.iconActive" v-if="item.active"/>
          <img class="navbar-icon home" :src="item.icon" v-else/>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{name: 'Login'}">
          <img class="navbar-icon home" src="https://i.imgur.com/trtoBHw.png"/>
          <span @click="logut">登出</span>
        </router-link>
      </li>
    </ul>
    <button class="navbar-button" @click.stop.prevent="handleNavBarTweetButton">推文</button>
  </nav>
</template>

<script>
const dummyData = {
  navItems: [
    {
      id: 1,
      title: "首頁",
      icon: 'https://i.imgur.com/fBVbYGb.png',
      iconActive: 'https://i.imgur.com/YpAk1au.png',
      to: 'Main',
      active: false,
    },
    {
      id: 2,
      title: "通知",
      icon: 'https://i.imgur.com/eMW7Etw.png',
      iconActive: 'https://i.imgur.com/w5tCGXo.png',
      to: 'Notify',
      active: false,
    },
    {
      id: 3,
      title: "公開聊天室",
      icon: 'https://i.imgur.com/jw9laKy.png',
      iconActive: 'https://i.imgur.com/f6TrOho.png',
      to: 'Chatroom',
      active: false,
    },
    {
      id: 4,
      title: "私人訊息",
      icon: 'https://i.imgur.com/Cx07Sff.png',
      iconActive: 'https://i.imgur.com/f6TrOho.png',
      to: 'Message',
      active: false,
    },
    {
      id: 5,
      title: "個人資料",
      icon: 'https://i.imgur.com/feES0o7.png',
      iconActive: 'https://i.imgur.com/rGhaeOT.png',
      to: 'UserSelf',
      active: false,
    },
    {
      id: 6,
      title: "設定",
      icon: 'https://i.imgur.com/rottgfT.png',
      iconActive: 'https://i.imgur.com/WMyBdJ2.png',
      to: 'Setting',
      active: false,
    },
  ],
};

export default {
  name: 'NavBar',
  data() {
    return {
      navItems: [],
      new: '',
    }
  },
  created() {
    this.fetchNavItems();
    this.new = this.$route.name
    console.log('created',this.$route.params)
    console.log(this.$route.name)
  },
  watch: {
    new(newValue) {
      console.log('watch',this.$route.params)
      console.log(newValue)
      console.log(this.$route.name)
    }
  },
  methods: {
    fetchNavItems() {
      const { navItems } = dummyData
      this.navItems = navItems.map( item => {
        if (item.to === this.$route.name) {
          return {
            ...item,
            active: true
          }
        } else {
          return {
            ...item
          }
        }
      })
    },
    toggleActive(itemId) {
      this.navItems = this.navItems.map( item => {
        if (item.id === itemId) {
          return {
            ...item,
            active: true
          }
        } else {
          return {
            ...item,
            active: false
          }
        }
      })
    },
    handleNavBarTweetButton() {
      this.$emit("after-show-tweet-modal");
    },
    logut(){
      this.$store.commit("revokeAuthentication");
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/navbar.scss";
.navbar-icon {
  border-radius: 5px;
}
</style>
