import Login from '../pages/login'
import NotFound from '../pages/404'
import ZhuYe from '../components/myLayout'
import Register from '../pages/register'
import Home from '../pages/home'
import NormalList from '../pages/products/normalProductsList'
import SpecialList from '../pages/products/specialList'
import VipList from '../pages/products/vipList'
import Detial from '../pages/products/detials2'

export const loginRoute = [{
  path: "/login",
  component: Login,
},
{
  path: "/404",
  component: NotFound
},
{
  path: "/register",
  component: Register,
}
]

export const layoutRoute = [
  {
    path: '/main',
    component: ZhuYe,
  }
]

export const mainRoutes = [
  {
    path: '/main/home',
    component: Home
  },
  {
    path: '/main/normalList',
    component: NormalList
  },
  {
    path: '/main/specialList',
    component: SpecialList
  },
  {
    path: '/main/vipList',
    component: VipList
  },
  {
    path: '/main/detials/:name',
    component: Detial
  },
]