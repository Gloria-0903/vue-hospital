import router from "./router";
// @ts-ignore
import Nprogress from 'nprogress';
import useUserStore from '@/store/user';
import pinia from '@/store'
let userStore = useUserStore(pinia);
//引入进度条的样式
import "nprogress/nprogress.css"
Nprogress.configure({ showSpinner: false });
//存储用户未登录可以访问路由得路径
let whiteList = ["/home", '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];
//添加相应的全局守卫
//前置守卫
router.beforeEach((to, from, next) => {
    //访问路由组件的之前,进度条开始动
    Nprogress.start();
    //动态设置网页左上角的标题
    document.title = `尚医通-${to.meta.title}`;
    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    //用户登陆了
    if (token) {
        next();
    } else {
        //用户未登录
        if (whiteList.includes(to.path)) {
            next();
        } else {
            //登录组件显示不来
            userStore.visiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } })
        }

    }

});

//后置路由
router.afterEach((to, from) => {
    //访问路由组件成功,进度条消息
    Nprogress.done();
})