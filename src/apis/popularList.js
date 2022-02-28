import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getPopularList() {
    return apiHelper.get(`/users/top`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  addFollowed({id}) {
    return apiHelper.post(`/followships`, {id}, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  DeleteFollowed(id) {
    return apiHelper.delete(`/followships/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
}
