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
    CLEAR_ERRORS,
    SUBMISSIONS1_REQUEST,
    SUBMISSIONS1_SUCCESS,
    SUBMISSIONS1_FAIL,
    SUBMISSIONS2_FAIL,
    SUBMISSIONS2_SUCCESS,
    SUBMISSIONS2_REQUEST
} from '../constants/formConstant';

export const normFetch = (state ={formDetails:{}},action)=>{
    switch(action.type){
        case NORM_REQUEST:
            return{
                loading:true,
            }
        case NORM_SUCCESS:
            return {
                ...state,
                loading:false,
                norms: action.payload.norms,
                sTime:action.payload.startTime,
                eTime:action.payload.endTime   
            }
       
        case NORM_FAIL:
                return{
                    loading:false,
                    norms: null,
                    error: action.payload
                }
         default:
            return state;
    }

}
export const dateAndTime = (state ={formDetails:{}},action)=>{
    switch(action.type){
        case TIME_EDIT_REQUEST:
            return{
                loading:true,
            }
        case TIME_EDIT_SUCCESS:
            return {
                ...state,
                loading:false,
                time: action.payload   
            }
       
        case TIME_EDIT_FAIL:
                return{
                    loading:false,
                    time: null,
                    error: action.payload
                }
         default:
            return state;
    }
}
export const normEdit = (state ={formDetails:{}},action)=>{
    switch(action.type){
        case NORM_EDIT_REQUEST:
            return{
                loading:true,
            }
        case NORM_EDIT_SUCCESS:
            return {
                ...state,
                loading:false,
                norms: action.payload   
            }
       
        case NORM_EDIT_FAIL:
                return{
                    loading:false,
                    norms: null,
                    error: action.payload
                }
         default:
            return state;
    }

}

export const formSubmission = (state ={res:{}},action)=>{
    switch(action.type){
        case SUBMISSION_REQUEST:
            return{
                loading:true,
            }
        case  SUBMISSION_SUCCESS:
            return {
                ...state,
                loading:false,
                data: action.payload   
            }
       
        case  SUBMISSION_FAIL:
                return{
                    loading:false,
                    data: null,
                    error: "You can fill form only once! Please contact your administrator!"
                }
        case CLEAR_ERRORS: 
          return{
                    loading:false,
                    data: null,
                    error:null
          }
         default:
            return state;
    }

}

export const getFormData = (state ={formData:{}},action)=>{
    switch(action.type){
        case FORM_DATA_REQUEST:
            return{
                loading:true,
            }
        case  FORM_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                data: action.payload   
            }
       
        case  FORM_DATA_FAIL:
                return{
                    loading:false,
                    data: null,
                    error: action.payload
                }
         default:
            return state;
    }

}

export const quarterFetch = (state ={quarterDetails:{}},action)=>{
    switch(action.type){
        case QUARTER_REQUEST:
            return{
                loading:true,
            }
        case QUARTER_SUCCESS:
            return {
                ...state,
                loading:false,
                choices: action.payload.quarters,
                sTime:action.payload.startTime,
                eTime:action.payload.endTime   
            }
       
        case QUARTER_FAIL:
                return{
                    loading:false,
                    choices: null,
                    error: action.payload
                }
         default:
            return state;
    }

}

export const quarterEdit = (state ={quarterDetails:{}},action)=>{
    switch(action.type){
        case QUARTER_EDIT_REQUEST:
            return{
                loading:true,
            }
        case QUARTER_EDIT_SUCCESS:
            return {
                ...state,
                loading:false,
                norms: action.payload   
            }
       
        case QUARTER_EDIT_FAIL:
                return{
                    loading:false,
                    norms: null,
                    error: action.payload
                }
         default:
            return state;
    }

}


export const countData = (state ={count:{}},action)=>{
    switch(action.type){
        case GET_COUNT_REQUEST:
            return{
                loading:true,
            }
        case GET_COUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                count: action.payload.data.count  
            }
       
        case GET_COUNT_FAIL:
                return{
                    loading:false,
                    error: action.payload
                }
         default:
            return state;
    }

}

export const formSubmissions = (state ={},action)=>{
    switch(action.type){
        case SUBMISSIONS1_REQUEST:
        case SUBMISSIONS2_REQUEST:
            return{
                loading:true,
            }
        case SUBMISSIONS1_SUCCESS:
        case SUBMISSIONS2_SUCCESS: 
            return {
                ...state,
                loading:false,
                count: action.payload.data.count,
                submissions:action.payload.data.submissions,
                resPerPage: action.payload.data.resPerPage
            }
       
        case SUBMISSIONS1_FAIL:
        case SUBMISSIONS2_FAIL:
                return{
                    loading:false,
                    error: action.payload
                }
         default:
            return state;
    }

}

