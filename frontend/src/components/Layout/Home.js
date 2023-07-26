import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/adminAction';
import NoticeBoard from './NoticeBoard';
import LoginCorner from './LoginCorner';

const Home = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate('/admin/login');
  };
  
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <Fragment>
      <br />
      
      <MetaData title={'NITT Website'} />
      <div>
      <div className="ml-4"style={{ flex: 1 }}>
        <div >
          <h2>Forms</h2>
          <ul>
         <li><Link to="/student">APPLICATION FOR ALLOTMENT OF PG / QIP/ RSB QUARTERS</Link></li> 
      
        <li><Link to="/staff">APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL QUARTERS</Link></li>
          </ul>
       
      </div>
        </div>
        <div style={{ flex: 2,marginTop:"2%", marginLeft: '1%', marginRight: '4%' }}>
          <NoticeBoard />
        </div>
       
      </div>
    

      <br />
     
      <hr />
    </Fragment>
  );
};

export default Home;
