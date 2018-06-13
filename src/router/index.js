import Vue from 'vue';
import Router from 'vue-router';
import Login from '../modules/login/login';
import Head from '../modules/head/head';//公共头部
import UserManagement from '../modules/userManagement/userManagement';
import ActivityManage from '../modules/activityManage/activityManage';//活动列表
import SelectTemplate from '../modules/selectTemplate/selectTemplate';//选择模板
import ActivityDefinition from '../modules/activityDefinition/activityDefinition';//活动定义
import ActivityDetails from '../modules/details/details';//活动详情
import PageConfigure from '../modules/pageConfigure/pageConfigure.vue';//页面配置
import ActivityAuditList from '../modules/activityAuditList/activityAuditList';//活动详情
import TestPage from '../modules/testPage/testPage';//测试页面


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: Login,
    //   children:[
    //     {
    //       path:'/a1',
    //       component: ActivityManage
    //     }
    //   ]
    // },
    {
      path: '/',
      component: Head,
      redirect: '/activityManage',
      children:[
        //活动列表
        {
          path:'/activityManage',
          component: ActivityManage
        },
        //选择模板
        {
          path:'/selectTemplate',
          component: SelectTemplate
        },
        //活动定义
        {
          path:'/activityDefinition',
          component: ActivityDefinition
        },
        //活动详情页
        {
          path:'/activityDetails',
          component: ActivityDetails
        },
        //H5页面配置
        {
          path:'/pageConfigure',
          component: PageConfigure
        },
        {
          path:'/activityAuditList',
          component: ActivityAuditList
        },
        {
          path:'/testPage',
          component: TestPage
        }
      ]
    }
  ]
})
