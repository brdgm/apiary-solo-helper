import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import TurnBot from '@/views/TurnBot.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/turn/:turn/bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')