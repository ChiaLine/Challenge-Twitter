import { apiHelper } from './../utils/helpers'
const getAdminToken = () => localStorage.getItem('adminToken')

export default {
  getTweetsList() {
    return apiHelper.get(`/admin/tweets`, { headers: { Authorization: `Bearer ${getAdminToken()}` } })
  },
  getUsersList() {
    return apiHelper.get(`/admin/users`, { headers: { Authorization: `Bearer ${getAdminToken()}` } })
  },
}
