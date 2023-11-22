import { LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from '../constants/adminConstant';
import { CLEAR_OTP } from '../constants/formConstant';
import {
    OTP_REQUEST,
    OTP_SUCCESS,
    OTP_FAIL,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstant';

export const userOtpSent = (state ={otp:{}},action)=>{
    switch(action.type){
        case OTP_REQUEST:
            return{
                loading:true,
                otpSent:false
            }
        case OTP_SUCCESS:
            return {
                ...state,
                loading:false,
                otpSent:true,
                email: action.payload.email
            }
       
        case OTP_FAIL:
                return{
                    loading:false,
                    otpSent:false,
                    email:null,
                    error: action.payload
                }
        case CLEAR_OTP:
            return{
                loading:false,
                otpSent:false,
                email:null,
                error: action.payload
            }
        
              
         default:
            return state;
    }

}

export const userAuth = (state = {user:{}},action) =>{
    switch(action.type){
        case OTP_VERIFY_REQUEST:
            return{
                loading:true,
                isUserAuthenticated:false
            }
        case OTP_VERIFY_SUCCESS:
        
            return {
                ...state,
                loading:false,
                isUserAuthenticated:true,
                userAuth: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUserAuthenticated:false,
                userAuth: null
            }
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                error: action.payload
            }
        case OTP_VERIFY_FAIL:
            return{
                ...state,
                loading:false, 
                isUserAuthenticated:false,
                userAuth: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
         default:
            return state;
    }
}