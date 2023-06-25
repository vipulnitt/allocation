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
    QUARTER_FAIL
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
                norms: action.payload   
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
                    error: action.payload
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
                choices: action.payload   
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
