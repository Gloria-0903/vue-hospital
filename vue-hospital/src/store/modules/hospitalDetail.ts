import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDeparment } from '@/api/hospital';
import type { HospitalDetail } from '@/api/hospital/type'
import type { HosPitalDetail, DeparmentResponseData } from '@/api/hospital/type';
import type { DetailState } from "./interface";

const useDetailStore = defineStore('Detail', {
     state: (): DetailState => {
        return {
            hospitalInfo: ({} as HosPitalDetail),
            deparmentArr:[]
        }
    },
    actions: {
        async getHospital(hoscode: string) {
            let result: HospitalDetail = await reqHospitalDetail(hoscode);
            if (result.code == 200) {
                this.hospitalInfo = result.data;
            }
        },
        async getDepartment(hoscode: string) {
            let result: DeparmentResponseData = await reqHospitalDeparment(hoscode);
            if (result.code == 200) {
                this.deparmentArr = result.data;
            }
        },
    },
    getters: {

    }
});

export default useDetailStore;