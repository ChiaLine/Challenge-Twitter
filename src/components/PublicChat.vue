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
        <span v-if="message.typeId === 1">{{ message.content }}</span>
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
      <input v-model="inputMessage" type="text" placeholder="輸入訊息..." />
      <button @click.stop.prevent="sendMessage">
        <img src="https://i.imgur.com/Jrjlukd.jpg" alt="" />
      </button>
    </div>
  </div>
</template>

<script src="https://cdn.socket.io/4.4.1/socket.io.min.js"
    integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H"
    crossorigin="anonymous">
// import { socketApiHelper } from './../utils/helpers';

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

const URL1 = "https://twitter-api-chatroom.herokuapp.com/";
// const URL2 = "http://127.0.0.1:3000";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ1c2VyNUBleGFtcGxlLmNvbSIsImFjY291bnQiOiJ1c2VyNSIsIm5hbWUiOiJ1c2VyNSIsImF2YXRhciI6Imh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL3dvbWVuLzY2LmpwZyIsImNvdmVyIjpudWxsLCJpbnRyb2R1Y3Rpb24iOiJBdXQgdmVybyBlb3MgaWxsbyBlaXVzIGVpdXMuXG5FdCBlaXVzIGlkIG5hdHVzIHF1aWEgcXVhcyBhbGlxdWlkIGVzdC4iLCJyb2xlIjoidXNlciIsInRvdGFsVHdlZXRzIjoxMCwidG90YWxGb2xsb3dpbmdzIjowLCJ0b3RhbEZvbGxvd2VycyI6MCwidG90YWxMaWtlZCI6MCwiY3JlYXRlZEF0IjoiMjAyMi0wMy0wMlQwMzowNDo1My4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wMy0wMlQwMzowNDo1My4wMDBaIiwiaWF0IjoxNjQ2MjI1NTM5LCJleHAiOjE2NDg4MTc1Mzl9.CtUVHLZjIsofw9Anq50dxw_s860MmqnXh7bHJAFeS6w";

const socket = io(URL1, {
  auth: { token: TOKEN },
});

// 這是接收目前在聊天室的使用者清單
socket.on("users", (users) => {
  console.log(users);
  // users.forEach(user => {
  //   const item = document.createElement('li')
  //   item.textContent = user.name
  //   usersPanel.appendChild(item)
  // })
});

socket.on("public message", (msg) => {
  console.log(msg);
  // const item = document.createElement("li");
  // item.textContent = msg;
  // messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
});

export default {
  data() {
    return {
      messages: dummyMessages,
      inputMessage: "",
    };
  },
  methods: {
    // 這是送出聊天內容的按鈕
    sendMessage() {
      if (this.inputMessage) {
        socket.emit("public message", this.inputMessage);
        this.inputMessage = "";
      }
    },
    // 這是接收目前在聊天室的使用者清單
    // getUsers() {
    //   socket.on("users", (users) => {
    //     console.log(users);
    //     // users.forEach(user => {
    //     //   const item = document.createElement('li')
    //     //   item.textContent = user.name
    //     //   usersPanel.appendChild(item)
    //     // })
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/chatroom.scss";
</style>