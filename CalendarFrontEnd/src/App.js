import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day/Day'
import EventForm from './EventForm/EventForm'
import Event from './Event/Event'
import MonthButton from './MonthButton/MonthButton'
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
    showAllEvents: false,
    dayEvents: [
    ],
    events: [
    ],
    isHighlight: false,
    dateToHighlight: ''
  }

  // Updates and rerenders page
  update = () => {
    axios.get(this.api)
      .then(function(response){
      this.setState({events: response.data, displayAddForm:false, displayEditForm: false, displayEvents: false, isLoaded: true, update: false, description: '', start:'',end:'', title:''})
    }.bind(this))
  }

  // this is the current location of the api. on a local server we would need to change this
  api = 'https://michael-calendar.herokuapp.com/api/v1/events'

  componentDidMount() {
    axios.get(this.api)
      .then(function(response){
      this.setState({events: response.data, isLoaded: true})
    }.bind(this))
  }

  // adds event to the api
  addEvent = (event) => {
    event.preventDefault();
    axios.post(this.api, {
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      date: this.state.date,
      description: this.state.description,
   })
   .then(function(response){
   this.setState({update: true, isHighlight:false})
    }.bind(this))
  }

  //  edits event in the api
  editEvent = (event) => {
    event.preventDefault();
    axios.put(`${this.api}/${this.state.eventId}`, {
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      date: this.state.date,
      description: this.state.description
   }).then(function(response){
   this.setState({update: true, isHighlight:false})
    }.bind(this))

  }

  // deletes an event in the api
  deleteEvent = (event) => {
    axios.delete(this.api+'/'+this.state.eventId)
    .then(response => {
    }).then(function(response){
    this.setState({update: true, isHighlight:false})
     }.bind(this))
  }

  // shows all the events in the api
  showAllEvents = (event) => {
    this.setState({showAllEvents:!this.state.showAllEvents})
  }

  // changes the month by clicking on the month button
  changeMonth = (monthNumber) => {
    let element = document.getElementsByClassName('highlight');
    if (element.length != 0) {
      element[0].classList.remove("highlight")
    }
    this.setState({monthNumber: monthNumber, isHighlight: false, displayAddForm: false, displayEvents: false })
  }

  // the handleChange commands just change the state when we input into a form
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

  // this gets the events for a given day
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

  // this tells us to display a form and to highlight the day
  displayForm = (eventArray, date, highlight) => {
    this.setState({dayEvents: eventArray, displayEditForm: false, isHighlight: !this.state.isHighlight, dateToHighlight:highlight, displayAddForm: !this.state.displayAddForm, displayEvents: !this.state.displayEvents, date: date, showAllEvents:false, description:'', title:'', start:'', end:''})
  }
  // displays the edit form by clicking on the event
  displayEditForm = (id, title, start, end, description, date) => {
    this.setState({displayAddForm: false, displayEditForm: true, eventId:id, title: title, start: start, end: end,description:description, date: date, showAllEvents:false })
  }
  // shows all the events
  renderEvents = (eventArray) => {
    const length = eventArray.length
    if (length === 0) {
      return
    }
    let events = []
    let i = 0
    while(i<length){
      let id = eventArray[i].id
      let title = eventArray[i].title
      let start = eventArray[i].start
      let end = eventArray[i].end
      let description = eventArray[i].description
      let date = eventArray[i].date
      events.push(
        <div><Event title={title} start={start} end={end} description={description} date={date} click={() => this.displayEditForm(id,title,start,end,description,date)}/></div>
      )
      i++
    }
    return events
  }
  // builds our calendar depending on the month
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
        let highlight = `a${dayNumber}`
        let events = this.getEvent(this.state.monthNumber,dayNumber)
        let event;
        let length = events.length
        if (length>1){
          event = `${events[0].title} + ${length-1} more events`
       } else if (length === 1) {
         event = events[0].title
       }
       let date = `2018-${this.state.monthNumber}-${dayNumber}`
       // this way we can't add events to days not on the month
       if (dayClass === 'nonexistent') {
         days.push(
           <Day dayClass={dayClass} dayNumber={dayNumber} event={event}/>)
       } else {
          days.push(
            <Day dayClass={dayClass} highlight={highlight} dayNumber={dayNumber} event={event} click={()=>this.displayForm(events,date,highlight)}/>)
          }
          dayNumber++
      }

        rows.push(<div className="weekRow">{days}</div>)
    }
      return rows;
  }
  // these two functions handle using the next and previous buttons
  previous = () => {
    let element = document.getElementsByClassName('highlight');
    if (element.length != 0) {
      element[0].classList.remove("highlight")
    }
    if (this.state.monthNumber === 1) {
      this.setState({monthNumber: 12, isHighlight: false, displayAddForm: false, displayEvents: false})
    } else {
      let newMonthNumber = this.state.monthNumber - 1
      this.setState({monthNumber: newMonthNumber, isHighlight: false, displayAddForm: false, displayEvents: false})
    }
  }

  next = () => {
    let element = document.getElementsByClassName('highlight');
    if (element.length != 0) {
      element[0].classList.remove("highlight")
    }
    if (this.state.monthNumber === 12) {
      this.setState({monthNumber: 1, isHighlight: false, displayAddForm: false, displayEvents: false})
    } else {
      let newMonthNumber = this.state.monthNumber + 1
      this.setState({monthNumber: newMonthNumber, isHighlight: false, displayAddForm: false, displayEvents: false})
    }
  }

  render() {
    if (this.state.update) {
      this.update()
    }
    // decides whether or not to remove or add highlights on selected day
    let elementToRemove = document.getElementsByClassName('highlight');
    if (this.state.isHighlight) {
      let element = document.getElementById(this.state.dateToHighlight);
      element.classList.add("highlight")
    }
    else if (elementToRemove.length != 0) {
      elementToRemove[0].classList.remove("highlight")
    }
    // defines components to render
    let showHideButton;
    let month;
    let addForm;
    let editForm;
    let eventList;
    let date;
    // gives our display day for the month
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
    // displays all events on calendar
    if(this.state.showAllEvents){
      showHideButton = <button onClick={this.showAllEvents}>Hide All Events</button>
      eventList = this.renderEvents(this.state.events)
    } else if (!this.state.showAllEvents ) {
      showHideButton = <button onClick={this.showAllEvents}>Show All Events</button>
    }
    // decides whether or not to display forms
    if (this.state.displayAddForm){
      date = <h1>{this.state.date}</h1>
      eventList = this.renderEvents(this.state.dayEvents)
      addForm = <div className="form"><EventForm date={this.state.date} onSubmit={this.addEvent} submitValue="Add Event" titleSubmit={this.handleChangeTitle} startSubmit={this.handleChangeStart} descriptionSubmit={this.handleChangeDescription} endSubmit={this.handleChangeEnd} /></div>
      showHideButton = null
    } else if (this.state.displayEditForm) {
      editForm = <div className="form"><EventForm start={this.state.start} end={this.state.end} description={this.state.description} title={this.state.title} date={this.state.date} onSubmit={this.editEvent} submitValue="Edit Event" titleSubmit={this.handleChangeTitle} startSubmit={this.handleChangeStart} descriptionSubmit={this.handleChangeDescription} endSubmit={this.handleChangeEnd} />
      <button onClick={this.deleteEvent}>DELETE</button></div>
      date = <h1>{this.state.date}</h1>
      eventList = this.renderEvents(this.state.dayEvents)
      showHideButton = null
    }
    // here we wait for the api to load. 
    if (!this.state.isLoaded){
      return (
        <div>Loading...</div>
      );
    } else {
    return (
      <div className="App">
        <div className="grid">
        <div className="header">
          <div id="monthButtonArray">
            <MonthButton monthName="January" click={()=>this.changeMonth(1)}/>
            <MonthButton monthName="February" click={()=>this.changeMonth(2)}/>
            <MonthButton monthName="March" click={()=>this.changeMonth(3)}/>
            <MonthButton monthName="April" click={()=>this.changeMonth(4)}/>
            <MonthButton monthName="May" click={()=>this.changeMonth(5)}/>
            <MonthButton monthName="June" click={()=>this.changeMonth(6)}/>
            <MonthButton monthName="July" click={()=>this.changeMonth(7)}/>
            <MonthButton monthName="August" click={()=>this.changeMonth(8)}/>
            <MonthButton monthName="September" click={()=>this.changeMonth(9)}/>
            <MonthButton monthName="October" click={()=>this.changeMonth(10)}/>
            <MonthButton monthName="November" click={()=>this.changeMonth(11)}/>
            <MonthButton monthName="December" click={()=>this.changeMonth(12)}/>
          </div>
          <h1 className="App-title">{month} 2018</h1>
          <button className="switchMonth" onClick={this.previous}>Previous</button>
          <button className="switchMonth" onClick={this.next}>Next</button>

        </div>
        <div class="content">
          {showHideButton}
          {date}
          {eventList}
        </div>
        <div className="content">
          <div className="dayName">Sunday</div><div className="dayName">Monday</div><div className="dayName">Tuesday</div>
          <div className="dayName">Wednesday</div><div className="dayName">Thursday</div><div className="dayName">Friday</div>
          <div className="dayName">Saturday</div>
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
