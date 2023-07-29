import React, { Fragment, useEffect, useState } from 'react';
import { fetchQuarter, quarterFormSubmission } from '../actions/formAction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/userAction';
import { clearErrors } from '../actions/adminAction';
const QuartersForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchQuarter());
  }, [dispatch]);
  const { choices,sTime,eTime} = useSelector((state) => state.quarter);
  const { error, data } = useSelector((state) => state.formSubmission);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'You can submit the form only once.',
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
      dispatch(logoutUser());
      navigate('/');
    }
  }, [error, data, dispatch, navigate]);


  const [priorityChoices, setPriorityChoices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    staffNumber: '',
    designation: '',
    department: '',
    scalePay: '',
    gradePay: '',
    basicPay: '',
    joiningInstitute: '',
    joiningCadre: '',
    presentResidentialAddress: '',
    maritalStatus: '',
    applicationType: '',
    scOrST: '',
    occupationDate: '',
  });
  const [valid,setValid]= useState(false);
  useEffect(()=>{
   if(eTime&&sTime)
   {
    const currentTime = new Date();
    const startTime = new Date(sTime);
    const endTime = new Date(eTime);
   
    if(startTime>currentTime)
    {
       setValid(false);
    }else if(endTime<currentTime)
    {
      setValid(false);
    }else 
    {
      setValid(true);
    }
   }
  },[eTime, sTime]);
  const handleChoiceSelection = (choice) => {
    if (!priorityChoices.includes(choice)) {
      setPriorityChoices([...priorityChoices, choice]);
    }
  };

  const handleRemoveChoice = (choice) => {
    const updatedPriorityChoices = priorityChoices.filter(
      (priorityChoice) => priorityChoice !== choice
    );
    setPriorityChoices(updatedPriorityChoices);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    

    // Convert form data according to the model
    const modelData = {
      name: formData.name,
      staffNumber: formData.staffNumber,
      designation: formData.designation,
      department: formData.department,
      scalePay: formData.scalePay,
      gradePay: formData.gradePay,
      basicPay: formData.basicPay,
      joiningInstitute: formData.joiningInstitute,
      joiningCadre: formData.joiningCadre,
      presentResidentialAddress: formData.presentResidentialAddress,
      maritalStatus: formData.maritalStatus,
      applicationType: formData.applicationType,
      scOrST: formData.scOrST,
      occupationDate: formData.occupationDate,
      priorityChoices: priorityChoices
    };

    dispatch(quarterFormSubmission(modelData))

  
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel= (e) => {
    dispatch(logoutUser());
    
    navigate('/');
  };
  if(!valid)
  {
    return (<h1 className='d-flex justify-content-center'>Form is Closed... </h1>);
  }

  return (
    <Fragment>
     
     <div className="small-container">
     <h2>APPLICATION FOR ALLOTMENT / RENEWAL / CHANGE OF RESIDENTIAL QUARTERS</h2>
  <form onSubmit={handleFormSubmit}>
  <label htmlFor="name">Name of the Applicant</label>
          <input type="text" id="name" name="name" required onChange={handleChange} />

          <label htmlFor="staffNumber">Staff Number</label>
          <input type="text" id="staffNumber" name="staffNumber" required onChange={handleChange} />

          <label htmlFor="designation">Designation</label>
          <input type="text" id="designation" name="designation" required onChange={handleChange} />

          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          >
            <option value="" disabled selected>
              Select your department
            </option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="ICE">ICE</option>
            <option value="MECHANICAL">MECHANICAL</option>
            
          </select>
          

          <label htmlFor="scalePay">Scale of Pay</label>
          <input type="text" id="scalePay" name="scalePay" required onChange={handleChange} />

          <label htmlFor="gradePay">Grade Pay/Pay Level</label>
          <input type="text" id="gradePay" name="gradePay" required onChange={handleChange} />

          <label htmlFor="basicPay">Basic Pay drawn per Month</label>
          <input type="text" id="basicPay" name="basicPay" required onChange={handleChange} />

          <label htmlFor="joiningInstitute">Date of Joining Institute</label>
          <input type="date" id="joiningInstitute" name="joiningInstitute" required onChange={handleChange} />

          <label htmlFor="joiningCadre">Date of Joining Cadre</label>
          <input type="date" id="joiningCadre" name="joiningCadre" required onChange={handleChange} />

          <label htmlFor="presentResidentialAddress">Present Residential Address</label>
          <textarea
            id="presentResidentialAddress"
            name="presentResidentialAddress"
            rows="4"
            required
            onChange={handleChange}
          ></textarea>

         
<label htmlFor="maritalStatus">Marital status</label>
<select name="maritalStatus" id="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
  <option value="" disabled hidden>Select an Option</option>
  <option>Married</option>
  <option>UnMarried</option>
</select>

<label htmlFor="applicationType">Is the application for new allotment, renewal or change of residential quarters</label>
<select name="applicationType" id="applicationType" value={formData.applicationType} onChange={handleChange}>
<option value="" disabled  hidden >Select an Option</option>
  <option value="newAllotment">New Allotment</option>
  <option value="Renewal">Renewal</option>
  <option value="changeQuarters">Change of residential Qts</option>
</select>

          <label htmlFor="scOrST">SC/ST</label>
          <select name="scOrST" id="scOrST" value={formData.scOrST} onChange={handleChange}>
<option value="" disabled  hidden>Select an Option</option>
  <option value="newAllotment">SC</option>
  <option value="Renewal">ST</option>
</select>

          <label htmlFor="occupationDate">Date of Occupation</label>
          <input type="date" id="occupationDate" name="occupationDate" required onChange={handleChange} />

          {/* Priority list */}
          <div>
            <h3>Choose options and set their priority:</h3>
            <ul className="list-group">
              {choices &&
                choices.map((choice, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${priorityChoices.includes(choice) ? 'active' : ''}`}
                    onClick={() => handleChoiceSelection(choice)}
                  >
                    <b>Street Number:</b> {choice.choice.streetNumber} <b>Quarter Number:</b>{' '}
                    {choice.choice.quarterNumber}
                  </li>
                ))}
            </ul>
          </div>
          <h4>Priority List:</h4>
      <ol className="list-group">
  {priorityChoices.map((choice, index) => (
    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
      <b>Street Number:</b>  {choice.choice.streetNumber} <b>Quarter Number:</b> {choice.choice.quarterNumber}
      <i
        className="bi bi-x-circle-fill"
        onClick={() => handleRemoveChoice(choice)}
        style={{ cursor: 'pointer' }}
      ></i>
    </li>
  ))}
</ol>

<div style={{ marginTop: '30px' }}>
            <input type="submit" value="Submit" />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              onClick={handleCancel}
              value="Cancel"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default QuartersForm;
