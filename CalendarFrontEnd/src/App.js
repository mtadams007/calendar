import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day/Day'
import './App.css';

class App extends Component {
  state = {
    monthNumber: 1,
    isLoaded: false,
    events: [
      'boo'
    ]
  }



  componentDidMount() {
    axios.get("http://localhost:9292/api/v1/events")
      .then(function(response){
      // console.log(response.data)
      this.setState({events: response.data, isLoaded: true})
      console.log("what i want",this.state.events)
    }.bind(this))
  }

  getEvent = (month, day) => {
    let eventArray = this.state.events
    let length = eventArray.length
    for(let i=0; i<length; i++) {
      let date = eventArray[i].date
      if (date) {
        let eventMonth = date.substring(5,7)
        let eventDay = date.substring(9,11)
        if(month === parseInt(eventMonth,10) && day === parseInt(eventDay,10)){
          console.log('victory')
          return eventArray[i].start
        }
      }
    }
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
    // this.getEvent(12)
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
        let event = this.getEvent(this.state.monthNumber,dayNumber)
        days.push(
          <Day dayClass={dayClass} dayNumber={dayNumber} event={event} />)
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
    let month;
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
    if (!this.state.isLoaded){
      console.log('waiting')
      return (
        <div>waiting</div>
      );
    } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{month} 2018</h1>
          <button className="switchMonth" onClick={this.previous}>Previous</button>
          <button className="switchMonth" onClick={this.next}>Next</button>
        </header>
        <div>
          {this.renderCalendar(this.state.monthNumber)}
        </div>
      </div>
    );
  }
  }
}

export default App;
