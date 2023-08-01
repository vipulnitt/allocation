import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { count1, editNorms, fetchNorms,modifyTime  } from "../actions/formAction";
import Swal from "sweetalert2";
import moment from 'moment-timezone';

import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const EditNorms = () => {
  const [normsArray, setNorms] = useState([]);
  const [newNorm, setNewNorm] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const { norms, loading,sTime,eTime } = useSelector((state) => state.form);
  const { data } = useSelector((state) => state.res);
  const {count} = useSelector(state=>state.countData);
  const navigate =useNavigate();
  const convertToTrichyTime = (utcTime) => {
    return moment.utc(utcTime).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
  };

  useEffect(() => {
    dispatch(fetchNorms());
    dispatch(count1());
  }, [dispatch]);

  useEffect(() => {
    if(eTime)
    {
      const date = sTime;
      const edate = eTime;
      setStartTime(date);
      setEndTime(edate);
     
    }
    if (norms) {
      setNorms(norms.map((norm) => norm.statement));
    }
  }, [norms,eTime,sTime]);


  const handleSaveTime = () => {
    console.log(startTime);
    const jsonData = {
      startTime: startTime,
      endTime: endTime,
    };

   
    dispatch(modifyTime(jsonData));
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Time have been updated.",
      showConfirmButton: false,
      timer: 1500,
    });
    // Use the jsonData object as needed (e.g., send it to an API, log it, etc.)
  
  };


  const addNorm = () => {
    if (newNorm.trim() !== "") {
      setNorms((prevNorms) => [...prevNorms, newNorm]);
      setNewNorm("");
    }
  };

  const deleteNorm = (index) => {
    const updatedNorms = normsArray.filter((_, i) => i !== index);
    setNorms(updatedNorms);
  };

  const handleSave = () => {
    const data = normsArray.map((norm) => ({ statement: norm }));
    const convertedData = {
      norms: data,
    };
    dispatch(editNorms(convertedData));
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Norms have been updated.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleExport = () => {
   // dispatch(exportData());
     navigate('/admin/form1submissions');
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isAndroidPhone = screenWidth <= 480; // 480px is a common width for Android phones
  const isLessThan10Inch = screenWidth <= 1280; // Assuming 1280px as the width of a 10-inch diagonal



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-5 ml-3" >
        <div  style={{ display: 'flex', marginTop: "1%" }} >
          <br />
          <div className="mt-2">
            <b>Number of Submissions: {count&count}</b>
          </div>
       
          <button id="ExportData" className="ml-5 btn btn-success"  onClick={handleExport}>
            View Submissions
          </button>
         
        
         
        </div>
          <div style={{ display: isLessThan10Inch ? '' : 'flex', marginTop: "1%",marginRight: "5%" }}>
            Start at:
            <input
              style={{ flex: 2, marginLeft: "2%", marginRight: "2%" }}
              type="datetime-local"
              value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
            />
            Close at:
            <input
              style={{ flex: 2, marginLeft: "2%", marginRight: "3%" }}
              type="datetime-local"
              value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
            />
            <button className="ml-1 mr-3"  onClick={handleSaveTime}>
              Save
            </button>
          </div>
          <h2>Norms</h2>
          <div className="norms-container">
            
            <div className="norms-list">
              <ul>
                {normsArray.map((norm, index) => (
                  <li key={index}>
                    {norm}
                    <i
                      className="fa fa-trash btn btn-danger delete_norm"
                      onClick={() => deleteNorm(index)}
                    ></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="norm mt-3">
            <input
              id="normInput"
              type="text"
              value={newNorm}
              onChange={(e) => setNewNorm(e.target.value)}
            />
            </div>
           <div className="text-center" >
            <button  className="mt-3" onClick={addNorm}>
              Add Norm
            </button>
           
            <button  className="ml-3 mt-3" onClick={handleSave}>
              Save
            </button>
          
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditNorms;
