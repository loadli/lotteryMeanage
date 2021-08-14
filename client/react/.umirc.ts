import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  qiankun: {
    master: {
      apps: [
        {
          app1: 'app1',
          entry: '//localhost:8801',
        },
      ],
    },
  },
});
