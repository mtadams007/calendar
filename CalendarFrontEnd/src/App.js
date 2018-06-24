import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day/Day'
import EventForm from './EventForm/EventForm'
import Event from './Event/Event'
import './App.css';

class App extends Component {
  state = {
    user: "Michael",
    monthNumber: 1,
    isLoaded: false,
    title: '',
    start: '',
    end: '',
    description: '',
    date: '',
    displayAddForm: false,
    displayEditForm: false,
    displayEvents: false,
    update: false,
    eventId: 0,
    dayEvents: [
    ],
    events: [
    ]
  }

  update = () => {
    axios.get("http://localhost:9292/api/v1/events")
      .then(function(response){
      this.setState({events: response.data, isLoaded: true, update: false})
    }.bind(this))
  }

  componentDidMount() {
    axios.get("http://localhost:9292/api/v1/events")
      .then(function(response){
      this.setState({events: response.data, isLoaded: true})
      console.log("what i want",this.state.events)
    }.bind(this))
  }

  addEvent = (event) => {
    event.preventDefault();
    axios.post("http://localhost:9292/api/v1/events", {
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      date: this.state.date,
      description: this.state.description,
   })
   .then(function(response){
   this.setState({update: true})
    }.bind(this))
  }

  editEvent = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:9292/api/v1/events/${this.state.eventId}`, {
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      date: this.state.date,
      description: this.state.description
   }).then(function(response){
   this.setState({update: true})
    }.bind(this))

  }

  deleteEvent = (event) => {
    console.log('clicked')
    axios.delete(`http://localhost:9292/api/v1/events/${this.state.eventId}`)
    .then(response => {
      console.log('deleted',response)
    }).then(function(response){
    this.setState({update: true})
     }.bind(this))
  }

  handleChangeStart = (event) => {
    this.setState({start: event.target.value});
  }
  handleChangeEnd = (event) => {
    this.setState({end: event.target.value});
  }
  handleChangeTitle = (event) => {
    this.setState({title: event.target.value});
  }
  handleChangeDescription = (event) => {
    this.setState({description: event.target.value});
  }
  getEvent = (month, day) => {
    let eventArray = this.state.events
    let length = eventArray.length
    let allEvents = []
    for(let i=0; i<length; i++) {
      let date = eventArray[i].date
      if (date) {
        let eventMonth = date.substring(5,7)
        let eventDay = date.substring(8,10)
        if(month === parseInt(eventMonth,10) && day === parseInt(eventDay,10)){
          allEvents.push(eventArray[i])
        }
      }
    }
    return allEvents
  }

  displayForm = (eventArray, date) => {
    this.setState({dayEvents: eventArray, displayEditForm: false, displayAddForm: !this.state.displayAddForm, displayEvents: !this.state.displayEvents, date: date})
  }
  displayEditForm = (id, date) => {
    this.setState({displayAddForm: false, displayEditForm: true, eventId: id, })
  }

  renderEvents = (eventArray) => {
    const length = eventArray.length
    if (length === 0) {
      return
    }
    let events = []
    let i = 0
    while(i<length){
      let id = eventArray[i].id
      events.push(
        <div><Event title={eventArray[i].title} start={eventArray[i].start} end={eventArray[i].end} description={eventArray[i].description} click={() => this.displayEditForm(id)}/></div>
      )
      i++
    }
    return events
  }
  renderCalendar = (month) => {
    // these are the most likely of the days and weeks so we hard code them here. this allows us to skip october and january
    let numberOfWeeks = 5
    let dayNumber = 0;
    let numberOfDays = 31;
    if (month === 2){
      dayNumber = -3;
      numberOfDays = 28;
    } else if (month === 3){
      dayNumber = -3
    } else if (month === 4) {
      dayNumber = 1
      numberOfDays = 30
    } else if (month === 5){
      dayNumber = -1
    } else if (month === 6){
      dayNumber = -4
      numberOfDays = 30
    } else if (month === 7) {
      dayNumber = 1
    } else if (month === 8) {
      dayNumber = -2
    } else if (month === 9) {
      dayNumber = -5
      numberOfDays = 30
      numberOfWeeks = 6
    } else if (month === 11) {
      dayNumber = -3
      numberOfDays = 30
    } else if (month === 12) {
      dayNumber = -5
      numberOfWeeks = 6
    }

    let rows = [];

    let dayClass;
    for(let i=0; i<numberOfWeeks; i++){
      let days = [];

      for(let j=0; j<7;j++){
        if (dayNumber < 1 || dayNumber > numberOfDays){
          dayClass = "nonexistent"
        } else {
          dayClass = 'dayNumberDisplay'
        }

        let events = this.getEvent(this.state.monthNumber,dayNumber)
        let event;
        if (events.length>0){
          event = events[0].title
       }
       let date = `2018-${this.state.monthNumber}-${dayNumber}`
       // this way we can't add events to days not on the month
       if (dayClass === 'nonexistent') {
         days.push(
           <Day dayClass={dayClass} dayNumber={dayNumber} event={event}/>)
       } else {
          days.push(
            <Day dayClass={dayClass} dayNumber={dayNumber} event={event} click={()=>this.displayForm(events,date)}/>)
          }
          dayNumber++
      }

        rows.push(<div className="weekRow">{days}</div>)
    }
      return rows;
  }

  previous = () => {
    if (this.state.monthNumber === 1) {
      this.setState({monthNumber: 12})
    } else {
      let newMonthNumber = this.state.monthNumber - 1
      this.setState({monthNumber: newMonthNumber})
    }
  }

  next = () => {
    if (this.state.monthNumber === 12) {
      this.setState({monthNumber: 1})
    } else {
      let newMonthNumber = this.state.monthNumber + 1
      this.setState({monthNumber: newMonthNumber})
    }
  }

  render() {
    console.log('render')
    if (this.state.update) {
      this.update()
    }
    let month;
    let addForm;
    let editForm;
    let eventList;
    if (this.state.monthNumber === 1){
      month = "January"
    } else if (this.state.monthNumber === 2){
      month = "February"
    } else if (this.state.monthNumber === 3){
      month = "March"
    } else if (this.state.monthNumber === 4){
      month = "April"
    } else if (this.state.monthNumber === 5){
      month = "May"
    } else if (this.state.monthNumber === 6){
      month = "June"
    } else if (this.state.monthNumber === 7){
      month = "July"
    } else if (this.state.monthNumber === 8){
      month = "August"
    } else if (this.state.monthNumber === 9){
      month = "September"
    } else if (this.state.monthNumber === 10){
      month = "October"
    } else if (this.state.monthNumber === 11){
      month = "November"
    } else if (this.state.monthNumber === 12){
      month = "December"
    }
    if (this.state.displayAddForm){
      eventList = this.renderEvents(this.state.dayEvents)
      addForm = <div className="form"><EventForm date={this.state.date} onSubmit={this.addEvent} submitValue="Add Event" titleSubmit={this.handleChangeTitle} startSubmit={this.handleChangeStart} descriptionSubmit={this.handleChangeDescription} endSubmit={this.handleChangeEnd} /></div>

    } else if (this.state.displayEditForm) {
      editForm = <div className="form"><EventForm date={this.state.date} onSubmit={this.editEvent} submitValue="Edit Event" titleSubmit={this.handleChangeTitle} startSubmit={this.handleChangeStart} descriptionSubmit={this.handleChangeDescription} endSubmit={this.handleChangeEnd} />
      <button onClick={this.deleteEvent}>DELETE</button></div>
      eventList = this.renderEvents(this.state.dayEvents)
    }
    if (!this.state.isLoaded){
      console.log('waiting')
      return (
        <div>Loading...</div>
      );
    } else {
    return (
      <div className="App">
        <div className="grid">
        <div className="header">
          <h1 className="App-title">{month} 2018</h1>
          <button className="switchMonth" onClick={this.previous}>Previous</button>
          <button className="switchMonth" onClick={this.next}>Next</button>
        </div>
        <div id="eventList">
          {eventList}
        </div>
        <div className="content">
          {this.renderCalendar(this.state.monthNumber)}
        </div>
        <div id="form">
          {addForm}
          {editForm}
        </div>
      </div>
      </div>
    );
  }
  }
}

export default App;
