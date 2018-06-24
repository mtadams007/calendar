import React from 'react';

import './Event.css';

const event = (props) => {
  return (
    <button className='event' onClick={props.click}>
      <div>
        <h2>{props.title}</h2>
        <h4>{props.start} - {props.end}</h4>
        <p>{props.description}</p>
      </div>
    </button>
  );
}

export default event;
