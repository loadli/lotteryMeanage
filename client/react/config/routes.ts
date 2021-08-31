export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-record',
    icon: 'table',
    path: '/record',
    component: './Record',
  },
  {
    name: 'list.lottery-record',
    icon: 'read',
    path: '/lotteryRecord',
    component: './LotteryRecord',
  },
  {
    name: 'list.lottery',
    icon: 'table',
    routes: [
      {
        path: '/lottery/base',
        name: 'base',
        component: './LotteryBase/Base',
      },
      {
        path: '/lottery/prize',
        name: 'prize',
        component: './LotteryBase/Prize',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
