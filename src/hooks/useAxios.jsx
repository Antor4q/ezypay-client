import axios from "axios";

const axiosApi = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxios = () => {
    return axiosApi
};

export default useAxios;