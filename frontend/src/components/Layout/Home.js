import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/adminAction";
import NoticeBoard from "./NoticeBoard";
import SliderComponent from "./SliderComponent";
import { fetchNorms, fetchQuarter } from "../../actions/formAction";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error]);

  useEffect(() => {
    dispatch(fetchQuarter());
  }, [dispatch]);
  const { choices,sTime,eTime} = useSelector((state) => state.quarter);


  const pictureSources = [
    "https://www.nitt.edu/home/about/Admin-Block-1.JPG",
    "https://www.nitt.edu/home/Octagon.jpg",
    'https://www.nitt.edu/home/NITT-Main-Gate.JPG',
  ];

  return (
    <Fragment>
    
      <MetaData title={"National Institute of Technology, Trichy"} />
     <div className="">
     <div className="moving-component text-danger font-weight-bold">
     {sTime?(<>APPLICATION FOR RESIDENTIAL QUARTERS will start at {new Date(sTime).toLocaleString()} and close at {new Date(eTime).toLocaleString()}</>):(<></>)}
  </div>
     </div>
      <div className="d-flex mt-3">
        <div>
          <div className="ml-4" style={{ flex: 1 }}>
        
            <div>
              <h2>Forms</h2>
              <ul>
                <li>
                  <Link to="/student">
                    APPLICATION FOR ALLOTMENT OF PG / QIP/ RSB QUARTERS
                  </Link>
                </li>

                <li>
                  <Link to="/staff">
                    APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL
                    QUARTERS
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="d-flex mt-2"
              style={{
                flex: 2,
                marginTop: "2%",
                marginLeft: "1%",
                marginRight: "4%",
              }}
            >
              <NoticeBoard />
            </div>
          </div>
        </div>
        <div className="container col-md-5  ">
      <h3 className="text-center">Glimpses</h3>
      <SliderComponent pictureSources={pictureSources} />
    </div>
      </div>

      <br />

     
    </Fragment>
  );
};

export default Home;
