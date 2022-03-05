<template>
  <div class="chatroom-container">
    <div class="display-container">
      <!-- 注意！訊息上下順序是相反的(column-reverse) -->
      <!-- 判斷是哪種訊息，搭配對應的class -->
      <div
        v-for="message in messages"
        :key="message.id"
        :class="{
          notification: message.typeId === 1,
          'card-other': message.typeId === 2,
          'card-self': message.typeId === 3,
        }"
      >
        <!-- v-if判斷相應內容 -->
        <!-- 1:上線離線通知 -->
        <span v-if="message.typeId === 1">{{message.content}}</span>
        <!-- 2:其他使用者的訊息 -->
        <div v-if="message.typeId === 2" class="card-other-container">
          <div class="img-container">
            <img :src="message.avatar" alt="avatar" />
          </div>
          <div class="content-container">
            <div class="text">
              {{ message.content }}
            </div>
            <p class="time">{{ message.time }}</p>
          </div>
        </div>
        <!-- 3:自己的訊息 -->
        <div v-if="message.typeId === 3" class="card-self-container">
          <div class="text">
            {{ message.content }}
          </div>
          <p class="time">{{ message.time }}</p>
        </div>
      </div>
    </div>
    <div class="input-container">
      <input type="text" placeholder="輸入訊息..." />
      <button><img src="https://i.imgur.com/Jrjlukd.jpg" alt="" /></button>
    </div>
  </div>
</template>

<script>
const dummyMessages = [
  {
    id: 1,
    content: "罐子離線",
    typeId: 1,
    type: "notification",
    createdAt: "上午3:59",
    avatar: "",
  },
  {
    id: 2,
    content:
      "Christine早安！下午見。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 2,
    type: "other",
    createdAt: "上午3:25",
    avatar: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_143.jpg",
  },
  {
    id: 3,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 4,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 5,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 6,
    content:
      "嗨嗨嗨嗨嗨。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 3,
    type: "self",
    createdAt: "上午3:08",
    avatar: "",
  },
  {
    id: 7,
    content:
      "Christine早安！下午見。字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試字數多測試",
    typeId: 2,
    type: "other",
    createdAt: "上午3:25",
    avatar: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_143.jpg",
  },
  {
    id: 8,
    content: "罐子上線",
    typeId: 1,
    type: "notification",
    createdAt: "上午3:59",
    avatar: "",
  },
];
export default {
  data() {
    return {
      messages: dummyMessages,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/chatroom.scss";
</style>