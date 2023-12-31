import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll1, deleteInform1, exportData, form1submissions } from '../actions/formAction';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Pagination from 'react-js-pagination';
import Loader from '../Loader';
import MetaData from './Layout/MetaData';
import { clearErrors } from '../actions/userAction';


const Form1Data = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const params = useParams();
  const [keyword, setKeyword] = useState('');
  const { data } = useSelector((state) => state.res);

  const { submissions, error, count, resPerPage, loading } = useSelector(
    (state) => state.allSubmissions
  );

  useEffect(() => {
    dispatch(form1submissions(keyword, currentPage));
  }, [dispatch, currentPage,error]);

  useEffect(()=>{
    if(error){
      
      if(error){
        
        Swal.fire({
          icon: 'error',
          title: 'OOPS!',
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(clearErrors());
  }
  },[error])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleExport = () => {
  
    setFlag(true);
    console.log('clicked');
    dispatch(exportData());
  };

  useEffect(() => {
    if (data && flag === true) {
      console.log(flag);
      customFunction(data.form);
      setFlag(false);
    }
  }, [data, flag]);

  const onSearchHandle = (e) => {
    e.preventDefault();
    dispatch(form1submissions(keyword, 1));
  };

  const customFunction = (data) => {
    console.log('hello');
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const fileData = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });


    FileSaver.saveAs(fileData, 'submissions.xlsx');
  };

  const handleDeleteAll = () => {
    handleExport();
    Swal.fire({
      title: 'Enter Password to delete all submissions',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off',
        style: 'width: 90% ' 
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red', 
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        
          dispatch(deleteAll1(password));
       

      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };
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
  const  handleDelete = (_id) => {
    dispatch(deleteInform1(_id));
  };

  if(showPopup)
  {
    return (<Fragment>
      <br></br>
       <div className='container justify-content-center'>
     
      <div className='card mb-1' key={sub._id} >
      <div className='card-header d-flex justify-content-between'><strong>Roll Number: {sub.RollNo} </strong><button className='btn btn-danger mr-5' onClick={closePopup}>close</button></div>
      <div className='card-body'>
      {Object.entries(sub).map(([key, value]) => (
        <div key={key}>
          <strong>{key}: </strong>
          {typeof value === 'object' ? JSON.stringify(value) : value}
        </div>
      ))}
       
      </div>
    </div>
    </div>
      </Fragment>)
  }

 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Admin'} />
        
        
          <div className='mt-3 '>
            <button
              id='ExportData'
              className='ml-3 btn btn-success'
              onClick={handleExport}
            >
              Export Data
            </button>
            <button
              id='DeleteData'
              className='ml-3 btn btn-danger'
              onClick={handleDeleteAll}
            >
              Delete All Submissions
            </button>
          </div>

          <div className='d-flex justify-content-center'>
            <h1>All Submissions</h1>
          </div>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='search'
                    aria-label='search'
                    aria-describedby='basic-addon2'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-primary'
                      type='button'
                      onClick={onSearchHandle}
                      style={{backgroundColor:'#041570'}}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container' >
            {submissions &&
              submissions.map((submission) => (
                <div className='card mb-3' key={submission._id} >
                  <div className='card-header'>{submission.RollNo}</div>
                  <div className='card-body'>
                    <p>Name: {submission.Name}</p>
                    <p>Department: {submission.Department}</p>
                    <p>Contact: {submission.contact}</p>
                    <p>Submission Time: {new Date(""+submission.submissionTime).toLocaleString()}</p>
                    <button className='btn btn-success' onClick={()=>openPopup(submission)} >Show</button>
                  </div>
                </div>
              ))}
          </div>

          { (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Previous'}
                firstPageText={'First Page'}
                lastPageText={'Last Page'}
                itemClass='page-item'
                linkClass='page-link'
              />
            </div>
          )}
        </Fragment>
      )}
       
    </Fragment>
  );
};

export default Form1Data;
