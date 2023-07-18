import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  editQuarter,
  exportQuarterData,
  fetchQuarter,
  modifyTime2,
} from "../actions/formAction";
import Loader from "../Loader";

const QuarterAllocation = () => {
  const [choiceArray, setChoice] = useState([]);
  const [streetNumber, setStreetNumber] = useState("");
  const [quarterNumber, setQuarterNumber] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const dispatch = useDispatch();
  const { choices, loading,sTime,eTime  } = useSelector((state) => state.quarter);
  const { data } = useSelector((state) => state.res);

  useEffect(() => {
    dispatch(fetchQuarter());
  }, [dispatch]);

  useEffect(() => {
    if(eTime)
    {
      const date = new Date(sTime);
      const edate = new Date(eTime);
      setStartTime(date.toISOString().replace(/T|\.\d{3}Z/g, ' ').trim());
      setEndTime(edate.toISOString().replace(/T|\.\d{3}Z/g, ' ').trim());
    }
    if (choices) {
      setChoice(choices.map((choice) => choice.choice));
    }
  }, [choices,eTime,sTime]);

  const handleSaveTime = () => {
    const jsonData = {
      startTime: startTime,
      endTime: endTime,
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
    console.log(jsonData);
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
    dispatch(exportQuarterData());
  };

  useEffect(() => {
    if (data) {
      customFunction(data.formData);
    }
  }, [data]);

  const customFunction = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(fileData, "exported_data.xlsx");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <br />
            <button id="ExportData" className="ml-2" onClick={handleExport}>
              Export Data
            </button>
          </div>

          <div style={{ display: "flex", marginTop: "1%" }}>
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
        </>
      )}
    </Fragment>
  );
};

export default QuarterAllocation;
