import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';


const Adminprofile = () => {
  const { loading, admin } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const handleOnchangePassword = () => {
     navigate('/admin/updatepassword')
    };
   
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card mt-5">
                <div className="card-body text-center">
                  <img
                    src="/images/avatar.png" // Replace with the actual path to the admin logo image
                    alt="Admin Logo"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h3 className="mt-3">{admin.name}</h3>
                  <p>Email: {admin.email}</p>

                  <p>Created At: {new Date(""+admin.createAt).toLocaleString()}</p>
                  <div className="mt-4">
                    <button className="btn btn-primary"  style={{backgroundColor:'#041570'}} onClick={handleOnchangePassword}>Update Password</button>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Adminprofile;
