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
       <div className="small-container mt-4">
        <form onSubmit={handleClick}>
        <label htmlFor="Otp">Enter OTP</label>
        <input
          id="otp"
          type="text"
          name="OTP"
          placeholder=""
          value={otp}
          onChange={(e)=>{setOtp(e.target.value)}}
        />
        <input style={{ marginTop: '12px',backgroundColor:'#041570' }} type="submit" value="Submit"  />
        </form>
       
    </div>
       </> );
    }
 return (
    
 <>
<div className="small-container mt-4">
        <h3>Enter your Webmail Id</h3>
        <form onSubmit={handleOtpClick}>
        <input
          id="webmail"
          type="text"
          name="webmail"
          placeholder="RollNumber@nitt.edu"
          value={emailToSend}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
         
         <input style={{ marginTop: '12px', backgroundColor:'#041570' }} type="submit" value="Send OTP" />
        </form>
       
      
    </div>
 </>
 );
};
export default Student;
