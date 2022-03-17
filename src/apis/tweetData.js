import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweetCards() {
    return apiHelper.get(`/tweets`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  postTweet({ description }) {
    return apiHelper.post(`/tweets`, { description }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  addTweetLike(id) {
    return apiHelper.post(`/tweets/${id}/like`, null, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  deleteTweetLike(id) {
    return apiHelper.post(`/tweets/${id}/unlike`, null, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
}