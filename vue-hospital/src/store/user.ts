import { defineStore } from "pinia";
import { reqCode, reqUserLogin } from "@/api/hospital";
import type { LoginData, UserLoginResponseData, } from '@/api/hospital/type'
import type { UserState } from '@/store/modules/interface/index'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            visiable: false,
            code: '',
            userInfo: JSON.parse(GET_TOKEN() as string) || {}

        }
    },
    actions: {
        async getCode(phone: string) {
            let result: any =await reqCode(phone)
            if(result.code == 200) {
                this.code = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userLogin(loginData: LoginData) {
            let result: UserLoginResponseData = await reqUserLogin(loginData);
            if (result.code == 200) {
                this.userInfo = result.data;
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        logout() {
            this.userInfo = { name: '', token: '' };
            REMOVE_TOKEN();
        },
        queryState() {
            let timer = setInterval(() => {
                if (GET_TOKEN()) {
                    this.visiable = false;
                    this.userInfo = JSON.parse(GET_TOKEN() as string);
                    clearInterval(timer);
                }
            }, 1000);
        }
    },
    getters: {

    }
});

export default useUserStore;