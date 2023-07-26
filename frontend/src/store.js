import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {adminReducer, authReducer, notificationFetch} from './Reducers/adminReducers';
import { userAuth, userOtpSent } from './Reducers/userReducer';
import { normFetch,  getFormData, quarterFetch,dateAndTime, countData, formSubmission} from './Reducers/formReducer';


const reducer = combineReducers({
  auth: authReducer,
  admin:adminReducer,
  otp: userOtpSent,
  userAuth: userAuth,
  form: normFetch,
  res: getFormData,
  quarter:quarterFetch,
  Notifications: notificationFetch,
  dateAndTime:dateAndTime,
  countData:countData,
  formSubmission: formSubmission
})

let initialState = {
 
}
const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;