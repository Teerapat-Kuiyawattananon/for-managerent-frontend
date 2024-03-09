import axios from "axios";

const API_URL = "http://localhost:3232/api/apartments/";

class ProfileService {
    getProfileList(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/profiles")
            .then(response => {
                return response.data;
            });
    }

    createProfile(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/profiles", data)
            .then(response => {
                return response.data;
            });
    }
    
    getProfileDetail(apartId: Number, profileId: Number) {
        return axios
            .get(API_URL + apartId + "/profiles/" + profileId)
            .then(response => {
                return response.data;
            });
    }

    updateProfile(apartId: Number, profileId: Number, data: any) {
        return axios
            .put(API_URL + apartId + "/profiles/" + profileId, data)
            .then(response => {
                return response.data;
            });
    }

    deleteProfile(apartId: Number, profileId: Number) {
        return axios
            .delete(API_URL + apartId + "/profiles/" + profileId)
            .then(response => {
                return response.data;
            });
    }

    getProfileUserList(apartId: Number) {
        return axios
            .get(API_URL + apartId + "/profiles/user")
            .then(response => {
                return response.data;
            });
    }

    addUserWithProfile(apartId: Number, data: any) {
        return axios
            .post(API_URL + apartId + "/profiles/user", data)
            .then(response => {
                return response.data;
            });
    }

    getProfileUserDetail(apartId: Number, userId: Number) {
        return axios
            .get(API_URL + apartId + "/profiles/user/" + userId)
            .then(response => {
                return response.data;
            });
    }

    updateUserWithProfile(apartId: Number, userId: Number, data: any) {
        return axios
            .put(API_URL + apartId + "/profiles/user/" + userId, data)
            .then(response => {
                return response.data;
            });
    }
}

export default new ProfileService();