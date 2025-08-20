export interface ResponseData {
    "code": number,
    "message": string,
    "ok": boolean
}

export interface SubmitOrder extends ResponseData {
    data: number
}

export interface OrderInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

export interface OrderResponseData extends ResponseData {
    data: OrderInfo
}

export interface PayInfo {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}

export interface QrCode extends ResponseData {
    data: PayInfo
}

export interface PayReslt extends ResponseData {
    data: boolean
}

export interface UserInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
    },
    "openid": null,
    "nickName": null,
    "phone": string,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "certificatesUrl": null,
    "authStatus": number,
    "status": number
}

export interface UseringoResponseData extends ResponseData {
    data: UserInfo
}

export interface CertationType {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {

    },
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}
export type CertationArr = CertationType[];

export interface CertationTypeResponseData extends ResponseData {
    data: CertationArr
}

export interface UserParams {
    "certificatesNo": string,
    "certificatesType": string,
    "certificatesUrl": string,
    "name": string
}

export interface Order {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": null,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

export type Records = Order[];

export interface UserOrderInfoResponseData extends ResponseData {
    data: {
        "records": Records
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount": boolean,
        "searchCount": boolean,
        "pages": number
    }
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
    "name": string,
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

export type AllUser = User[];

export interface AllUserResponseData extends ResponseData {
    data: AllUser
}

export interface OrderState {
    "comment": string,
    "status": number
}

export type AllOrderState = OrderState[];

export interface AllOrderStateResponseData extends ResponseData {
    data: AllOrderState
}

export interface AddOrUpdateUser {
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string
}