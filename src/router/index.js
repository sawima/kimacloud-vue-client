import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/multipleLogin'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/changepwd',
  //   children: [{
  //     path: '/changepwd',
  //     name: 'ChangePWD',
  //     component: () => import('@/views/login/changePwd'),
  //     meta: { title: '修改密码', icon: 'dashboard' }
  //   }]
  //   // hidden: true
  // },
  // {
  //   path: '/org',
  //   component: Layout,
  //   redirect: '/registerOrg',
  //   children: [{
  //     path: 'registerOrg',
  //     name: '组织管理',
  //     component: () => import('@/views/org/index'),
  //     meta: { title: '组织管理', icon: 'dashboard' }
  //   }]
  //   // hidden: true
  // },

  {
    path: '/org',
    component: Layout,
    name: 'Org',
    redirect: { name: 'registerOrg' },
    meta: { title: '组织管理', icon: 'dashboard' },
    children: [
      {
        path: 'registerOrg',
        name: 'registerOrg',
        component: () => import('@/views/org/index'),
        meta: { title: '组织管理', icon: 'dashboard' }
      },
      {
        path: 'newOrg',
        name: 'newOrg',
        component: () => import('@/views/org/newOrg'),
        meta: { title: '新建组织', icon: 'el-icon-tickets' }
      },
      {
        path: 'joinOrg',
        name: 'joinOrg',
        component: () => import('@/views/org/joinOrg'),
        meta: { title: '加入组织', icon: 'el-icon-tickets' }
      },
      {
        path: 'orgDetail',
        name: 'orgDetail',
        component: () => import('@/views/org/orgDetail'),
        meta: { title: '组织详情', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    },
    {
      path: '/changepwd',
      name: 'ChangePWD',
      component: () => import('@/views/login/changePwd'),
      meta: { title: '修改密码', icon: 'dashboard' },
      hidden: true
    }]
  },
  {
    path: '/device',
    component: Layout,
    name: 'Device',
    redirect: { name: 'newdevice' },
    meta: { title: '终端设备', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'newdevice',
        name: 'newdevice',
        component: () => import('@/views/device/newDevice'),
        meta: { title: '注册', icon: 'el-icon-plus' }
      },
      {
        path: 'listdevice',
        name: 'listdevices',
        component: () => import('@/views/device/listDevice'),
        meta: { title: '设备列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'devicemodel',
        name: 'devicemodel',
        redirect: { name: 'newmodel' },
        component: () => import('@/views/device/devicemodel/index'),
        meta: { title: '终端型号', icon: 'el-icon-s-platform' },
        children: [
          {
            path: 'newmodel',
            component: () => import('@/views/device/devicemodel/newModel'),
            name: 'newmodel',
            meta: { title: '新建型号' }
          },
          {
            path: 'modellist',
            component: () => import('@/views/device/devicemodel/deviceModelList'),
            name: 'devicemodellist',
            meta: { title: '型号列表' }
          },
          {
            path: 'updatemodel',
            component: () => import('@/views/device/devicemodel/updateDeviceModel'),
            name: 'updatemodel',
            meta: { title: '更新型号' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/devices',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'devices',
        component: () => import('@/views/devices/index'),
        meta: { title: '设备', icon: 'el-icon-s-platform' }
      }
    ]
  },
  {
    path: '/appStore',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'appstore',
        component: () => import('@/views/apps/index'),
        meta: { title: '应用商店', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    name: 'Customer',
    redirect: '/customer/newcustomer',
    meta: { title: '客户', icon: 'el-icon-user' },
    children: [
      {
        path: 'newcustomer',
        name: 'newcustomer',
        component: () => import('@/views/customer/newCustomer'),
        meta: { title: '新用户', icon: 'el-icon-plus' }
      },
      {
        path: 'listcustomer',
        name: 'List Customer',
        component: () => import('@/views/customer/customerList'),
        meta: { title: '用户列表', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/templates',
    component: Layout,
    name: 'Template',
    // redirect: '/Device/newdevice',
    meta: { title: '终端设备', icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'newtemplate',
        name: 'New Template',
        component: () => import('@/views/signageTemplate/newTemplate'),
        meta: { title: '注册', icon: 'el-icon-plus' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    // redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
