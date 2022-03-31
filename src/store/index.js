import Vue from 'vue'
import Vuex from 'vuex'
import currentUserAPI from './../apis/userData'
import userFollowAPI from './../apis/followData'
import { Toast } from "./../utils/helpers"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: "",
      email: "",
      name: "",
      avatar: "",
      cover: null,
      introduction: "",
      role: "",
      totalTweets: 0,
      totalFollowings: 0,
      totalFollowers: 0,
      totalLiked: 0,
      createdAt: "",
      updatedAt: ""
    },
    // 登入狀態
    isAuthenticated: false,
    token: '',
    // 新增後台 token
    adminToken: '',
    // 正在檢視的特定使用者（id 判斷）跟隨、被跟隨清單
    userFollowings: [],
    userFollowers: [],
    popularUsers: [],
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
    },
    // 處理登出功能 透過 commit 呼叫 mutations 方法
    revokeAuthentication(state) {
      state.currentUser = {
        id: -1,
        account: "",
        email: "",
        name: "",
        avatar: "",
        cover: null,
        introduction: "",
        role: "",
        totalTweets: 0,
        totalFollowings: 0,
        totalFollowers: 0,
        totalLiked: 0,
        createdAt: "",
        updatedAt: ""
      }
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    },
    setAdminUser(state) {
      // 將後台驗證用的 token 儲存在 state 中
      state.adminToken = localStorage.getItem('adminToken')
    },
    revokeAdminUser() {
      // 登出時將 token 移除
      localStorage.removeItem('adminToken')
    },
    setUserFollowings(state, newUserFollowings) {
      state.userFollowings = newUserFollowings;
    },
    setUserFollowers(state, newUserFollowers) {
      state.userFollowers = newUserFollowers;
    },
    setPopularUsers(state, newPopularUsers) {
      state.popularUsers = newPopularUsers;
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const { data } = await currentUserAPI.getCurrentUser()
        commit('setCurrentUser', data)
        // 使用者Token驗證成功 回傳..
        return true
      } catch (error) {
        console.error(error.message)
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        // 使用者Token驗證失敗 回傳..
        return false
      }
    },
    async fetchUserFollowings({ commit }, { userId }) {
      try {
        const { data } = await userFollowAPI.getUserFollowings(userId);
        commit('setUserFollowings', data)
        if (data.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "沒有正在跟隨的使用者",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: error.response.data.message,
        });
      }
    },
    async fetchUserFollowers({ commit }, { userId }) {
      try {
        console.log("get followers")
        const { data } = await userFollowAPI.getUserFollowers(userId);
        commit('setUserFollowers', data)
        if (data.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "沒有跟隨者",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: error.response.data.message,
        });
      }
    },
    async fetchPopularUsers({ commit }) {
      try {
        const { data } = await userFollowAPI.getPopularList();
        commit('setPopularUsers', data)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得熱門用戶資料，請稍後再試..",
        });
      }
    }
  },
  modules: {
  }
})
