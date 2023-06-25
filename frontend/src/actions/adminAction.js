import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    REG_REQUEST,
    REG_SUCCESS,
    REG_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL,
    DOWNLOAD_REQUEST,
    DOWNLOAD_SUCCESS,
    DOWNLOAD_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstant';

export const  login = (email, password)=> async(dispatch)=>{
    try{
    dispatch({
        type: LOGIN_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/login',{email,password},config);
    localStorage.setItem('token', data.token);
  //  console.log(JSON.stringify(data));
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    })

    } catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  register = (userData)=> async(dispatch)=>{
    try{
    dispatch({
        type: REG_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'multipart/form-data'
        }
    }
    const {data} = await axios.post('/api/v1/register',userData,config);
    localStorage.setItem('token', data.token);
   
    dispatch({
        type: REG_SUCCESS,
        payload: data.admin
    })

    } catch(error){
        dispatch({
            type:REG_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  loadUser = ()=> async(dispatch)=>{
    try{
        
    dispatch({
        type: LOAD_USER_REQUEST
    })
   
    const {data} = await axios.get('/api/v1/profile');
    dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.admin
    })

    } catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  logout = ()=> async(dispatch)=>{
    try{
   
     await axios.get('/api/v1/logout');
     localStorage.removeItem('token');
    dispatch({
        type: LOGOUT_USER_SUCCESS,

    })

    } catch(error){
        dispatch({
            type:LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors =()=> async (dispatch)=>{
    dispatch({
    type: CLEAR_ERRORS
    });
}

//Update Profile

export const  updateProfile = (userData)=> async(dispatch)=>{
    try{
    dispatch({
        type: UPDATE_PROFILE_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'multipart/form-data'
        }
    }
    const {data} = await axios.put('/api/v1/profile/update',userData,config);
    dispatch({
        type:UPDATE_PROFILE_SUCCESS,
        payload: data.success
    })

    } catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
    
}

//update Password

export const  updatePassword = (passwords)=> async(dispatch)=>{
    try{
    dispatch({
        type: UPDATE_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/form-data'
        }
    }
    const {data} = await axios.put('/api/v1/password/update',passwords,config);
    dispatch({
        type:UPDATE_PASSWORD_SUCCESS,
        payload: data.success
    })

    } catch(error){
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}

export const  forgotPassword = (email)=> async(dispatch)=>{
    try{
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/password/forgot',email,config);
    dispatch({
        type:FORGOT_PASSWORD_SUCCESS,
        payload: data.message
        
    })

    } catch(error){
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}
export const  resetPassword = (token,passwords)=> async(dispatch)=>{
    try{
    dispatch({
        type: NEW_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.put(`/api/v1/password/reset/${token}` ,passwords,config);
    dispatch({
        type:NEW_PASSWORD_SUCCESS,
        payload: data.success
        
    })

    } catch(error){
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}

export const addNotification = (formData)=> async(dispatch)=>{
    try{
        dispatch({
            type: GET_NOTIFICATION_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        const {result} = await axios.post(`/api/v1/addnotification` ,formData,config);
        const {data} = await axios.get('/api/v1/getnotifications');
        dispatch({
            type:GET_NOTIFICATION_SUCCESS,
            payload: data.notifications
            
        })
    
        } catch(error){
            dispatch({
                type:GET_NOTIFICATION_FAIL,
                payload: error.response.data.message
            })
        }
    

}
export const fetchNotification = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:GET_NOTIFICATION_REQUEST
        })
        const {data} = await axios.get('/api/v1/getnotifications');
        dispatch({
            type: GET_NOTIFICATION_SUCCESS,
            payload: data.notifications
        })
    }catch(error){
        dispatch({
            type:GET_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }

}
export const downloadPdf = (data) => async (dispatch) => {
    try {
      dispatch({ type: DOWNLOAD_REQUEST });
  
      const response = await axios.post('/api/v1/downloadnotification', data, {
        responseType: 'blob', // Set the response type to 'blob'
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
  
      dispatch({ type: DOWNLOAD_SUCCESS });
    } catch (error) {
      dispatch({
        type: DOWNLOAD_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  export const deleteNotification = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_NOTIFICATION_REQUEST });
      const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
  
      const result = await axios.post('/api/v1/deletenotification', id,config);
      const {data} = await axios.get('/api/v1/getnotifications');
  
      dispatch({
        type:GET_NOTIFICATION_SUCCESS,
        payload: data
        
    })
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_FAIL,
        payload: error.response.data.message
      });
    }
  };


  