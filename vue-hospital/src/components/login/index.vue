<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog">
      <el-row>
        <el-col :span="12">
          <div class="login">
            <div v-show="scene == 0">
              <el-form ref="form" :model="loginParam" :rules="rules">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="请你输入手机号码"
                    :prefix-icon="User"
                    v-model="loginParam.phone"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    placeholder="请输入手机验证码"
                    :prefix-icon="Lock"
                    v-model="loginParam.code"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="!isPhone||flag ? true: false">
                    <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"/>
                    <span v-else @click="getCode">获取验证码</span>
                  </el-button>
                </el-form-item>
              </el-form>
              <el-button
                style="width: 100%"
                type="primary"
                size="default"
                :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                @click="login"
                >用户登录</el-button>
              <div class="bottom" @click="changeScene">
                <p>微信扫码登录</p>
                <svg
                  t="1685263287521"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2450"
                  width="32"
                  height="32"
                >
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445"
                    p-id="2451"
                  ></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445"
                    p-id="2452"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="webchat" v-show="scene == 1">
              <div id="login_container"></div>
              <div class="phone" @click="handler">
                <p>手机短信验证码登录</p>
                <svg
                  t="1685676069573"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2476"
                  width="16"
                  height="16"
                >
                  <path
                    d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                    p-id="2477"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="leftContent">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="" />
                <svg
                  t="1685263287521"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2450"
                  width="16"
                  height="16"
                >
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#cdcdcd"
                    p-id="2451"
                  ></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#cdcdcd"
                    p-id="2452"
                  ></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>“快速预约挂号”</p>
              </div>
              <div class="item">
                <img src="../../assets/images/code_login_wechat.png" alt="" />
                <svg
                  t="1685263518283"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3668"
                  width="16"
                  height="16"
                >
                  <path
                    d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                    fill="#000000"
                    p-id="3669"
                  ></path>
                </svg>
                <p>扫一扫下载</p>
                <p>“预约挂号”APP</p>
              </div>
            </div>
          </div>
          <p class="tip">尚医通官方指定平台</p>
          <p class="tip">快速挂号 安全放心</p>
        </el-col>
      </el-row>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import useUserStore from "@/store/user";
import { computed, reactive, ref } from "vue";
import CountDown from '@/components/countdown/index.vue'
import { ElMessage } from "element-plus";
import { reqWxLogin } from "@/api/hospital";
import type { WXLoginResponseData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";

let userStore = useUserStore();

let scene = ref<number>(0)
let flag = ref<boolean>(false)
let form = ref<any>()
let $router = useRouter()
let $route = useRoute()

const changeScene = async () => {
  scene.value = 1

  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
  let result: WXLoginResponseData = await reqWxLogin(redirect_URL);

  //@ts-ignore
  new WxLogin({
    self_redirect: true, 
    id: "login_container", 
    appid: result.data.appid, 
    scope: "snsapi_login", 
    redirect_uri: result.data.redirectUri, 
    state: result.data.state, 
    style: "black",
    href: "",
  });
}

let loginParam = reactive({
  phone: "", 
  code: "", 
});

let isPhone = computed(() => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(loginParam.phone);
});

const getCode = async () => {
  if (!isPhone.value || flag.value) return
  try {
    await userStore.getCode(loginParam.phone)
    loginParam.code = userStore.code
    flag.value = true
  } catch ( error ) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
}

const getFlag = (value: boolean) => {
  flag.value = value
}

const login = async () => {
  await form.value.validate();
  try {
    await userStore.userLogin(loginParam);
    userStore.visiable = false;
    let redirect = $route.query.redirect;
    if(redirect){
      $router.push(redirect as string);
    }else{
      $router.push('/home');
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};

const validatorPhone = (rule: any, value: any, callBack: any) => {
  console.log(rule)
  const reg = /^1[3-9]\d{9}$/
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
}

const validatorCode = (rule: any, value: any, callBack: any) => {
  console.log(rule)
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
}

const rules = {
  phone: [{ trigger: "change", validator: validatorPhone }],
  code: [{ trigger: "change", validator: validatorCode }],
}

const closeDialog = () => {
  userStore.visiable = false;
};

const handler = () => {
  scene.value = 0;
};

</script>

<style scoped lang="scss">
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .login {
    padding: 20px;
    border: 1px solid #ccc;
    .webchat {
      display: flex;
      flex-direction: column;
      align-items: center;
      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;
        :hover {
          cursor: pointer;
        }
        p {
          margin: 10px 0px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    :hover {
      cursor: pointer;
    }
    p {
      margin: 10px 0px;
    }
  }

  .leftContent {
    .top {
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 130px;
          height: 130px;
        }
        p {
          margin: 5px 0px;
        }
      }
    }
  }

  .tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>