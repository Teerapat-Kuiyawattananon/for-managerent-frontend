import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3232/api/apartments/";

class ApartmentService {
    getServiceDetail(id: Number) {
        return axios
            .get(API_URL + id + "/services")
            .then(response => {
                return response.data;
            });
    }

    addServiceDetail(id: Number, data: any) {
        return axios
            .post(API_URL + id + "/services", data)
            .then(response => {
                return response.data;
            });
    }

    getServiceDetailById(apartId: Number, serviceId: Number) {
        return axios
            .get(API_URL + apartId + "/services/" + serviceId)
            .then(response => {
                return response.data;
                });
    }

    addServiceToRoom(apartId: Number, serviceId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/services/" + serviceId, data)
            .then(response => {
                return response.data;
            });
    }

    removeServiceFromRoom(apartId: Number, serviceId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/services/" + serviceId + "/remove", data)
            .then(response => {
                return response.data;
            });
    }

    deleteServiceDetail(apartId: Number, serviceId: Number) {
        return axios
            .delete(API_URL + apartId + "/services/" + serviceId)
            .then(response => {
                return response.data;
            });
    }

    getRoomsWaterServices(apartId: Number, monthDate: string) {
        return axios
            .get(API_URL + apartId + "/water-services?month_date=" + monthDate)
            .then(response => {
                return response.data;
            });
    }

    updateRoomsWaterServices(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/water-services", data)
            .then(response => {
                return response.data;
            });
    }

    getRoomsElecServices(apartId: Number, monthDate: string) {
        return axios
            .get(API_URL + apartId + "/electric-services?month_date=" + monthDate)
            .then(response => {
                return response.data;
            });
    }

    updateRoomsElecServices(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/electric-services", data)
            .then(response => {
                return response.data;
            });
    }
  
    getBillList(apartId: Number, monthDate: string) {
        return axios
            .get(API_URL + apartId + "/bills?month_date=" + monthDate)
             .then(response => {
                return response.data;
            });
    }

    uploadImage(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/upload-qrcode", data)
            .then(response => {
                return response.data;
            });
    }

    getApartmentWaterElecPrice(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/edit-water-electric")
            .then(response => {
                return response.data;
            });
    }

    sendBillList(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/bills", data)
            .then(response => {
                return response.data;
            });
    }
        
    updateApartmentWaterElecPrice(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/edit-water-electric", data)
            .then(response => {
                return response.data;
            });
    }


    getBillPaymentList(apartId: Number, monthDate: string) {
        return axios
            .get(API_URL + apartId + "/bills-payment?month_date=" + monthDate)
            .then(response => {
                return response.data;
            });
    }
        
    getApartmentDetail(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/detail")
            .then(response => {
                return response.data;
            });
    }


    submitMessageBillPayment(apartId: Number, billPaymentId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/bills-payment/" + billPaymentId +"/submit", data)
            .then(response => {
                return response.data;
            });
    }
              
    postAnnounce(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/announce", data, { headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').access_token
            } })
            .then(response => {
                return response.data;
            });
    }

    getYourBillPayment(apartId: Number, monthDate: string) {
        return axios
            .get(API_URL + apartId + "/bills-payment/yourbill?month_date=" + monthDate, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').access_token
                }
            })
            .then(response => {
                return response.data;
            });
    }
        
    getAnnounce(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/announce" , {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').access_token
                }
            })
            .then(response => {
                return response.data;
            });
    }


    payYourBill(apartId: Number, billPaymentId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/bills-payment/" + billPaymentId +"/pay", data)
            .then(response => {
                return response.data;
            });
    }
      
    getYourAnnounce(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/announce/your", {headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').access_token
            }})
            .then(response => {
                return response.data;
            });
    }

    deleteAnnounce(apartId: Number, announceId: Number) {
        return axios
            .delete(API_URL + apartId + "/announce/" + announceId, {headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').access_token
            }})
            .then(response => {
                return response.data;
            });
        }

}

export default new ApartmentService();