import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import { otpRequest, otpVerify } from '../../actions/userAction';
import { clearErrors } from '../../actions/adminAction';
import Swal from 'sweetalert2';

const Student = (formType) => {
    const navigate = useNavigate();
    const [otp,setOtp]= useState('');
    const [emailToSend,setEmail] = useState('');
    const dispatch = useDispatch();
    function handleOtpClick(e)
    {
      e.preventDefault();
      if(emailToSend)
      {
  
        const emailPattern = /@nitt\.edu$/;
        if(emailPattern.test(emailToSend))
        {
          dispatch(otpRequest(emailToSend));
          Swal.fire({
            icon: 'success',
            title: 'OTP Sent Successfully',
            text: "",
            showConfirmButton: false,
            timer: 1500,
          });
        }else
        {
          Swal.fire({
            icon: 'error',
            title: 'OOPS!',
            text: "Invalid Email!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }else
      {
        Swal.fire({
          icon: 'error',
          title: 'Please Enter webmail id',
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
      }
     
    }
    const {otpSent,email} = useSelector(state=>state.otp);
    function handleClick(e) {
        e.preventDefault();
        dispatch(otpVerify(otp,email));
      }
      const {isUserAuthenticated,error} = useSelector(state=>state.userAuth);
      useEffect(()=>{
        if(isUserAuthenticated) {
          
          navigate('/student/form');
         
        }
        if(error){
          
          Swal.fire({
            icon: 'error',
            title: 'OOPS!',
            text: error,
            showConfirmButton: false,
            timer: 1500,
          });
            dispatch(clearErrors());
        }
    },[dispatch,isUserAuthenticated,error]);
      /**/
    if(otpSent)
    {  
      
      
       return (<>
       <div className="small-container">
        <form onSubmit={handleClick}>
        <label htmlFor="Otp">Enter Otp</label>
        <input
          id="otp"
          type="text"
          name="otp"
          placeholder=""
          value={otp}
          onChange={(e)=>{setOtp(e.target.value)}}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Submit"  />
        </form>
       
    </div>
       </> );
    }
 return (
    
 <>
<div className="small-container">
        <h1>Enter your Webmail Id</h1>
        <form onSubmit={handleOtpClick}>
        <label htmlFor="webmail">Webmail Id</label>
        <input
          id="webmail"
          type="text"
          name="webmail"
          placeholder="106120142@nitt.edu"
          value={emailToSend}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
         
         <input style={{ marginTop: '12px' }} type="submit" value="SendOtp" />
        </form>
       
      
    </div>
 </>
 );
};
export default Student;
