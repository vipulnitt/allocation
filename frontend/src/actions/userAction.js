import axios from "axios";
import {
    OTP_REQUEST,
    OTP_SUCCESS,
    OTP_FAIL,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAIL
} from '../constants/userConstant';
import { LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "../constants/adminConstant";

const apiURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  withCredentials: true // Set withCredentials to true for all requests
});


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
    const {data} = await axiosInstance.post(process.env.REACT_APP_API_URL+'/api/v1/user/login',{email},config);
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
    const {data} = await axiosInstance.post(process.env.REACT_APP_API_URL+'/api/v1/user/verifyotp',{email,otp},config);
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
//

export const  logoutUser = ()=> async(dispatch)=>{
    try{
    dispatch({
        type: LOGOUT_USER_REQUEST
    })


    const {data} = await axiosInstance.post(process.env.REACT_APP_API_URL+'/api/v1/user/logout');
    dispatch({
        type: LOGOUT_USER_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: error.response.data.message
      });
    }
    
}