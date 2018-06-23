import React from 'react';
import './EventForm.css';

const eventForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <p>Start:</p>
      <input type="string" name="start" onChange={props.startSubmit}></input>
      <p>End:</p>
      <input type="string" name="end" onChange={props.endSubmit}></input>
      <p>Description:</p>
      <input type="text" name="description" onChange={props.descriptionSubmit}></input>
      <input type="hidden" name="date" value={props.date}></input>
      <br/>
      <input type="submit" value="Add Event" id="addEvent"></input>
    </form>
  );
}

export default eventForm;
