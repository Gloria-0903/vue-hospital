import { createRouter, createWebHistory } from "vue-router";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/page/home/index.vue')
        },
        {
            path: '/hospital',
            component: () => import('@/page/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    component: () => import('@/page/hospital/register/index.vue'),
                    meta:{
                        title:'预约挂号'
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/page/hospital/detail/index.vue'),
                    meta:{
                        title:'医院详情'
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/page/hospital/notice/index.vue'),
                    meta:{
                        title:'预约通知'
                    }
                },
                {
                    path: 'close',
                    component: () => import('@/page/hospital/close/index.vue'),
                    meta:{
                        title:'停诊信息'
                    }
                },
                {
                    path: 'search',
                    component: () => import('@/page/hospital/search/index.vue'),
                    meta:{
                        title:'查询'
                    }
                },
                {
                    path: 'register_step1',
                    component: () => import('@/page/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
                {
                    path: 'register_step2',
                    component: () => import('@/page/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约第二步'
                    }
                },

            ]
        },
        {
            path: '/wxlogin',
            component: () => import('@/page/wxlogin/index.vue')
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/user',
            component: () => import('@/page/user/index.vue'),
            children: [
                {
                    path: 'certification',
                    component: () => import('@/page/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },
                {
                    path: 'order',
                    component: () => import('@/page/user/order/index.vue'),
                    meta:{
                        title:'挂号订单'
                    }
                },
                {
                    path: 'patient',
                    component: () => import('@/page/user/patient/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },
                {
                    path: 'profile',
                    component: () => import('@/page/user/profile/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import('@/page/user/feedback/index.vue'),
                    meta:{
                        title:'信息反馈'
                    }
                }
            ]
        }
    ],
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})