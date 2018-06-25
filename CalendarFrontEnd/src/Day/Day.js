import React from 'react';

import './Day.css';

const day = (props) => {
  return (
    <button className='day' id={props.highlight} onClick={props.click}>
      <div className={props.dayClass} >
        <div>
          {props.dayNumber}
        </div>
        <div className="eventText">
          {props.event}
        </div>
      </div>


    </button>
  );
}

export default day;
