import request from "@/utils/request";
import type { 
    SubmitOrder, 
    OrderResponseData, 
    QrCode, 
    PayReslt, 
    UseringoResponseData, 
    CertationTypeResponseData, 
    UserParams, 
    UserOrderInfoResponseData, 
    AllUserResponseData, 
    AllOrderStateResponseData, 
    AddOrUpdateUser} from '@/api/user/type';


export const API = {
    SUBMITORDER_URL : '/order/orderInfo/auth/submitOrder/',
    GETORDERINFO_URL : '/order/orderInfo/auth/getOrderInfo/',
    ORDERCANCEL_URL : '/order/orderInfo/auth/cancelOrder/',
    QRCODE_URL : '/order/weixin/createNative/',
    PAYRESULT_URL : '/order/weixin/queryPayStatus/',
    USERINFO_URL : '/user/auth/getUserInfo',
    CERTIFICATIONTYPE_URL : '/cmn/dict/findByDictCode/',
    USERCERTATION_URL : '/user/auth/userAuah',
    USERORDERINFO_URL : '/order/orderInfo/auth/',
    ALLUSER_URL : '/user/patient/auth/findAll',
    ORDERSTATE_URL : '/order/orderInfo/auth/getStatusList',
    CITY_URL : '/cmn/dict/findByParentId/',
    ADDUSER_URL : '/user/patient/auth/save',
    UPDATEUSER_URL : '/user/patient/auth/update',
    DELETEUSER_URL : '/user/patient/auth/remove/'
} as const;

export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => 
    request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`);

export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id);

export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDERCANCEL_URL + id);

export const reqQrcode = (orderId: string) => request.get<any, QrCode>(API.QRCODE_URL + orderId);

export const reqQueryPayState = (orderId: string) => request.get<any, PayReslt>(API.PAYRESULT_URL + orderId);

export const reqUserInfo = () => request.get<any, UseringoResponseData>(API.USERINFO_URL);

export const reqCertationType = (CertificatesType = 'CertificatesType') => 
    request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType);

export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data);

export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => 
    request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

export const reqAllUser = () => request.get<any, AllUserResponseData>(API.ALLUSER_URL);

export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL);

export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId);

export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
}

export const reqRemoveUser = (id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)
