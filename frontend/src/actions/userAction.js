import axios from "axios";
import {
    OTP_REQUEST,
    OTP_SUCCESS,
    OTP_FAIL,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAIL
} from '../constants/userConstant';

export const  otpRequest = (email)=> async(dispatch)=>{
    try{
    dispatch({
        type: OTP_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post(process.env.REACT_APP_API_URL+'/api/v1/user/login',{email},config);
    dispatch({
        type: OTP_SUCCESS,
        payload: data
    })

    } catch(error){
        dispatch({
            type:OTP_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  otpVerify = (otp,email)=> async(dispatch)=>{
    try{
    dispatch({
        type: OTP_VERIFY_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    console.log(email+"x"+otp);
    const {data} = await axios.post(process.env.REACT_APP_API_URL+'/api/v1/user/verifyotp',{email,otp},config);
    dispatch({
        type: OTP_VERIFY_SUCCESS,
        payload: data
    })

    } catch(error){
        dispatch({
            type:OTP_VERIFY_FAIL,
            payload: error.response.data.message
        })
    }
}