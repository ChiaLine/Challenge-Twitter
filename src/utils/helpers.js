// ./src/utils/helpers.js
import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://twitter-api-chatroom.herokuapp.com/api'
const socketURL = 'https://twitter-api-chatroom.herokuapp.com/'

export const apiHelper = axios.create({
  baseURL,
})

export const socketApiHelper = axios.create({
  socketURL,
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})