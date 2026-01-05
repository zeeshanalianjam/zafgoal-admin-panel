import axios from "axios"
import { baseURL } from "./summaryApi"

const Axios = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export {Axios}