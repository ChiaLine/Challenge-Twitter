<template>
  <div class="modal-container">
    <div class="user-edit-modal">
      <form
        @submit.stop.prevent="handleSubmit"
        class="h-100 d-flex flex-column"
      >
        <div class="modal-header align-items-center">
          <button @click.stop.prevent="hideModal">&#215;</button>
          <p class="flex-grow-1">編輯個人資料</p>
          <button type="submit" class="save-button" :disabled="isProcessing">
            儲存
          </button>
        </div>
        <div class="modal-body flex-grow-1 d-flex flex-column">
          <div class="photo-area">
            <!-- cover 區塊 -->
            <div class="cover-form-group">
              <label for="cover" class="d-none"></label>
              <img
                :src="user.cover | emptyImage"
                class="cover"
                alt="user cover"
              />
              <input
                id="cover"
                type="file"
                name="cover"
                accept="image/*"
                class="input-image"
                @change="changeCover"
              />
            </div>
            <!-- avatar 區塊 -->
            <div class="avatar-form-group">
              <label for="avatar" class="d-none"></label>
              <img
                :src="user.avatar | emptyImage"
                class="avatar"
                alt="user avatar"
              />
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                class="input-image"
                @change="changeAvatar"
              />
            </div>
          </div>
          <div class="text-area flex-grow-1 d-flex flex-column">
            <!-- 名稱區塊 -->
            <div class="mb-4 d-flex flex-column">
              <div
                class="input-container d-flex flex-column"
                :class="{ 'warning-border': nameWarningOn }"
              >
                <label for="name">名稱</label>
                <textarea
                  v-model="user.name"
                  name="name"
                  id="name"
                  rows="1"
                ></textarea>
              </div>
              <div class="d-flex justify-content-between">
                <p class="warning-text">{{ getNameWarning }}</p>
                <p class="word-limit">
                  {{ getNameLength }}/ {{ nameLengthLimit }}
                </p>
              </div>
            </div>
            <!-- 自我介紹區塊 -->
            <div class="flex-grow-1 d-flex flex-column">
              <div
                class="input-container flex-grow-1 d-flex flex-column"
                :class="{ 'warning-border': introWarningOn }"
              >
                <label for="introduction">自我介紹</label>
                <textarea
                  v-model="user.introduction"
                  name="introduction"
                  id="introduction"
                  class="flex-grow-1"
                ></textarea>
              </div>
              <div class="d-flex justify-content-between">
                <p class="warning-text">{{ getIntroWarning }}</p>
                <p class="word-limit">
                  {{ getIntroLength }}/{{ introLengthLimit }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import userEditModalAPI from "./../apis/userData";

export default {
  name: "UserEditModal",
  data() {
    return {
      user: {
        id: -1,
        cover: "",
        avatar: "",
        name: "",
        introduction: "",
      },
      nameLengthLimit: 50,
      introLengthLimit: 160,
      isProcessing: false,
    };
  },
  mixins: [emptyImageFilter],
  created() {
    this.fetchUser();
  },
  methods: {
    hideModal() {
      // TODO:待優化: 可在關掉時，警告使用者未儲存修改會消失
      this.$emit("after-hide-user-edit-modal");
    },
    fetchUser() {
      this.user = {
        ...this.user,
        ...this.currentUser,
      };
      if (this.user.name === null) {
        this.user.name = "";
      }
      if (this.user.introduction === null) {
        this.user.introduction = "";
      }
    },
    async handleSubmit(e) {
      try {
        // 圖片驗證
        if (!this.user.cover || !this.user.avatar) {
          Toast.fire({
            icon: "warning",
            title: "必須上傳大頭貼和封面照片",
          });
          return;
        }
        // 字數驗證
        if (this.nameWarningOn || this.introWarningOn) {
          Toast.fire({
            icon: "warning",
            title: "字數不符合規定",
          });
          return;
        }
        // 拿取表單資料
        this.isProcessing = true;
        const form = e.target;
        const formData = new FormData(form);
        // 串接API送出表單資料
        const userId = this.user.id;
        const response = await userEditModalAPI.updateUserProfile({
          userId,
          formData,
        });

        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 關閉modal並發送成功通知
        Toast.fire({
          icon: "success",
          title: "成功修改個人資料！",
        });
        this.hideModal();
        this.isProcessing = false;
        // TODO: 強制重整畫面顯示新資料，未來可再優化。
        this.$router.go(0);
      } catch (e) {
        Toast.fire({
          icon: "warning",
          title: e.response.data.message,
        });
        this.isProcessing = false;
      }
    },
    // 圖片上傳相關功能
    changeCover(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.cover = imageURL;
      }
    },
    changeAvatar(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },
    // input warning 判別功能
    createWarningText(inputLength, limit) {
      if (inputLength <= 0) {
        return "內容不可空白！";
      } else if (inputLength > limit) {
        return "字數超出上限！";
      } else {
        return "";
      }
    },
  },
  // TODO:待優化: 字數計算會加入換行符號，因此換行後有誤差
  computed: {
    // 到Vuex拿取拿取當前使用者資料
    ...mapState(["currentUser"]),
    // 取得即時字數
    getNameLength() {
      return this.user.name.trim().length;
    },
    getIntroLength() {
      return this.user.introduction.trim().length;
    },
    // 取得即時警告狀態
    nameWarningOn() {
      let length = this.user.name.trim().length;
      return length <= 0 || length > this.nameLengthLimit;
    },
    introWarningOn() {
      let length = this.user.introduction.trim().length;
      return length <= 0 || length > this.introLengthLimit;
    },
    // 取得即時警告內容
    getNameWarning() {
      return this.createWarningText(
        this.user.name.trim().length,
        this.nameLengthLimit
      );
    },
    getIntroWarning() {
      return this.createWarningText(
        this.user.introduction.trim().length,
        this.introLengthLimit
      );
    },
  },
};

// TODO:待優化：關閉modal再打開，是否要回到未修改的使用者資料內容？（重新拉資料）
</script>

<style lang="scss" scoped>
@import "../assets/scss/user-edit-modal.scss";
</style>


