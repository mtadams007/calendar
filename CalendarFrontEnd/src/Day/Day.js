import React from 'react';

import './Day.css';

const day = (props) => {
  return (
    <button id={props.id} className='day' onClick={props.click}>
      <div className={props.dayClass} >
        <div className="topCorner">
          {props.dayNumber}
        </div>
        <div className="eventText">
          Michael
        </div>
      </div>


    </button>
  );
}

export default day;
