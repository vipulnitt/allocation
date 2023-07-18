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

export const fetchNorms = () => async (dispatch) => {
  try {
    dispatch({ type: NORM_REQUEST });
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/fetchnorms', {
      withCredentials: true // Include cookies in the request
    });
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
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/addnorms`, norms, {
      withCredentials: true, // Include cookies in the request
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
    const { res } = await axios.post(process.env.REACT_APP_API_URL + '/api/v1/user/form', data, {
      withCredentials: true, // Include cookies in the request
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
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/admin/formdata', {
      withCredentials: true // Include cookies in the request
    });
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
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/fetchquarterDetails', {
      withCredentials: true // Include cookies in the request
    });
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
    const { data } = await axios.put(process.env.REACT_APP_API_URL + '/api/v1/addquarterDetails', quarter, {
      withCredentials: true, // Include cookies in the request
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
    const { res } = await axios.post(process.env.REACT_APP_API_URL + '/api/v1/user/quarterform', data, {
      withCredentials: true, // Include cookies in the request
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

export const exportQuarterData = () => async (dispatch) => {
  try {
    dispatch({ type: FORM_DATA_REQUEST });
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/admin/quarterformdata', {
      withCredentials: true // Include cookies in the request
    });
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

export const modifyTime = (time) => async (dispatch) => {
  try {
    dispatch({ type: TIME_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = await axios.put(process.env.REACT_APP_API_URL + '/api/v1/form/modifytime', time, {
      withCredentials: true, // Include cookies in the request
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
    const data = await axios.put(process.env.REACT_APP_API_URL + '/api/v1/form/modifytime2', time, {
      withCredentials: true, // Include cookies in the request
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

