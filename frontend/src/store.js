import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer, notificationFetch} from './Reducers/adminReducers';
import { userAuth, userOtpSent } from './Reducers/userReducer';
import { normFetch,  getFormData, quarterFetch} from './Reducers/formReducer';

const reducer = combineReducers({
  auth: authReducer,
  otp: userOtpSent,
  userAuth: userAuth,
  form: normFetch,
  res: getFormData,
  quarter:quarterFetch,
  Notifications: notificationFetch
})

let initialState = {
 
}
const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;