import axios from "axios";

const API_URL = "http://localhost:3232/api/auth/";
interface RegisterFormData {
    full_name: string;
    email: string;
    mobile_number: string;
    username: string;
    password: string;
    confirmPassword: string;
    termsAgreed?: boolean;
}

interface LoginFormData {
    username: string;
    password: string;
}


class AuthService {
    login(formData: LoginFormData) {
        return axios
            .post(API_URL + "login", formData)
            .then(response => {
                if (response.data["user"]) {
                    localStorage.setItem("user", JSON.stringify(response.data["user"]));
                    console.log('set user success', response.data)
                }
                return response;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }


    register(formData: RegisterFormData) {
        return axios.post(API_URL + "register", formData)
        .then(response => {
            if (response.data["user"]) {
                localStorage.setItem("user", JSON.stringify(response.data["user"]));
            }
            return response;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    forgotPassword(email: any) {
        return axios.post(API_URL + "forgot-password", email)
            .then(response => {
                return response.data;
            });
    }

    changePassword(formData: any) {
        return axios.post(API_URL + "reset-password", formData)
            .then(response => {
                return response.data;
            });
    }

    createPassword(formData: any) {
        return axios.post(API_URL + "setup-password", formData)
            .then(response => {
                return response.data;
            });
    }

}

export default new AuthService();