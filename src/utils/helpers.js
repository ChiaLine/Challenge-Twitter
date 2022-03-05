// ./src/utils/helpers.js
import axios from 'axios'
import Swal from 'sweetalert2'

// 正式後端伺服器
const baseURL = 'https://twitter-api-chatroom.herokuapp.com/api'

// 0305晚上靜易的測試伺服器
// const baseURL = 'https://dd0f-150-117-29-118.ngrok.io/api'

export const apiHelper = axios.create({
  baseURL,
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})