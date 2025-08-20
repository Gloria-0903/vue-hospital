export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface HosPitalDetail {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null
    }
}

export interface HospitalDetail extends ResponseData {
    data: HosPitalDetail
}

export interface Deparment {
    "depcode": string,
    "depname": string,
    "children"?: Deparment[]
}

export type DeparmentArr = Deparment[];

export interface DeparmentResponseData extends ResponseData {
    data: DeparmentArr
}

export interface LoginData {
    phone: string,
    code: string
}

export interface UserInfo {
    name: string,
    token: string
}

export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
}

export interface WXLogin {
    "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string
}

export interface WXLoginResponseData extends ResponseData {
    data: WXLogin
}

export interface BaseMap {
    "workDateString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string
}

export interface WorkData {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": null,
    "availableNumber": number,
    "status": number
}

export type BookingScheduleList = WorkData[]

export interface HospitalWordData extends ResponseData {
    data: {
        total: number,
        bookingScheduleList: BookingScheduleList,
        baseMap: BaseMap
    }
}

export interface Doctor {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": string,
    "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill": string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount": number,
    "status": number,
    "hosScheduleId": string
}

export type DocArr = Doctor[];

export interface DoctorResponseData extends ResponseData {
    data: DocArr
}

export interface User {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": number,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,
    "birthdate": string,
    "phone": string,
    "isMarry": number,
    "provinceCode": null,
    "cityCode": null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo": null,
    "status": string
}
export type UserArr = User[];

export interface UserResponseData extends ResponseData {
    data: UserArr
}

export interface DoctorInfoData extends ResponseData{
    data:Doctor
}