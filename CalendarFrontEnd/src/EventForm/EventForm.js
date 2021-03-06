import React from 'react';
import './EventForm.css';

const eventForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <p>Title:</p>
      <input type="text" name="title" onChange={props.titleSubmit} value={props.title} maxLength='20' required></input>
      <p>Start:</p>
      <input type="time" name="start" onChange={props.startSubmit} value={props.start}></input>
      <p>End:</p>
      <input type="time" name="end" onChange={props.endSubmit} value={props.end}></input>
      <p>Description:</p>
      <input type="textfield" name="description" onChange={props.descriptionSubmit} value={props.description}></input>
      <input type="hidden" name="date" value={props.date}></input>
      <br/>
      <input type="submit" value={props.submitValue}></input>
    </form>
  );
}

export default eventForm;
