import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNorms, formSubmission } from '../../actions/formAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutUser } from '../../actions/userAction';

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
  });

  useEffect(() => {
    dispatch(fetchNorms());
  }, [dispatch]);

  const { norms, loading } = useSelector((state) => state.form);
  let i = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert form data to JSON
    const jsonData = JSON.stringify(formData);
    //console.log(jsonData);
    dispatch(formSubmission(formData));
    Swal.fire({
      icon: 'success',
      title: 'Submitted Successfully.',
      text: `Done!`,
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(logoutUser());
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel= (e) => {
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <>
      <div className="small-container">
        <form onSubmit={handleSubmit}>
          <h1>Enter the details</h1>
          <label htmlFor="firstName">Name</label>
          <input
            id="Name"
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        
<label htmlFor="Department">Department</label>
<input
  id="Department"
  type="text"
  name="Department"
  value={formData.Department}
  onChange={handleChange}
/>

<label htmlFor="dateOfJoining">Date of Joining the Ph.D Programme</label>
<input
  id="date"
  type="date"
  name="dateOfJoining"
  value={formData.dateOfJoining}
  onChange={handleChange}
/>

<label htmlFor="category">Student Category</label>
<select name="category" id="category" value={formData.category} onChange={handleChange}>
  <option value="" disabled hidden>Select an Option</option>
  <option value="OC">OC</option>
  <option value="OBC">OBC</option>
  <option value="SC">SC</option>
  <option value="ST">ST</option>
  <option value="PWD">PWD</option>
</select>

<label htmlFor="fellowship">Type of fellowship</label>
<select name="fellowship" id="fellowship" value={formData.fellowship} onChange={handleChange}>
  <option value="" disabled hidden>Select an Option</option>
  <option value="QIP">QIP</option>
  <option value="Full Time (Institute Fellowship)">Full Time (Institute Fellowship)</option>
  <option value="Full Time (Under Prvalue={formData.fellowship} onChange={handleChange}oject)">Full Time (Under Project)</option>
  <option value="Full Time (without fellowship)">Full Time (without fellowship)</option>
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
<select name="typeOfInstitute" id="typeOfInstitute" value={formData.typeOfInstitute} onChange={handleChange}>
  <option value="" disabled hidden>Select an Option</option>
  <option>Government</option>
  <option>Government Aided</option>
  <option>Private</option>
</select>

<label htmlFor="scaleOfPayAndBasicPay">Scale of pay and Basic Pay (if applicable)</label>
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
/>


<label htmlFor="permanentAddress">Permanent Address</label>
<input
  id="permanentAddress"
  type="text"
  name="permanentAddress"
  value={formData.permanentAddress}
  onChange={handleChange}
/>

<label htmlFor="maritalStatus">Marital status</label>
<select name="maritalStatus" id="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
  <option value="" disabled hidden>Select an Option</option>
  <option>Married</option>
  <option>UnMarried</option>
</select>

<label htmlFor="dateOfMarriage">Date of marriage</label>
<input
  id="dateOfMarriage"
  type="date"
  name="dateOfMarriage"
  value={formData.dateOfMarriage}
  onChange={handleChange}
/>

<label htmlFor="contact">Contact Phone Number/email id</label>
<input
  id="contact"
  type="text"
  name="contact"
  value={formData.contact}
  onChange={handleChange}
/>

<div>
  <h5>NORMS FOR PG/ QIP/ RESEARCH QUARTERS ALLOTMENT</h5>
  {norms &&
    norms.map((norm) => {
      return (
        <Fragment key={i}>
           {++i}. {norm.statement}
          <br />
        </Fragment>
      );
    })}
</div>
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
    </>
  );
};

export default Form;

