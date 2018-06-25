import React from 'react';

import './MonthButton.css';

const monthButton = (props) => {
  return (
    <button className='monthButton' onClick={props.click}>
      <h3>{props.monthName}</h3>
    </button>
  );
}

export default monthButton;
