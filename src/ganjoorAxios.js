import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.ganjoor.net'
});

export default instance;