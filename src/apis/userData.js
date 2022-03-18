import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get(`/users/self`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserProfile(userId) {
    return apiHelper.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserTweets(userId) {
    return apiHelper.get(`/users/${userId}/tweets`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserLikeTweets(userId) {
    return apiHelper.get(`/users/${userId}/likes`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserRepliedTweets(userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  // 修改使用者帳戶資料
  update(userId, { account, name, email, password, checkPassword }) {
    return apiHelper.put(`/users/${userId}`, {
      account,
      name,
      email,
      password,
      checkPassword
    }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  // 修改使用者Profile
  updateUserProfile({ userId, formData }) {
    return apiHelper.put(`users/${userId}`, formData, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}
