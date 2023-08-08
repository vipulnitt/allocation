import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { clearErrors, updatePassword } from '../actions/adminAction';

const UpdatePassword = () => {
    const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {loading,error,isUpdated} = useSelector(state=>state.admin);

  useEffect(()=>{
     if(error)
     {
        Swal.fire({
            icon: 'error',
            title: 'Warning',
            text: error,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(clearErrors());
     }
     if(isUpdated)
     {
        Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(clearErrors());
     }
  },[error,isUpdated])

  const handleSubmit = e => {
    e.preventDefault();
    
    if(newPassword!==confirmPassword)
    {
        
        Swal.fire({
            icon: 'error',
            title: 'Confirm Password did not match!',
            text: `Renter your password`,
            showConfirmButton: false,
            timer: 1500,
          });
    }else
    {
        dispatch(updatePassword({"oldPassword":currentPassword,"newPassword":newPassword}));
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Update Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary"  style={{backgroundColor:'#041570'}} >Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
