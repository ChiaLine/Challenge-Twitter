import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getPopularList() {
    return apiHelper.get(`/users/top`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserFollowings(userId) {
    return apiHelper.get(`/users/${userId}/followings`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserFollowers(userId) {
    return apiHelper.get(`/users/${userId}/followers`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  addFollowed({ id }) {
    return apiHelper.post(`/followships`, { id }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  DeleteFollowed(id) {
    return apiHelper.delete(`/followships/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
}
