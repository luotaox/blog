import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {

        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 20000) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
