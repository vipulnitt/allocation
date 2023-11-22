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
  TIME_EDIT_FAIL,
  GET_COUNT_REQUEST,
  GET_COUNT_SUCCESS,
  GET_COUNT_FAIL,
  SUBMISSIONS1_REQUEST,
  SUBMISSIONS1_SUCCESS,
  SUBMISSIONS1_FAIL,
  SUBMISSIONS2_REQUEST,
  SUBMISSIONS2_SUCCESS,
  SUBMISSIONS2_FAIL,
  PRE_SUBMISSIONS_REQUEST,
  PRE_SUBMISSIONS_SUCCESS,
  PRE_SUBMISSIONS_FAIL,
  WITHDRAW_REQUEST,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
} from '../constants/formConstant';
const apiURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  withCredentials: false
});
let token = localStorage.getItem('token');
let tokenUser = localStorage.getItem('tokenUser');
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(tokenUser);
    if (tokenUser||token) {
      config.headers['token'] = `${token}`;
      config.headers['tokenUser'] = `${tokenUser}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchNorms = () => async (dispatch) => {
  try {
    dispatch({ type: NORM_REQUEST });
    const { data } = await axiosInstance.get('/api/v1/fetchnorms');
    dispatch({
      type: NORM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NORM_FAIL,
      payload: error.response.data.message
    });
  }
};

export const editNorms = (norms) => async (dispatch) => {
  try {
    dispatch({ type: NORM_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const { data } = await axiosInstance.put(`/api/v1/addnorms`, norms, {
      ...config
    });
    dispatch({
      type: NORM_EDIT_SUCCESS,
      payload: data.norms
    });
  } catch (error) {
    dispatch({
      type: NORM_EDIT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const formSubmission = (data) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSION_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let tokenUser = localStorage.getItem('tokenUser');
axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.post( '/api/v1/user/form', data, {
      ...config
    });

    dispatch({
      type: SUBMISSION_SUCCESS,
      payload: res
    });
  } catch (error) {
    dispatch({
      type: SUBMISSION_FAIL,
      payload: error.response.data.message
    });
  }
};

export const exportData = () => async (dispatch) => {
  try {
    dispatch({ type: FORM_DATA_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const { data } = await axiosInstance.get('/api/v1/admin/formdata');
    dispatch({
      type: FORM_DATA_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FORM_DATA_FAIL,
      payload: error.response.data.message
    });
  }
};

export const fetchQuarter = () => async (dispatch) => {
  try {
    dispatch({ type: QUARTER_REQUEST });
    const { data } = await axiosInstance.get('/api/v1/fetchquarterDetails');
    dispatch({
      type: QUARTER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: QUARTER_FAIL,
      payload: error.response.data.message
    });
  }
};

export const editQuarter = (quarter) => async (dispatch) => {
  try {
    dispatch({ type: QUARTER_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const { data } = await axiosInstance.put('/api/v1/addquarterDetails', quarter, {
      ...config
    });
    dispatch({
      type: QUARTER_EDIT_SUCCESS,
      payload: data.quaeterDetails
    });
  } catch (error) {
    dispatch({
      type: QUARTER_EDIT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const quarterFormSubmission = (data) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSION_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let tokenUser = localStorage.getItem('tokenUser');
axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.post('/api/v1/user/quarterform', data, {
      ...config
    });

    dispatch({
      type: SUBMISSION_SUCCESS,
      payload: res
    });
  } catch (error) {
    dispatch({
      type: SUBMISSION_FAIL,
      payload: error.response.data.message
    });
  }
};

export const preSubmission1= () => async (dispatch) => {
  try {
    dispatch({ type: PRE_SUBMISSIONS_REQUEST});
    let tokenUser = localStorage.getItem('tokenUser');
axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.get('/api/v1/user/presubmissionform1');
    dispatch({
      type: PRE_SUBMISSIONS_SUCCESS,
      payload: res
    });
  } catch (error) {
    dispatch({
      type:PRE_SUBMISSIONS_FAIL,
      payload: error.response.data.message
    });
  }
};
export const withdrawSubmission1= () => async (dispatch) => {
  try {
    dispatch({ type: WITHDRAW_REQUEST});
    let tokenUser = localStorage.getItem('tokenUser');
    axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.post('/api/v1/user/withdrawform1');
    dispatch({
      type: WITHDRAW_SUCCESS,
      payload: res
    });
    dispatch({
      type:PRE_SUBMISSIONS_FAIL,
      payload: null
    });
  } catch (error) {
    dispatch({
      type:WITHDRAW_FAIL,
      payload: error.response.data.message
    });
  }
};

export const withdrawSubmission2= () => async (dispatch) => {
  try {
    dispatch({ type: WITHDRAW_REQUEST});
    let tokenUser = localStorage.getItem('tokenUser');
    axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.post('/api/v1/user/withdrawform2');
    dispatch({
      type: WITHDRAW_SUCCESS,
      payload: res
    });
    dispatch({
      type:PRE_SUBMISSIONS_FAIL,
      payload: null
    });
  } catch (error) {
    dispatch({
      type:WITHDRAW_FAIL,
      payload: error.response.data.message
    });
  }
};

export const preSubmission2= () => async (dispatch) => {
  try {
    dispatch({ type: PRE_SUBMISSIONS_REQUEST});
    let tokenUser = localStorage.getItem('tokenUser');
axiosInstance.defaults.headers.common['tokenUser'] = `${tokenUser}`;
    const res = await axiosInstance.get('/api/v1/user/quartersubmission');
    dispatch({
      type: PRE_SUBMISSIONS_SUCCESS,
      payload: res
    });
  } catch (error) {
    dispatch({
      type:PRE_SUBMISSIONS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const exportQuarterData = () => async (dispatch) => {
  try {
    dispatch({ type: FORM_DATA_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const { data } = await axiosInstance.get('/api/v1/admin/quarterformdata');
    dispatch({
      type: FORM_DATA_SUCCESS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: FORM_DATA_FAIL,
      payload: error.response.data.message
    });
  }
};

export const modifyTime = (time) => async (dispatch) => {
  try {
    dispatch({ type: TIME_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const data = await axiosInstance.put('/api/v1/form/modifytime', time, {
      ...config
    });
    dispatch({
      type: TIME_EDIT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TIME_EDIT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const modifyTime2 = (time) => async (dispatch) => {
  try {
    dispatch({ type: TIME_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const data = await axiosInstance.put('/api/v1/form/modifytime2', time, {
      ...config
    });
    dispatch({
      type: TIME_EDIT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TIME_EDIT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const count1 = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNT_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const data = await axiosInstance.get('/api/v1/admin/submissioncount');
 //.   console.log(JSON.stringify(data));

    dispatch({
      type: GET_COUNT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_COUNT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const count2 = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNT_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    
    const data = await axiosInstance.get('/api/v1/admin/quartersubmissioncount');
    dispatch({
      type: GET_COUNT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_COUNT_FAIL,
      payload: error.response.data.message
    });
  }
};

export const deleteAll1 = (password,keyword='',currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS1_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    await axiosInstance.post('/api/v1/admin/deleteall1',{password} ,{
      ...config
    });
    let link =  `/api/v1/admin/form1submissions?keyword=${keyword}&page=${currentPage}`;
  
    const data = await axiosInstance.get(link);
    dispatch({
      type: SUBMISSIONS1_SUCCESS,
      payload: data
    });
    
   
  } catch (error) {
    dispatch({
      type: SUBMISSIONS1_FAIL,
      payload: error.response.data.message
    });
  }
};
export const deleteAll2 = (password,keyword='',currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS2_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    
    await axiosInstance.post('/api/v1/admin/deleteall2',{password} ,{
      ...config
    });
    let link =  `/api/v1/admin/form2submissions?keyword=${keyword}&page=${currentPage}`;
  
    const data = await axiosInstance.get(link);
   
    dispatch({
      type: SUBMISSIONS2_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SUBMISSIONS2_FAIL,
      payload: error.response.data.message
    });
  }
};
export const form1submissions = (keyword='',currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS1_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    
    let link =  `/api/v1/admin/form1submissions?keyword=${keyword}&page=${currentPage}`;
  
    const data = await axiosInstance.get(link);
   
    dispatch({
      type: SUBMISSIONS1_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SUBMISSIONS1_FAIL,
      payload: error.response.data.message
    });
  }
};

export const form2submissions = (keyword='',currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS2_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    
    let link =  `/api/v1/admin/form2submissions?keyword=${keyword}&page=${currentPage}`;
  
    const data = await axiosInstance.get( link);
   // console.log(data);
    dispatch({
      type: SUBMISSIONS2_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SUBMISSIONS2_FAIL,
      payload: error.response.data.message
    });
  }
};
export const deleteInform1= (_id) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS1_REQUEST });
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = await axiosInstance.post( '/api/v1/admin/deleteIn1', {_id:_id},{
      ...config
    });
   
    dispatch({
      type: SUBMISSIONS1_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SUBMISSIONS1_FAIL,
      payload: error.response.data.message
    });
  }
};

export const deleteInform2= (_id) => async (dispatch) => {
  try {
    dispatch({ type: SUBMISSIONS2_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let token= localStorage.getItem('token');
    axiosInstance.defaults.headers.common['token'] = `${token}`;
    const data = await axiosInstance.post('/api/v1/admin/deleteIn2', {_id:_id},{
      ...config
    });
   
    dispatch({
      type: SUBMISSIONS2_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SUBMISSIONS2_FAIL,
      payload: error.response.data.message
    });
  }
};
