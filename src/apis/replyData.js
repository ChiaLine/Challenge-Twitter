import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getReplyListTweet(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },

  getReplyListCards(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}/replies`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },

  addLike(tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null, { headers: { Authorization: `Bearer ${getToken()}` } })
  },

  // 新增回覆API
  postTweetReply({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}