import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  count2,
  editQuarter,
  fetchQuarter,
  modifyTime2,
} from "../actions/formAction";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const QuarterAllocation = () => {
  const [choiceArray, setChoice] = useState([]);
  const [streetNumber, setStreetNumber] = useState("");
  const [quarterNumber, setQuarterNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { choices, loading,sTime,eTime  } = useSelector((state) => state.quarter);
  const {count} = useSelector(state=>state.countData);
  

  useEffect(() => {
    dispatch(fetchQuarter());
    dispatch(count2());
  }, [dispatch]);
  const { data } = useSelector((state) => state.res);

  useEffect(() => {
    if(eTime)
    {
      const date = sTime;
      const edate = eTime;
      setStartTime(date);
      setEndTime(edate);
    }
    if (choices) {
      setChoice(choices.map((choice) => choice.choice));
    }
  }, [choices,eTime,sTime]);

  const handleSaveTime = () => {
    const jsonData = {
      startTime: startTime,
      endTime: endTime
    };
  
    dispatch(modifyTime2(jsonData));
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Time have been updated.",
      showConfirmButton: false,
      timer: 1500,
    });
    // Use the jsonData object as needed (e.g., send it to an API, log it, etc.)
   
  };

  const addQuarter = () => {
    if (streetNumber.trim() !== "" && quarterNumber.trim() !== "") {
      setChoice((prevChoices) => [
        ...prevChoices,
        { streetNumber: streetNumber, quarterNumber: quarterNumber },
      ]);
      setStreetNumber("");
      setQuarterNumber("");
    }
  };

  const deleteNorm = (index) => {
    const updatedNorms = choiceArray.filter((_, i) => i !== index);
    setChoice(updatedNorms);
  };

  const handleSave = () => {
    const data = choiceArray.map((choice) => ({ choice }));
    const convertedData = {
      quarters: data,
    };
    dispatch(editQuarter(convertedData));
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Quarter List has been updated.",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleExport = () => {
     navigate('/admin/form2submissions');
   // dispatch(exportQuarterData());
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
          <div  style={{ display: "flex", marginTop: "1%" }} >
            <br />
            <div className="mt-3">
              <b>Number of Submissions: {count&count}</b>
            </div>
         
            <button id="ExportData"  className="ml-5 btn btn-success"  onClick={handleExport}>
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
          <h2>Quarter</h2>
          <div className="choice-container">
            <ul className="choice-list">
              {choiceArray.map((c, index) => (
                <li key={index}>
                  <b>Street Number: </b>
                  {c.streetNumber} <b>Quarter Number: </b>
                  {c.quarterNumber}&nbsp;
                  <i
                    className="fa fa-trash btn btn-danger delete_norm"
                    onClick={() => deleteNorm(index)}
                  ></i>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", marginTop: "1%" ,marginLeft:"1%",marginRight:"1%" }}>
          Street Number:
          <input
            id="streetInput"
            type="text"
            className="ml-2"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
          />
          Quarter Number:
          <input
            id="QuarterInput"
            type="text"
            className="ml-2"
            value={quarterNumber}
            onChange={(e) => setQuarterNumber(e.target.value)}
          />
          </div>
          
          <br />
          <div className="d-flex justify-content-center" >
            <button className="ml-2" onClick={addQuarter}>
              Add Quarter
            </button>
            <br /> <br />
            <button className="ml-2" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default QuarterAllocation;
