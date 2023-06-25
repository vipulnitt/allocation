import axios from "axios";
import {
    NORM_EDIT_REQUEST,
    NORM_EDIT_SUCCESS,
    NORM_EDIT_FAIL,
    NORM_REQUEST,
    NORM_SUCCESS,
    NORM_FAIL,
    SUBMISSION_REQUEST,
    SUBMISSION_SUCCESS,
    SUBMISSION_FAIL,
    FORM_DATA_REQUEST,
    FORM_DATA_SUCCESS,
    FORM_DATA_FAIL,
    QUARTER_EDIT_REQUEST,
    QUARTER_EDIT_SUCCESS,
    QUARTER_EDIT_FAIL,
    QUARTER_REQUEST,
    QUARTER_SUCCESS,
    QUARTER_FAIL,
    TIME_EDIT_REQUEST,
    TIME_EDIT_SUCCESS,
    TIME_EDIT_FAIL
} from '../constants/formConstant';

export const  fetchNorms = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:NORM_REQUEST
        })
        const {data} = await axios.get('/api/v1/fetchnorms');
        dispatch({
            type: NORM_SUCCESS,
            payload: data.norms
        })
    }catch(error){
        dispatch({
            type:NORM_FAIL,
            payload: error.response.data.message
        })
    }

}
export const  editNorms = (norms)=> async(dispatch)=>{
    try{
        dispatch({
            type:NORM_EDIT_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        }
        console.log(JSON.stringify(norms));
        const {data} = await axios.put('/api/v1/addnorms',norms,config);
        dispatch({
            type: NORM_EDIT_SUCCESS,
            payload: data.norms
        })
    }catch(error){
        dispatch({
            type:NORM_EDIT_FAIL,
            payload: error.response.data.message
        })
    }

}

export const formSubmission = (data) => async(dispatch)=>{
    try{
        dispatch({
            type:SUBMISSION_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        }
    
        const {res} = await axios.post('/api/v1/user/form',data,config);
        dispatch({
            type: SUBMISSION_SUCCESS,
            payload: res
        })
    }catch(error){
        dispatch({
            type:SUBMISSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const exportData = () => async(dispatch)=>{
    try{
        dispatch({
            type:FORM_DATA_REQUEST
        })

    
        const {data} = await axios.get('/api/v1/admin/formdata');
       // console.log(data);
        dispatch({
            type: FORM_DATA_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type:FORM_DATA_FAIL,
            payload: error.response.data.message
        })
    }
}
export const fetchQuarter = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:QUARTER_REQUEST
        })
        const {data} = await axios.get('/api/v1/fetchquarterDetails');
        dispatch({
            type: QUARTER_SUCCESS,
            payload: data.quarters
        })
    }catch(error){
        dispatch({
            type:QUARTER_FAIL,
            payload: error.response.data.message
        })
    }

}
export const  editQuarter = (quarter)=> async(dispatch)=>{
    try{
        dispatch({
            type:QUARTER_EDIT_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        };
        console.log(JSON.stringify(quarter));
        const {data} = await axios.put('/api/v1/addquarterDetails',quarter,config);
        dispatch({
            type: QUARTER_EDIT_SUCCESS,
            payload: data.quaeterDetails
        })
    }catch(error){
        dispatch({
            type:QUARTER_EDIT_FAIL,
            payload: error.response.data.message
        })
    }

}

export const quarterFormSubmission = (data) => async(dispatch)=>{
    try{
        dispatch({
            type:SUBMISSION_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        }
    
        const {res} = await axios.post('/api/v1/user/quarterform',data,config);
        dispatch({
            type: SUBMISSION_SUCCESS,
            payload: res
        })
    }catch(error){
        dispatch({
            type:SUBMISSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const exportQuarterData = () => async(dispatch)=>{
    try{
        dispatch({
            type:FORM_DATA_REQUEST
        })

    
        const {data} = await axios.get('/api/v1/admin/quarterformdata');
       // console.log(data);
        dispatch({
            type: FORM_DATA_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type:FORM_DATA_FAIL,
            payload: error.response.data.message
        })
    }
}

export const modifyTime = (time) => async (dispatch) => {
    try {
      dispatch({ type: TIME_EDIT_REQUEST });
      const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
  
      const data = await axios.post('/api/v1/form/modifytime', time,config);
    
  
      dispatch({
        type:TIME_EDIT_SUCCESS,
        payload: data
        
    })
    } catch (error) {
      dispatch({
        type: TIME_EDIT_FAIL,
        payload: error.response.data.message
      });
    }
  };