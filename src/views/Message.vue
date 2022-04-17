<template>
  <div class="h-100 row">
    <NavBar class="col-md-2" @after-show-tweet-modal="afterShowTweetModal" />
    
    <div class="col-md-10 d-flex h-100">
      <!-- 左區卡片 -->
      <div class="message-users">
        <MessageUserCards :rooms="rooms" @change-room-id="changeRoomId" />
      </div>
      <!-- 右區聊天室 -->
      <div class="message-content">
        <!-- 新增 聊天室上方 標題區塊的 顯示判斷 -->
        <div class="message-content-title" v-if="!thisMessageName.length">
          <!-- 顯示空白內容 -->
        </div>
        <div class="message-content-title" v-else>
          <p class="message-content-name">{{thisMessageName[0].name}}</p>
          <span class="message-content-account">@{{thisMessageName[0].account}}</span>
        </div>
        <!-- 新增 聊天室底下 訊息區塊的 顯示判斷 -->
        <div class="chatroom-container" v-if="!thisMessageName.length">
          <!-- 新增 訊息區塊內 圖片提示 -->
          <div class="display-container-text">
            <div class="display-container-img">
              <img src="https://i.imgur.com/VG0wE3w.jpg" >
            </div>
          </div>
          <!-- 新增 訊息區塊內 輸入框禁用提示 -->
          <div class="input-container">
            <input
              class="input-container-cursor-not-allowed"
              type="text"
              placeholder="無法輸入訊息..."
              disabled
            />
            <button class="input-container-cursor-not-allowed">
              <img src="https://i.imgur.com/Jrjlukd.jpg" />
            </button>
          </div>
        </div>
        <div class="chatroom-container" v-else>
          <div class="display-container">
            <!-- 注意！訊息上下順序是相反的(column-reverse) -->
            <!-- 判斷是哪種訊息，搭配對應的class -->
            <div
              v-for="message in messages"
              :key="message.index"
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
                  <img :src="message.avatar | emptyImage" alt="avatar" />
                </div>
                <div class="content-container">
                  <div class="text">
                    {{ message.content }}
                  </div>
                  <p class="time">{{ message.time | formatDate }}</p>
                </div>
              </div>
              <!-- 3:自己的訊息 -->
              <div v-if="message.typeId === 3" class="card-self-container">
                <div class="text">
                  {{ message.content }}
                </div>
                <p class="time">{{ message.time | formatDate }}</p>
              </div>
            </div>
            <!-- 秀歷史訊息 -->
            <template v-if="previousMessages.length > 0">
              <div
                v-for="message in previousMessages"
                :key="message.index"
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
                    <img :src="message.avatar | emptyImage" alt="avatar" />
                  </div>
                  <div class="content-container">
                    <div class="text">
                      {{ message.content }}
                    </div>
                    <p class="time">{{ message.time | formatDate }}</p>
                  </div>
                </div>
                <!-- 3:自己的訊息 -->
                <div v-if="message.typeId === 3" class="card-self-container">
                  <div class="text">
                    {{ message.content }}
                  </div>
                  <p class="time">{{ message.time | formatDate }}</p>
                </div>
              </div>
            </template>
          </div>
          <div class="input-container">
            <input
              @keyup.enter="sendMessage"
              v-model="inputMessage"
              type="text"
              placeholder="輸入訊息..."
            />
            <button @click="sendMessage">
              <img src="https://i.imgur.com/Jrjlukd.jpg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <TweetModal v-if="showModal" @after-hide-modal="afterHideModal" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TweetModal from "../components/TweetModal.vue";
