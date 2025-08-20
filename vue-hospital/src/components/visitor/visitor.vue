<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 1 ? "医保" : "自费" }}</span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button
          circle
          type="primary"
          size="default"
          :icon="Edit"
          @click="handler"
        ></el-button>

        <el-popconfirm
          @confirm="removeUser"
          :title="`你确定要删除${user.name}`"
          width="200px"
        >
          <template #reference>
            <el-button
              v-if="$route.path == '/user/patient'"
              circle
              type="danger"
              size="default"
              :icon="Delete"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型:{{ user.param.certificatesTypeString }}</p>
      <p>证件号码:{{ user.certificatesNo }}</p>
      <p>用户性别:{{ user.sex == 0 ? "女生" : "男士" }}</p>
      <p>出生日期：{{ user.birthdate }}</p>
      <p>手机号码：{{ user.phone }}</p>
      <p>婚姻状况:{{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
      <p>当前住址{{ user.param.cityString }}</p>
      <p>详细地址：{{ user.param.fullAddress }}</p>
      <!-- 红色的已经选择的盒子 -->
      <transition name="confirm">
        <div class="confirm" v-if="index === currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { reqRemoveUser } from "@/api/user";
import { ElMessage } from "element-plus";


let $route = useRoute();
let $router = useRouter();
//接受父组件传递过来的就诊人信息展示
let props = defineProps(["user", "index", "currentIndex"]);
let $emit = defineEmits(["changeScene",'removeUser']);

//相应就诊人组件修改按钮的回调
const handler = () => {
  //要么是就诊人管理模块点击修改按钮
  //要么预约挂号点击修改按钮
  if ($route.path == "/user/patient") {
    $emit("changeScene", props.user);
  } else {
    //路由跳转携带参数
    $router.push({ path: "/user/patient", query: { type: "edit", id: props.user.id } });
  }
};

//删除某一个用户
const removeUser = async () => {
  try {
    //删除用户成功
    await reqRemoveUser(props.user.id);
    //消息提示
    ElMessage({
      type:'success',
      message:'删除成功'
    });
    $emit('removeUser');
  } catch (error) {}
};
</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 10px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 20px;
    p {
      line-height: 40px;
    }
    .confirm {
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      left: 20%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
    }

    .confirm-enter-from {
      transform: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.3s;
    }

    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>
