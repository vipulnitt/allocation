import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../../actions/adminAction';
import Swal from 'sweetalert2';
const Header = () => {
  const {admin,loading} =  useSelector(state=>state.auth);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    dispatch(logout());
    Swal.fire({
      icon: 'success',
      title: 'Admin',
      text: `Logout Successfully.`,
      showConfirmButton: false,
      timer: 1500,
    });
  
  }
  return (
    <Fragment>
        
        <nav className="navbar row navbar-expand-lg h-auto " style={{
    backgroundColor: 'blue'}}>
  
        <div
  className="container-fluid p-0"
  style={{
    backgroundImage: `url(/images/nitt.png)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
    backgroundColor: 'blue',
    minHeight: '100px', // Set a minimum height for the header
    height: 'auto', // Adjust the height value as per your requirement
  }}
/>


    
<div className="ml-auto mr-4 mt-4 mt-md-0 text-center">
      {admin? (
                      <div className="dropdown">
                        <Link to="/admin" className='dropbtn' 
                        type="button" id = "dropDownMenuButton" data-toggle="dropdown" 
                        aria-haspopup="true"  aria-expanded="false">
                          <figure className='avatar avatar-nav'>
                            <img src ="/images/avatar.png"
                            alt={admin&admin.name}
                            className='rounded-circle'/>
                          </figure>
                          <span>{admin?admin.name:''}</span>
                          </Link>
                      
                          <div className="dropdown-content" aria-labelledby="dropDownMenuButton">
                          <Link  to='/profile'>Profile</Link>
                            {<Link to='/admin/notification'>Notification</Link>}
                            <Link  to='/' onClick={logoutHandler}>Logout</Link>
                            </div>

                      </div>
        ):(<></>)}
      
        
      </div>
    </nav>
   </Fragment>
  )
}

export default Header