import MessageUserCards from "../components/MessageUserCards.vue";
import { mapState } from "vuex";
import { formatDateFilter } from "./../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "Message",
  components: {
    NavBar,
    TweetModal,
    MessageUserCards,
  },
  data() {
    return {
      showModal: false,
      messages: [],
      inputMessage: "",
      rooms: [],
      previousMessages: [],
      currentRoomId: -1,
      thisMessageName: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mixins: [emptyImageFilter, formatDateFilter],
  methods: {
    afterShowTweetModal() {
      this.showModal = true;
    },
    afterHideModal() {
      this.showModal = false;
    },
    changeRoomId(newRoomId) {
      console.log("newRoomId", newRoomId);
      if (this.currentRoomId !== newRoomId) {
        this.currentRoomId = newRoomId;
        // 切換私聊房間後，清空對話紀錄
        this.messages = [];
      }
    },
    sendMessage() {
      if (this.inputMessage) {
        console.log("sendMessage: ", this.inputMessage);
        this.$socket.client.emit("private message", {
          roomId: this.currentRoomId,
          message: this.inputMessage,
        });
        this.inputMessage = "";
      }
    },
    // 頁面切換時 進入私人聊天室 呼叫(created)
    connectUser() {
      console.log("進入私人聊天室");
      this.$socket.client.emit("enter private room");
    },
    // 頁面離開時 離開私人聊天室 呼叫(beforeDestroy)
    disconnectUser() {
      console.log("離開私人聊天室");
      this.$socket.client.emit("leave chatroom");
    },
  },
  // 監聽事件放的位置
  sockets: {
    // connect: function () {
    //   console.log("私人聊天室 web socket success");
    // },
    // 接收私信列表
    [`private message list`]: function (users) {
      console.log("接收私信使用者的列表: ", users);
      this.rooms = users;
      this.currentRoomId = users[0].id;
    },
    // 獲取歷史聊天紀錄（???）
    [`render private messages`]: function (data) {
      console.log("獲取歷史訊息: ", data);
      // 清空歷史訊息
      this.previousMessages = []
      this.thisMessageName = []
      // 更新要聊天的朋友名稱
      this.thisMessageName.push(data.otherUser);
      // 更新歷史訊息資料
      for (let i = 0; i < data.messages.length; i++) {
        const msg = data.messages[i];
        if (msg.senderId === this.currentUser.id) {
          const thisMessage = {
            id: -1,
            content: msg.message,
            typeId: 3,
            type: "self",
            time: msg.createdAt,
            avatar: "",
          };
          this.previousMessages.unshift(thisMessage);
        } else {
          const thisMessage = {
            id: -1,
            content: msg.message,
            typeId: 2,
            type: "other",
            time: msg.createdAt,
            avatar: msg.Receiver.avatar,
          };
          this.previousMessages.unshift(thisMessage);
        }
      }
    },
    // 接收私人消息
    [`private message`]: function (msg) {
      console.log("接收私人訊息: ", msg);
      if (msg.senderId === this.currentUser.id) {
        const thisMessage = {
          id: -1,
          content: msg.message,
          typeId: 3,
          type: "self",
          time: msg.createdAt,
          avatar: "",
        };
        this.messages.unshift(thisMessage);
      } else {
        const thisMessage = {
          id: -1,
          content: msg.message,
          typeId: 2,
          type: "other",
          time: msg.createdAt,
          avatar: msg.senderAvatar,
        };
        this.messages.unshift(thisMessage);
      }
    },
  },
  created() {
    // 告知伺服器使用者上線
    this.connectUser();
  },
  beforeDestroy() {
    // 離開頁面時告知後端伺服器
    this.disconnectUser();
    // 新增
    this.$socket.client.off("render private messages");
    this.$socket.client.off("private message list");
    this.$socket.client.off("private message");
  },
};
</script>

<style lang="scss" scoped>
// 聊天室訊息輸入框、訊息顯示區域設定
@import "../assets/scss/chatroom.scss";
/* 左區卡片 */
.message-users {
  // width: 100%;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

/* 右區聊天室 */
.message-content {
  // width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.message-content-title {
  height: 74px;
  border-bottom: 1px solid #e6ecf0;
}

.message-content-name {
  margin-left: 24px;
  font-size: 24px;
  font-weight: 700;
}

.message-content-account {
  margin-left: 20px;
  color: #6c757d;
}

/* 聊天內容區 */
.message-container {
  height: calc(100vh - 130px);
}
.message-panel {
  height: 64px;
  padding: 10px;
  display: flex;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}
.message-input {
  flex: 1;
  height: 35px;
  outline: none;
  border: none;
  padding: 10px;
  background: #e6ecf0;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 500;
}
.message-btn {
  margin-bottom: 10px;
}
.message-img {
  width: 25px;
  height: 25px;
}
// 新增關於啟動聊天室的畫面效果
.display-container-text {
  width: 100%;
  height: 100%;
  cursor: not-allowed;
}
.display-container-img {
  height: 850px;
}
.input-container-cursor-not-allowed {
  cursor: not-allowed; 
}

</style>
