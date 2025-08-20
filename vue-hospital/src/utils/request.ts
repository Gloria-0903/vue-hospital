import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/user';

const request = axios.create({
      baseURL: '/api',
      timeout: 5000
});

request.interceptors.request.use((config) => {
    let usertStore = useUserStore()
    if(usertStore.userInfo.token) {
      config.headers.token = usertStore.userInfo.token
    }   

    return config
})

request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    let status = error.response.status;
      switch (status) {
            case 404:
                  ElMessage({
                        type: 'error',
                        message: '请求失败路径出现问题'
                  })
                  break;
            case 500 | 501 | 502 | 503 | 504 | 505:
                  ElMessage({
                        type: 'error',
                        message: '服务器挂了'
                  })
                  break;
            case 401:
                  ElMessage({
                        type: 'error',
                        message: '参数有误'
                  })
                  break;
      }
    return Promise.reject(new Error(error.messge))
})

export default request