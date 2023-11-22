import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNorms, formSubmission, preSubmission1, withdrawSubmission1 } from '../../actions/formAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutUser } from '../../actions/userAction';
import { clearErrors } from '../../actions/adminAction';
import PreviewComponent from './Preview';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Department: '',
    dateOfJoining: '',
    category: '',
    fellowship: '',
    nameOfInstitute: '',
    typeOfInstitute: '',
    scaleOfPayAndBasicPay: '',
    presentResidentialAddress: '',
    permanentAddress: '',
    maritalStatus: '',
    dateOfMarriage: '',
    contact: '',
    guide: '',
    tenureCompleted: '',
    remarks: '',
  });
  const [preview,setPreview] = useState(null);
  useEffect(() => {
    dispatch(fetchNorms());
    dispatch(preSubmission1());
  }, [dispatch]);

  const { norms, sTime, eTime, loading } = useSelector((state) => state.form);
  const { error, data } = useSelector((state) => state.formSubmission);
  const { submissions} = useSelector((state) => state.preSubmission);
  
  useEffect(()=>{
     if(submissions)
     {
     // console.log(JSON.stringify(submissions));
    const temp={  Name: submissions.Name||'',
      Department: submissions.Department ||'',
      dateOfJoining: submissions.dateOfJoining||'',
      category: submissions.category||'',
      fellowship: submissions.fellowship|| '',
      nameOfInstitute: submissions.nameOfInstitute||'',
      typeOfInstitute: submissions.typeOfInstitute||'',
      scaleOfPayAndBasicPay: submissions.scaleOfPayAndBasicPay||'',
      presentResidentialAddress: submissions.presentResidentialAddress||'',
      permanentAddress: submissions.permanentAddress||'',
      maritalStatus: submissions.maritalStatus||'',
      dateOfMarriage:submissions.dateOfMarriage|| '',
      contact: submissions.contact||'',
      guide: submissions.guide||'',
      tenureCompleted: submissions.tenureCompleted||'',
      remarks: submissions.remarks||'',
     }
     setFormData(temp);
    }
    },[submissions]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something wents wrong.',
        text: ``,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(clearErrors());
      dispatch(logoutUser());
      navigate('/');
    }
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully.',
        text: `Done!`,
        showConfirmButton: false,
        timer: 1500,
      });
     // dispatch(logoutUser());
     //console.log(data.data.form);
     setPreview(data.data.form);
      
    }
  }, [error, data, dispatch, navigate]);

  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (eTime && sTime) {
      const currentTime = new Date();
      const startTime = new Date(sTime);
      const endTime = new Date(eTime);
      if (startTime > currentTime || endTime < currentTime) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  }, [eTime, sTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
      dispatch(formSubmission(formData));
    
  };


  const handleWithdraw = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to withdraw the form!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, withdraw it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(withdrawSubmission1());
        navigate('/');
        
      }
    });
  
     
    
  };

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = (e) => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (!valid) {
    return <h1 className='d-flex justify-content-center'>Form is Closed... </h1>;
  }

  return (
    <>
    {preview?<div>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <center><h5><strong>QUARTERS ALLOTMENTADVISORY COMMITTEE</strong><br></br>
<strong>NATIONAL INSTITUTE OF TECHNOLOGY TIRUCHIRAPPALLI</strong></h5>
<h6><u>APPLICATION FOR ALLOTMENT OF PG / QIP/ RSB QUARTERS</u></h6>
</center>
              
            <PreviewComponent submissions={preview}/>
            <input
              style={{ marginLeft: '12px' }}
              className="btn btn-success"
              type="button"
              onClick={()=>setPreview(null)}
              value="Edit"
            />

            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              onClick={handleCancel}
              value="Close"
            />

             <input
              style={{ marginLeft: '12px' }}
              className="btn btn-danger"
              type="button"
              onClick={handleWithdraw}
              value="Withdraw"
            />
           </div>
           </div>
           </div>
           </div>
           </div>
      </div>:<><div className="small-container">
        <form onSubmit={handleSubmit}>
          <h1>Enter the details</h1>
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="Department">Department</label>
          <select
            id="Department"
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          >
            <option value="" disabled>
              Select your department
            </option>
            <option value="Architecture">Architecture</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Applications">Computer Applications</option>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
            <option value="Energy and Environment (CEESAT)">Energy and Environment (CEESAT)</option>
            <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
            <option value="Instrumentation and Control Engineering">Instrumentation and Control Engineering</option>
            <option value="Management Studies">Management Studies</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Mechanical Engineering">Mechanical EngineeringL</option>
            <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
            <option value="Physics">Physics</option>
            <option value="Production Engineering">Production Engineering</option>
            
          </select>

          <label htmlFor="dateOfJoining">Date of Joining the Ph.D Programme</label>
          <input
            id="dateOfJoining"
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="category">Student Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option value="OC">OC</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="PWD">PWD</option>
          </select>

          <label htmlFor="fellowship">Type of fellowship</label>
          <select
            name="fellowship"
            id="fellowship"
            value={formData.fellowship}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option value="QIP">QIP</option>
            <option value="Full Time (Institute Fellowship)">
              Full Time (Institute Fellowship)
            </option>
            <option value="Full Time (Under Project)">
              Full Time (Under Project)
            </option>
            <option value="Full Time (without fellowship)">
              Full Time (without fellowship)
            </option>
          </select>

          <label htmlFor="nameOfInstitute">Name of Institute (if under QIP)</label>
          <input
            id="nameOfInstitute"
            type="text"
            name="nameOfInstitute"
            value={formData.nameOfInstitute}
            onChange={handleChange}
          />

          <label htmlFor="typeOfInstitute">Type of Institute (if under QIP)</label>
          <select
            name="typeOfInstitute"
            id="typeOfInstitute"
            value={formData.typeOfInstitute}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option>Government</option>
            <option>Government Aided</option>
            <option>Private</option>
          </select>

          <label htmlFor="scaleOfPayAndBasicPay">
            Scale of pay and Basic Pay (if applicable)
          </label>
          <input
            id="scaleOfPayAndBasicPay"
            type="text"
            name="scaleOfPayAndBasicPay"
            value={formData.scaleOfPayAndBasicPay}
            onChange={handleChange}
          />

          <label htmlFor="presentResidentialAddress">Present Residential Address</label>
          <input
            id="presentResidentialAddress"
            type="text"
            name="presentResidentialAddress"
            value={formData.presentResidentialAddress}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="permanentAddress">Permanent Address</label>
          <input
            id="permanentAddress"
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="maritalStatus">Marital status</label>
          <select
            name="maritalStatus"
            id="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option>Married</option>
            <option>UnMarried</option>
          </select>

          {
            formData.maritalStatus==='Married'?(<> <label htmlFor="dateOfMarriage">Date of marriage</label>
            <input
              id="dateOfMarriage"
              type="date"
              name="dateOfMarriage"
              value={formData.dateOfMarriage}
              required
              onChange={handleChange}
            /></>):(
              <></>
            )
          }
          <label htmlFor="tenure">Tenure Completed</label>
            <input
              id="tenureCompleted"
              type="number"
              name="tenureCompleted"
              value={formData.tenureCompleted}
              required
              onChange={handleChange}
            />
             <label htmlFor="guide">Guide Name</label>
            <input
              id="guide"
              type="text"
              name="guide"
              value={formData.guide}
              required
              onChange={handleChange}
            />

        <label htmlFor="remarks">Remarks</label>
            <input
              id="remarks"
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />

         
            

          <label htmlFor="contact">Contact Phone Number / Email id</label>
          <input
            id="contact"
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <div>
            <h5>NORMS FOR FULL-TIME / QIP SCHOLARS ALLOTMENT</h5>
            {norms &&
              norms.map((norm, index)=> {
                return (
                  <Fragment key={index}>
                    {norm.statement}
                    <br />
                  </Fragment>
                );
              })}
          </div>

          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Submit" style={{backgroundColor:'#041570'}} />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              onClick={handleCancel}
              value="Cancel"
            />

             <input
              style={{ marginLeft: '12px' }}
              className="btn btn-danger"
              type="button"
              onClick={handleWithdraw}
              value="Withdraw"
            />
          </div>
        </form>
      </div></>}
      
    </>
  );
};

export default Form;
