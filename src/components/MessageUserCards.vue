<template>
  <div class="message">
    <p class="message-title">訊息</p>
    <div class="message-cards">
      <div
        v-for="room in rooms"
        :key="room.index"
        @click.stop.prevent="getPrivateMessages(room.id)"
        class="message-card d-flex justify-content-start align-items-center"
      >
        <img
          class="message-card-img"
          :src="room.receiver.avatar | emptyImage"
        />
        <div class="message-content">
          <p class="message-name">
            {{ room.receiver.name }}
            <span class="message-account"> @{{ room.receiver.account }} </span>
          </p>
          <p class="message-description">{{ room.receiver.introduction }}</p>
        </div>
        <div class="message-time">{{ room.createdAt | fromNow }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "MessageUsersCards",
  mixins: [emptyImageFilter, fromNowFilter],
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getPrivateMessages(roomId) {
      this.$socket.client.emit("get private messages", roomId);
      this.$emit('change-room-id', roomId)
      console.log(`get private messages: ${roomId}`);
    },
  },
};
</script>

<style scoped style lang="scss">
@import "../assets/scss/_color.scss";
.message {
  width: 390px;
}
.message-cards {
  
}
.message-title {
  height: 74px;
  line-height: 74px;
  padding-left: 23px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid $modal-outline;
}
.message-card {
  position: relative;
  padding: 10px 10px 10px 15px;
  border-bottom: 1px solid $modal-outline;
  cursor: pointer;
}

.message-card-img {
  width: 50px;
  height: 50px;
}
.message-content {
  margin-left: 10px;
}
.message-name {
  font-weight: 700;
}
.message-description {
  width: 300px;
}
.message-account {
  color: #6c757d;
}
.message-time {
  position: absolute;
  right: 14px;
  top: 16px;
  color: #6c757d;
}
</style>
