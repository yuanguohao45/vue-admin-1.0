import router from '@/router'
import { getToken } from '@/utils/app'

const whiteLinks = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (whiteLinks.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
