import React from 'react';
import './EventForm.css';

const eventForm = (props) => {
  return (
    <form>
      <input type="string" name="start"></input>
      <input type="string" name="end"></input>
      <input type="text" name="description"></input>
      <input type="hidden" name="date" value={props.date}></input>
      <input type="submit" value="Submit" id="changeMe"></input>
    </form>
  );
}

export default eventForm;
