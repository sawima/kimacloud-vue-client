import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getInfo } from '@/utils/auth' // get token from cookie
// import { getInfo } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('success login and to path -------')
      const hasGetUserInfo = getInfo()
      const userOrgs = hasGetUserInfo.orgs
      console.log('if org is not exist')
      console.log(to.path)
      console.log(userOrgs)
      if (to.path !== '/register') {
        if (typeof userOrgs === 'undefined' || userOrgs === null || userOrgs.length === 0) {
          console.log('org is empty')
          next({ path: '/register' })
          NProgress.done()
          // router.push('/org/newOrg')
        } else {
          console.log('hasGetUserInfo!!!')
          console.log(hasGetUserInfo)
          if (hasGetUserInfo) {
            next()
          } else {
            console.log('try to get user info')
            try {
              console.log('next to', to.fullPath)
              await store.dispatch('user/refreshUserInfo')
              console.log('next to', to.path)
              next()
            } catch (error) {
              // remove token and go to login page to re-login
              await store.dispatch('user/resetToken')
              Message.error(error || 'Has Error')
              next(`/login?redirect=${to.path}`)
              NProgress.done()
            }
          }
        }
      } else {
        console.log('empty org need create org')
        next()
        // NProgress.done()
      }

      // console.log('hasGetUserInfo!!!')
      // console.log(hasGetUserInfo)
      // if (to.path !== '/org') {
      //   if (typeof userOrgs === 'undefined' || userOrgs === null || userOrgs.length === 0) {
      //     next({ path: '/org' })
      //   }
      // }
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   console.log('try to get user info')
      //   try {
      //     console.log('next to', to.fullPath)
      //     await store.dispatch('user/refreshUserInfo')
      //     console.log('next to', to.path)
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
