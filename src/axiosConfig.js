import axios from "axios";

const api=axios.create({
    baseURL: "https://messenger-backend-2k2q.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});
export default api;