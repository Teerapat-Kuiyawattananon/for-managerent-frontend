import axios from "axios";

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
}

export default new ApartmentService();