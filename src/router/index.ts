import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import store from "@/store"
import init from '@/init'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isInited = store.state.isInited
  if (isInited) {
    next()
    return
  }

  if (to.path === "/signup") {
    next()
    return
  }

  await init()
  next()
})

export default router
