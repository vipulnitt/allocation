import React, { useState } from 'react';

const ChoiceSelector = ({ choices, onChoicesSelected }) => {
  const [priorityChoices, setPriorityChoices] = useState([]);

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

 

  return (
    <div>
      <h3>Choose options and set their priority:</h3>
      <ul className="list-group">
        {choices.map((choice, index) => (
          <li
            key={index}
            className={`list-group-item ${priorityChoices.includes(choice) ? 'active' : ''}`}
            onClick={() => handleChoiceSelection(choice)}
          >
            {choice}
          </li>
        ))}
      </ul>
      <h4>Priority List:</h4>
      <ol className="list-group">
  {priorityChoices.map((choice, index) => (
    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
      {choice}
      <i
        className="bi bi-x-circle-fill"
        onClick={() => handleRemoveChoice(choice)}
        style={{ cursor: 'pointer' }}
      ></i>
    </li>
  ))}
</ol>

   
     
    </div>
  );
};

export default ChoiceSelector;
