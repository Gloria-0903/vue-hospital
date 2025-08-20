<template>
    <div>
        <Carousel/>
        <Search/>

        <el-row gutter="20">
            <el-col :span="20">
                <Level @SearchByLevel="getLevel"/>
                <Region @SearchByRegion="getRegion"/>
                <div class="hospital" v-if="hasHospitalArray.length>0">
                    <Card class="item" v-for="(item, index) in hasHospitalArray" :key="index" :hospitalInfo="item"/>
                </div>
                <el-empty v-else description="没有医院信息" />
                <el-pagination
                      v-model:current-page="pageNo"
                      v-model:page-size="pageSize"
                      :page-sizes="[10, 20, 30, 40]"
                      :background="true"
                      layout="prev, pager, next, jumper,->,sizes,total"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                    />
                </el-col>
            <el-col :span="4">
                <Tip/>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Carousel from '@/page/home/carousel/index.vue'
import Search from '@/page/home/search/index.vue'
import Level from '@/page/home/level/index.vue'
import Region from '@/page/home/region/index.vue'
import Card from '@/page/home/card/index.vue'
import Tip from '@/page/home/tip/index.vue'
import { ref, onMounted } from 'vue'
import { reqHospital } from '@/api/home'
import type { Content, HospitalResponseData } from '@/api/home/type'

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)

let hasHospitalArray = ref<Content>([])
let total = ref<number>(0)

let hostype = ref<string>('')
let districtCode = ref<string>('')

const getHospitalInfo = async () => {
    let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
    if(result.code == 200) {
        hasHospitalArray.value = result.data.content
        total.value = result.data.totalElements
        console.log(total.value)
    }
}  
onMounted(() => {
    getHospitalInfo()
})

const currentChange = () => {
    getHospitalInfo()
}

const sizeChange = () => {
    pageNo.value = 1
    getHospitalInfo()
}

const getLevel = (level: string) => {
    hostype.value = level
    getHospitalInfo()
}

const getRegion = (region: string) => {
    districtCode.value = region
    getHospitalInfo()
}
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}

</style>

