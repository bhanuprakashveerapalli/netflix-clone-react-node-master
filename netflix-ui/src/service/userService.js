import axios from 'axios'
import { serverApi } from '../utils/constants';

export const register = async (data) => {
    try {

        console.log('data register service', data);
        const res = await axios.post( `${serverApi}/register`, data, {
            withCredentials: true
        })
        return res.data.data
    } catch(error) {
        if ((error).response?.status === 500) {
            console.error(error.response?.data?.msg)
        } else {
            console.error(error)
        }
        return false
    }
}

export const login = async (data) => {
    try {
        console.log(data);
        const res = await axios.post(`${serverApi}/login`, data, {
            withCredentials: true
        })
        
        return res.data

    } catch(error) {
        if ((error).response?.status === 500) {
            console.error(error.response?.data?.msg)
        } else {
            console.error(error)
        }

        return {
            status: false,
            msg: error.response?.data?.msg
        }
    }
}
