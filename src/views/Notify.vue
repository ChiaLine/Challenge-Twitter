<template>
 <div class="notify">
    <p class="notify-title">通知</p>
    <div class="notify-cards">
      <div class="notify-card">
        <img class="notify-card-img" :src=" null | emptyImage"/>
        <p class="notify-card-title">John 有新的推文通知</p>
        <p class="notify-card-text">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </p>
      </div>
      <div class="notify-card">
        <img class="notify-card-img" :src=" null | emptyImage"/>
        <p class="notify-card-title">Michael 開始追蹤你</p>
        <p class="notify-card-text"></p>
      </div>
      <div class="notify-card">
        <img class="notify-card-img" :src=" null | emptyImage"/>
        <p class="notify-card-title">你的貼文有新的回覆</p>
        <p class="notify-card-text">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </p>
      </div>
      <div class="notify-card">
        <img class="notify-card-img" :src=" null | emptyImage"/>
        <p class="notify-card-title">Peter 喜歡你的貼文</p>
        <p class="notify-card-text"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
export default {
  name: 'Notify',
  mixins: [emptyImageFilter],
}
</script>

<style scoped style lang="scss">
@import "../assets/scss/_color.scss";
.notify {
  width: 600px;
  border-left: 1px solid $modal-outline;
  border-right: 1px solid $modal-outline; 
}
.notify-title {
  height: 74px;
  line-height: 74px;
  padding-left: 23px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid $modal-outline;
}
.notify-card {
  width: 600px;
  padding: 10px 10px 10px 15px;
  border-bottom: 1px solid $modal-outline;
}
.notify-card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 6px 0;
}
.notify-card-text {
  width: 510px;
}
.notify-card-img {
  width: 35px;
  height: 35px;
}
</style>
