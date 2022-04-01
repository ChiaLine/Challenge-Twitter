<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link class="navbar-link" to="/Admin">
        <img src="https://i.imgur.com/WwFWS1D.png" />
      </router-link>
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
          <span class="navbar-title-hover">{{ item.title }}</span>
          <span class="navbar-title-none">{{ item.title }}</span>
          <!-- <span>{{ item.title }}</span> -->
        </router-link>
      </li>
      <li class="nav-item" @click="logout">
        <router-link
          class="nav-link"
          :to="{name: 'AdminLogin'}">
          <img class="navbar-icon home" src="https://i.imgur.com/trtoBHw.png"/>
          <span class="navbar-title-hover">登出</span>
          <span class="navbar-title-none">登出</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
const dummyData = {
  navItems: [
    {
      id: 1,
      title: "推文清單",
      icon: 'https://i.imgur.com/fBVbYGb.png',
      iconActive: 'https://i.imgur.com/YpAk1au.png',
      to: 'MainList',
      active: false,
    },
    {
      id: 2,
      title: "使用者列表",
      icon: 'https://i.imgur.com/feES0o7.png',
      iconActive: 'https://i.imgur.com/rGhaeOT.png',
      to: 'UserList',
      active: false,
    },
  ],
};

export default {
  data() {
    return {
      navItems: [],
    }
  },
  created() {
    this.fetchNavItems();
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
    logout(){
      this.$store.commit("revokeAdminUser");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/navbar.scss";
</style>
