import axios from "axios"
import Cookies from "js-cookie"
import {baseURL} from "../config"

const service = axios.create({
    baseURL: baseURL,
    timeout: 15000
})

service.interceptors.request.use( config => {
    if(Cookies.get("token")){
        config.headers["token"] = Cookies.get("token")
    }
    if(Cookies.get["key"]){
        config.headers["key"] = Cookies.get("key")
    }
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code !== 200){
            if(res.code === 1100){
                console.log(res.message)
                return false
            } else if(res.code === 105){
                console.error(res.message)
                if(Cookies.get("token")){
                    Cookies.remove("token")
                }
            }
        } else {
            return response
        }
    }, error => {
        return Promise.reject(error)
    }
)

export default service

