import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import User from '../views/User.vue'
// 載入 state
import store from './../store'

Vue.use(VueRouter)

// 沒有驗證的管理者，即使知道網址、也應該被轉址到 404 頁面
const authorizeIsAdmin = (to, from, next) => {
  const adminToken = store.state.adminToken
  // 若帳號沒有 token 的驗證就轉址到 404 頁面
  if (adminToken === null) {
    next('/notfound')
    return
  } 

  next()
}

const authorizeIsUser = async (to, from, next) => {

  // 從 localStorage 取出 token
  const tokenInLocalStorage = localStorage.getItem('token')

  // 從 state 取出 token
  const tokenInStore = store.state.token

  // 預設 是未驗證
  let isAuthenticated = store.state.isAuthenticated

  // localStorage 有 token 才驗證 & 比較 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 使用 dispatch 呼叫 Vuex 內的 actions
    console.log('OK')
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  
  // 不需要驗證 token 的頁面
  // const pathsWithoutAuthentication = ['Regist', 'Login', 'AdminLogin']
  const pathsWithoutAuthentication = ['Regist', 'Login']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁 & 避免出現無窮迴圈
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/Login')
    return
  }

  // 如果 token 有效且進入不需要驗證到頁面則轉址到首頁 & 避免出現無窮迴圈
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/User')
    return
  }

  next()
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: () => import('../views/Regist.vue')
    },
    {
      path: '/Setting',
      name: 'Setting',
      beforeEnter: authorizeIsUser,
      component: () => import('../views/Setting.vue')
    },
    {
      path: '/Chatroom',
      name: 'Chatroom',
      beforeEnter: authorizeIsUser,
      component: () => import('../views/Chatroom.vue')
    },
    {
      path: '/Message',
      name: 'Message',
      beforeEnter: authorizeIsUser,
      component: () => import('../views/Message.vue')
    },
    {
      path: '/User',
      name: 'User',
      redirect: '/User/Main',
      component: User,
      beforeEnter: authorizeIsUser,
      children: [
        {
          path: 'Main',
          name: 'Main',
          component: () => import('../views/Main.vue'),
        },
        {
          path: 'Notify',
          name: 'Notify',
          component: () => import('../views/Notify.vue'),
        },
        {
          path: 'ReplyList/:id',
          name: 'ReplyList',
          component: () => import('../views/ReplyList.vue'),
        },
        {
          path: 'UserSelf',
          name: 'UserSelf',
          component: () => import('../views/UserSelf.vue'),
        },
        {
          path: 'UserFollow/:id',
          name: 'UserFollow',
          component: () => import('../views/UserFollow.vue'),
        },
        {
          path: 'UserOther/:id',
          name: 'UserOther',
          component: () => import('../views/UserOther.vue'),
        },
      ]
    },
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/Admin',
      name: 'Admin',
      redirect: '/Admin/MainList',
      component: () => import('../views/Admin.vue'),
      // 沒有權限的管理者，即使知道網址、也應該被轉址到 404 頁面
      beforeEnter: authorizeIsAdmin,
      children: [
        {
          path: 'MainList',
          name: 'MainList',
          component: () => import('../views/AdminMainList.vue'),
          beforeEnter: authorizeIsAdmin
        },
        {
          path: 'UserList',
          name: 'UserList',
          component: () => import('../views/AdminUserList.vue'),
          beforeEnter: authorizeIsAdmin
        },
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

router.beforeEach( (to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  // store.dispatch('fetchCurrentUser')

  // 新增 後台 token 驗證
  store.commit("setAdminUser");

  next()
})

export default router
