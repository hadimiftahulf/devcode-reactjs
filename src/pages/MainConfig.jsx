import Dashboard from './Dashboard'
import Detail from './Dashboard/detail'

export const MainConfig = {
  routes: [
    {
      path: '/',
      component: Dashboard,
      state: 'dashboard',
      exact: true,
      settings: {
        title: 'To Do List - Dashboard',
      },
    },
    {
      path: '/detail/:id',
      component: Detail,
      state: 'detail',
      exact: true,
      settings: {
        title: 'To Do List - Detail',
      },
    },
  ],
}
