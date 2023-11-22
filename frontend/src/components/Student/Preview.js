import React from 'react';

const PreviewComponent = ({ submissions }) => {
  const {
    Name,
    Department,
    dateOfJoining,
    category,
    fellowship,
    nameOfInstitute,
    typeOfInstitute,
    scaleOfPayAndBasicPay,
    presentResidentialAddress,
    permanentAddress,
    maritalStatus,
    dateOfMarriage,
    contact,
    guide,
    tenureCompleted,
    remarks,
  } = submissions;

  return (
    <div>
    
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>Department:</strong> {Department}</p>
      <p><strong>Date of Joining:</strong> {dateOfJoining}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Fellowship:</strong> {fellowship}</p>
      <p><strong>Name of Institute:</strong> {nameOfInstitute}</p>
      <p><strong>Type of Institute:</strong> {typeOfInstitute}</p>
      <p><strong>Scale of Pay and Basic Pay:</strong> {scaleOfPayAndBasicPay}</p>
      <p><strong>Present Residential Address:</strong> {presentResidentialAddress}</p>
      <p><strong>Permanent Address:</strong> {permanentAddress}</p>
      <p><strong>Marital Status:</strong> {maritalStatus}</p>
      <p><strong>Date of Marriage:</strong> {dateOfMarriage}</p>
      <p><strong>Contact:</strong> {contact}</p>
      <p><strong>Guide:</strong> {guide}</p>
      <p><strong>Tenure Completed:</strong> {tenureCompleted}</p>
      <p><strong>Remarks:</strong> {remarks}</p>

    </div>
  );
};

export default PreviewComponent;
