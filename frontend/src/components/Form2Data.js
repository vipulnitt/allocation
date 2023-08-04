import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAll2, deleteInform2, exportQuarterData, form2submissions } from '../actions/formAction';
import Swal from "sweetalert2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Pagination from 'react-js-pagination';
import Loader from '../Loader';
import MetaData from './Layout/MetaData';

const Form2Data = () => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
 
  
    const [keyword,setKeyword] = useState('');
    const { data } = useSelector(state => state.res);
    const [flag, setFlag] = useState(false);
    
    const { submissions,error, count, resPerPage ,loading} = useSelector(state=> state.allSubmissions)
    useEffect(()=>{
        
          dispatch(form2submissions(keyword,currentPage));
          
      },[dispatch,error,currentPage]);

      function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
      }
      const onSearchHandle =(e)=>{
        e.preventDefault();
        dispatch(form2submissions(keyword,1));
       }

      const handleExport = (e) => {
        e.preventDefault();
       setFlag(true);
      dispatch(exportQuarterData());
    };
  
    useEffect(() => {
      if (data&&flag) {
        customFunction(data);
      }
    }, [data]);
  
    const customFunction = (data) => {
      const formattedData = data.map((item) => {
        const rowData = {
          Email: item.Email,
          Name: item.Name,
          StaffNumber: item.StaffNumber,
          Designation: item.Designation,
          Department: item.Department,
          ScalePay: item.ScalePay,
          GradePay: item.GradePay,
          BasicPay: item.BasicPay,
          JoiningInstitute: item.JoiningInstitute,
          JoiningCadre: item.JoiningCadre,
          PresentResidentialAddress: item.PresentResidentialAddress,
          MaritalStatus: item.MaritalStatus,
          ApplicationType: item.ApplicationType,
          ScOrST: item.ScOrST,
          OccupationDate: item.OccupationDate,
          SubmissionTime: item.SubmissionTime,
        };
    
        let index = 1;
        while (item[`p${index}`]) {
          rowData[`P${index}_StreetNumber`] = item[`p${index}`].StreetNumber;
          rowData[`P${index}_QuarterNumber`] = item[`p${index}`].QuarterNumber;
          index++;
        }
    
        return rowData;
      });
    
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const fileData = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      console.log("aja");
      FileSaver.saveAs(fileData, "exported_data.xlsx");
      setFlag(false);
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
          dispatch(deleteAll2());
          Swal.fire('deleted!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('not deleted', '', 'info')
        }
      })
    }

    const [showPopup, setShowPopup] = useState(false);
    const [sub,setSub] = useState("");
    const openPopup = (submission) => {
      setSub(submission);
    setShowPopup(true);
    };
    const closePopup = () => {
      setSub("");
    setShowPopup(false);
    };
  
    if(showPopup)
    {
      
      
      return (<Fragment>
          <br></br>
       <div className='container justify-content-center'>
     
        <div className='card mb-3' key={sub._id} >
        <div className='card-header d-flex justify-content-between'><strong>Email: {sub.email}</strong>  <button className='btn btn-danger mr-5' onClick={closePopup}>close</button></div>
        <div className='card-body'>

        {Object.entries(sub).map(([key, value]) => (
          (key==="priorityChoices")?(<>
        
           {value.map((item, index) => (
        <div key={item._id} className='d-flex'>
         <strong>Priority Number: {index + 1}</strong>
      <div className='ml-2'> <strong>Street Number:</strong> {item.choice.streetNumber}</div>    
        <div className='ml-2'>  <strong>Quarter Number: </strong>{item.choice.quarterNumber}</div> 
        </div>
      ))}
          </>):(<div key={key}>
          <strong>{key}: </strong>
          {typeof value === 'object' ? JSON.stringify(value) : value}
        </div>)
          
        ))}
         
        </div>
      </div>
      </div>
        </Fragment>)
    }
    const  handleDelete = (_id) => {
      dispatch(deleteInform2(_id));
    };
  
     
  return (
    <Fragment>
    {loading?  <Loader/>:(
      <Fragment>
 <MetaData title={'Admin'}/>
  <div className='mt-3'>
  <button id="ExportData" className="ml-3 btn btn-success"  onClick={handleExport}>
            Export Data
          </button>
          <button id="DeleteData" className="ml-3 btn btn-danger "  onClick={handleDeleteAll}>
           Delete All Submissions
          </button>
  </div>
  
  <div className="d-flex justify-content-center">
  <h1 >All Submissions</h1>
  </div>
  <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="search" aria-label="search" aria-describedby="basic-addon2" value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
        <div className="input-group-append">
          <button className="btn  btn-primary" style={{backgroundColor:'#041570'}} type="button"  onClick={onSearchHandle}>Search</button>
        </div>
      </div>
    </div>
  </div>
</div>


  <div className="container">
      {submissions&&submissions.map((submission) => (
        <div className="card mb-3" key={submission._id}>
          <div className="card-header">{submission.email}</div>
          <div className="card-body">
           {/* {JSON.stringify(submission)} */}
            <p>Name: {submission.name}</p>
            <p>Department: {submission.department}</p>
            <p>Designation: {submission.designation}</p>
            <p>Submission Time: {new Date(""+submission.submissionTime).toLocaleString()}</p>
            <button className='btn btn-success' onClick={()=>openPopup(submission)} >Show</button>
            <button className='btn btn-danger ml-3' onClick={()=>handleDelete(submission._id)} >Delete</button>
          </div>
        </div>
      ))}
    </div>
 

  {(<div className="d-flex justify-content-center mt-5">
    <Pagination activePage={currentPage} 
    itemsCountPerPage={resPerPage}
    totalItemsCount={count}
    onChange={setCurrentPageNo}
    nextPageText={'Next'}
    prevPageText={'Previous'}
    firstPageText={'First Page'}
    lastPageText={'Last Page'}
    itemClass='page-item'
    linkClass='page-link'/>
    </div>)}


  
      </Fragment>
    )}
    
  </Fragment>

  )
}

export default Form2Data