<template>
 <div class="chatroom-container">
    <p class="chatroom-title">上線 ({{users.length}})</p>
    <div class="chatroom-cards">
      <div class="chatroom-card d-flex justify-content-start align-items-center"
      v-for="user in users"
      :key="user.UserId"
      >
        <img class="chatroom-card-img" :src=" user.avatar | emptyImage"/>
        <p class="chatroom-card-name">{{user.name}}</p>
        <p class="chatroom-card-account">＠{{user.account}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: 'ChatroomCards',
  mixins: [emptyImageFilter],
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style scoped style lang="scss">
@import "../assets/scss/_color.scss";
.chatroom-container {
  width: 390px;
}
.chatroom-title {
  height: 74px;
  line-height: 74px;
  padding-left: 23px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid $modal-outline;
}
.chatroom-card {
  padding: 10px 10px 10px 15px;
  border-bottom: 1px solid $modal-outline;
}
.chatroom-card-name {
  font-weight: 700;
  margin: 6px 0 6px 10px;
}
.chatroom-card-account {
  margin-left: 10px;
  font-weight: 400;
  color: #6C757D;
}
.chatroom-card-img {
  width: 50px;
  height: 50px;
}
</style>
