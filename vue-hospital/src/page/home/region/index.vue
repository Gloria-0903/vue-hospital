<template>
    <div class="region">
        <div class="content">
            <div class="left">地区</div>
            <ul>
                <li :class="{ active: RegionFlag == '' }" @click="changeRegion('')">全部</li>
                <li v-for="item in RegionArr" :key="item.value" :class="{ active: RegionFlag == item.value }" @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type';
import { onMounted, ref } from 'vue';

let RegionArr = ref<HospitalLevelAndRegionArr>([])
let RegionFlag =ref<string>('')

const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
  if(result.code == 200) {
    RegionArr.value = result.data
  }
}
onMounted(() => getRegion())

let $emit = defineEmits(['SearchByRegion'])

const changeRegion = (region: string) => {
  RegionFlag.value = region
  $emit('SearchByRegion',region)
}

</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 50px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>