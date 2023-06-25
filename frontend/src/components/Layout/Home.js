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

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <LoginCorner style={{ height: '100%' }}/>
        </div>
        <div style={{ flex: 2, marginLeft: '10px', marginRight: '10px' }}>
          <NoticeBoard />
        </div>
      </div>


      <br />
      <div>
        <Link to="/student">APPLICATION FOR ALLOTMENT OF PG / QIP/ RSB QUARTERS</Link>
        <br />
        <Link to="/staff">APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL QUARTERS</Link>
      </div>
      <hr />
    </Fragment>
  );
};

export default Home;
