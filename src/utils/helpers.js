// ./src/utils/helpers.js
import axios from 'axios'
import Swal from 'sweetalert2'
// import path from 'path'

// 正式後端伺服器
const baseURL = 'https://twitter-api-chatroom.herokuapp.com'

// 0305晚上靜易的測試伺服器，有些功能正式版還沒有，但不一定會開
// const baseURL = 'https://e111-150-117-29-118.ngrok.io'

export const apiHelper = axios.create({
  baseURL: 'https://twitter-api-chatroom.herokuapp.com/api'
})

export const socketURL = baseURL

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})