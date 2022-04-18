<template>
  <div class="admin row">
    <AdminNavBar class="col-md-2"/>
    <router-view class="col-md-10"/>
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'

export default {
  name: 'Admin',
  components: {
    AdminNavBar,
  }
}
</script>

<style scoped>
  .admin {
    height: 100%;
  }
</style>