import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNorms, formSubmission } from '../../actions/formAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutUser } from '../../actions/userAction';
import { clearErrors } from '../../actions/adminAction';

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

  const { norms, sTime, eTime, loading } = useSelector((state) => state.form);
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
    // Convert form data to JSON
    const jsonData = JSON.stringify(formData);
    // Check if all required fields are filled before submitting the form
    if (isFormValid()) {
      dispatch(formSubmission(formData));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all required fields.',
        text: ``,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const isFormValid = () => {
    // Add logic to check if all required fields are filled
    return (
      formData.Name.trim() !== '' &&
      formData.Department.trim() !== '' &&
      formData.dateOfJoining.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.fellowship.trim() !== '' &&
      formData.nameOfInstitute.trim() !== '' &&
      formData.typeOfInstitute.trim() !== '' &&
      formData.scaleOfPayAndBasicPay.trim() !== '' &&
      formData.presentResidentialAddress.trim() !== '' &&
      formData.permanentAddress.trim() !== '' &&
      formData.maritalStatus.trim() !== '' &&
      formData.dateOfMarriage.trim() !== '' &&
      formData.contact.trim() !== ''
    );
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
      <div className="small-container">
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
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="typeOfInstitute">Type of Institute (if under QIP)</label>
          <select
            name="typeOfInstitute"
            id="typeOfInstitute"
            value={formData.typeOfInstitute}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
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
            required // Adding "required" to make this field mandatory
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

          <label htmlFor="dateOfMarriage">Date of marriage</label>
          <input
            id="dateOfMarriage"
            type="date"
            name="dateOfMarriage"
            value={formData.dateOfMarriage}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <label htmlFor="contact">Contact Phone Number/email id</label>
          <input
            id="contact"
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required // Adding "required" to make this field mandatory
          />

          <div>
            <h5>NORMS FOR PG/ QIP/ RESEARCH QUARTERS ALLOTMENT</h5>
            {norms &&
              norms.map((norm) => {
                return (
                  <Fragment key={norm.id}>
                    {norm.statement}
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
