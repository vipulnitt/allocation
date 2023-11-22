import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser } from "../../actions/adminAction";
import NoticeBoard from "./NoticeBoard";
import SliderComponent from "./SliderComponent";
import { fetchNorms, fetchQuarter } from "../../actions/formAction";
import '../Layout/home.css'
import { logoutUser } from "../../actions/userAction";


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
  const { choices, sTime, eTime } = useSelector((state) => state.quarter);
  
  const pictureSources = [
    "/images/img8.JPG",
    "/images/img1.jpg",
    "/images/img2.JPG",
    "/images/img3.JPG",
    "/images/img4.jpg",
    "/images/img5.JPG",
    "/images/img6.JPG"
  ];
  const [isVisible, setIsVisible] = useState(true);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(logoutUser());
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isAndroidPhone = screenWidth <= 480; // 480px is a common width for Android phones
  const isLessThan10Inch = screenWidth <= 1000; // Assuming 1280px as the width of a 10-inch diagonal

  return (
    <Fragment>
      <MetaData title={"National Institute of Technology, Trichy"} />
 
<div className="ml-2">
      
      <div className={isVisible ? 'fadeIn' : 'fadeOut'}>
      {sTime ? (
      <>
      <div className="font-weight-bold text-danger">
        APPLICATION FOR RESIDENTIAL QUARTERS will start at{" "}
        {new Date(sTime).toLocaleString()} and close at{" "}
        {new Date(eTime).toLocaleString()}
        </div>
      </>
    ) : (
      <></>
    )}
      </div>
    </div>

    <div className={isLessThan10Inch ? '' : 'd-flex mt-3'}>
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
