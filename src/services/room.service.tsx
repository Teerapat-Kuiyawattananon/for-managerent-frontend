import axios from "axios";

const API_URL = "http://localhost:3232/api/apartments/";

class RoomService {
    getRoomsList(id: Number) {
        return axios
            .get(API_URL + id + "/rooms")
            .then(response => {
                return response.data;
            });
    }

    getRenterByRoomId(id: Number) {
        return axios
            .get(API_URL + "rooms/" + id + "/renter")
            .then(response => {
                return response.data;
            });
        }
    
}

export default new RoomService();