import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { count1, deleteAll1, editNorms, exportData, fetchNorms,modifyTime  } from "../actions/formAction";
import Swal from "sweetalert2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Loader from "../Loader";

const EditNorms = () => {
  const [normsArray, setNorms] = useState([]);
  const [newNorm, setNewNorm] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const { norms, loading,sTime,eTime } = useSelector((state) => state.form);
  const { data } = useSelector((state) => state.res);
  const {count} = useSelector(state=>state.countData);

  useEffect(() => {
    dispatch(fetchNorms());
    dispatch(count1());
  }, [dispatch]);

  useEffect(() => {
    if(eTime)
    {
      const date = new Date(sTime);
      const edate = new Date(eTime);
      setStartTime(date.toISOString().replace(/T|\.\d{3}Z/g, ' ').trim());
      setEndTime(edate.toISOString().replace(/T|\.\d{3}Z/g, ' ').trim());
     
    }
    if (norms) {
      setNorms(norms.map((norm) => norm.statement));
    }
  }, [norms,eTime,sTime]);


  const handleSaveTime = () => {
    const jsonData = {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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
    console.log(jsonData);
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
    dispatch(exportData());
  };

  useEffect(() => {
    if (data) {
      customFunction(data.form);
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

  const handleDeleteAll=()=>{
    Swal.fire({
      title: 'Are you sure to delete all submissions?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2 mr-4',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAll1());
        Swal.fire('deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('not deleted', '', 'info')
      }
    })
  }

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
       
          <button id="ExportData" className="ml-5"  onClick={handleExport}>
            Export Data
          </button>
          <button id="DeleteData" className="ml-5 btn btn-danger "  onClick={handleDeleteAll}>
           Delete All Submissions
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
