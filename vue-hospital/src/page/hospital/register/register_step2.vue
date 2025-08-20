<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
        </div>
      </template>
      <div class="user">
        <Visitor
          @click="changeIndex(index)"
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          :index="index"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务器:</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        :disabled="currentIndex == -1 ? true : false"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqGetUser, reqDoctorInfo } from "@/api/hospital";
import { reqSubmitOrder } from "@/api/user";
import type { SubmitOrder } from "@/api/user/type";
import { onMounted, ref } from "vue";
import type { UserResponseData, UserArr, DoctorInfoData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let $route = useRoute();
let docInfo = ref<any>({});
let $router = useRouter();

let currentIndex = ref<number>(-1);
let userArr = ref<UserArr>([]);

const fetchUserData = async () => {
  let result: UserResponseData = await reqGetUser();
  if (result.code == 200) {
    userArr.value = result.data;
  }
};
const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string);
  if (result.code == 200) {
    docInfo.value = result.data;
  }
};

onMounted(() => {
  fetchUserData();
  fetchInfo();
});

const changeIndex = (index: number) => {
  currentIndex.value = index;
};

const submitOrder = async () => {
  let hoscode = docInfo.value.hoscode;
  let scheduleId = docInfo.value.id;
  let patientId = userArr.value[currentIndex.value].id;
  let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId);
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};

const goUser = ()=>{
   $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
