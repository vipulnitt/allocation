import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { editQuarter, exportQuarterData, fetchQuarter } from '../actions/formAction';

const QuarterAllocation = () => {
    const [choiceArray, setChoice] = useState([]);
 
  const [streetNumber, setStreetNumber] = useState('');
  const [quarterNumber, setQuarterNumber] = useState('');
  const dispatch = useDispatch();
  const {choices,loading} = useSelector(state=>state.quarter);
  useEffect(()=>{
   dispatch(fetchQuarter());  
},[dispatch]);
useEffect(()=>{
  if(choices)
  {
    choiceArray.splice(0,choiceArray.length);
    choices&&choices.map((choice,index)=>{
      const updatedChoice =choiceArray;
      updatedChoice.push(choice.choice);
      setChoice(updatedChoice);
     
  });
  }
  
},[choices]);

  const addQuarter = () => {
    if (streetNumber.trim() !== ''&&quarterNumber.trim()!=='') {
      const updatedNorms = [...choiceArray, {"streetNumber":streetNumber,"quarterNumber":quarterNumber}];
      setChoice(updatedNorms);
      setStreetNumber('');
      setQuarterNumber('');
    }
  };

  const deleteNorm = index => {
    const updatedNorms = choiceArray.filter((_, i) => i !== index);
    setChoice(updatedNorms);
  };
  const handleSave = () => {
    const data=[];
    
    choiceArray.map((choice, index) => {
       data.push({"choice":choice});
    });
    const convertedData = {
      quarters: data
    };
    console.log(JSON.stringify(convertedData));
    dispatch(editQuarter(convertedData));
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `Quarter List has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  
   
  }
  const {data} = useSelector(state=>state.res);
  const handleExport = () => {
    dispatch(exportQuarterData());

   
    };
    useEffect(() => {
      if (data) {
       
        customFunction(data.formData);
      }
    }, [data]);
  
    const customFunction = (data) => {
      console.log(JSON.stringify(data));
      const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(fileData, 'exported_data.xlsx');
    };
  return (
    <Fragment>
      <div>
        <br/>
        <button id="ExportData"   className='ml-2'  onClick={handleExport}>Export Data</button>
      </div>
    <h2>Quarter</h2>
    <ul>
      {choiceArray.map((c, index) => (
        <li key={index}>
        <b>  Street Number : </b>{c.streetNumber}  <b>Quarter Number : </b>{c.quarterNumber}  &nbsp; 
          <i className="fa fa-trash btn btn-danger delete_norm" onClick={() => deleteNorm(index)}></i>
          
        </li>
      ))}
    </ul>
    <div>
      
    <div className="small-container">
    <label htmlFor="streetInput">Street Number:</label>
    <input
        id="streetInput"
        type="text"
        value={streetNumber}
        onChange={e => setStreetNumber(e.target.value)}
      />
      <label htmlFor="QuarterInput">Quarter Number</label>
       <input
        id="QuarterInput"
        type="text"
        value={quarterNumber}
        onChange={e => setQuarterNumber(e.target.value)}
      />
        <br/>
        <div className="text-center">
      <button className='ml-2'  onClick={addQuarter}>Add Quarter</button>
      <br/>  <br/>
      <button   className='ml-2' onClick={()=>handleSave()}>Save</button>
      </div>
      </div>
     
    </div>

  </Fragment>
  )
}

export default QuarterAllocation