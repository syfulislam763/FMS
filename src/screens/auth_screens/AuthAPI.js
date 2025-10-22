import api from "../../constants/api";
import { CREATE_USER, RESEND_OTP, VERIFY_EMAIL } from "../../constants/Paths";
import ToastMessage from "../../constants/ToastMessage";



export const create_user = async (payload, cb) => {
    try{
        const res = await api.post(CREATE_USER, payload)

        cb(res.data)

    }catch(e){
        cb(null)
        console.log(JSON.stringify(e, null, 2))
        ToastMessage("error", e.message, 3000)
    }
}


export const verify_email = async (payload, cb) => {
    try{
        const res = await api.post(VERIFY_EMAIL, payload)
        cb(res.data)
    }catch(e){
        cb(null)
        console.log(JSON.stringify(e, null, 2))
        ToastMessage("error", e.message, 3000)
    }
}

export const resend_otp = async (payload, cb) => {
    try{
        const res = await api.post(RESEND_OTP, payload)
        cb(res.data)
    }catch(e){
        cb(null)
        console.log(JSON.stringify(e, null, 2))
        ToastMessage("error", e.message, 3000)
    }
}