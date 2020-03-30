// import components & dependencies

import React, { Component } from 'react';
import Weather from './Components/Weather';

import './App.css';

require("es6-promise").polyfill();
require("isomorphic-fetch");




const API_KEY = '7d0b4cb28e605d519d157802f6335349';

let cities = require('./Assets/city.list.json');

let temp = "original value";

let cityNames = cities.map((currentObject) => {
    return (currentObject.name)
});


// main Application Component

class App extends Component {
    // set initial state & bind event handling
    constructor(props) {
        super(props);
      
        this.state = {
            cityName: "blank",
            localName: "blank",
            localTemp: "blank",
            localCondition: "blank"
        }
         this.handleCity = this.handleCity.bind(this);

    }
    
   // event handling sets the state of the app which updates the weather information that is displayed
    handleCity(weatherJSON)
    {
       
     this.setState({

             localName: weatherJSON.name,
             localTemp: weatherJSON.main.temp,
             localCondition: weatherJSON.weather[0].description
            })

    }

// fetch local weather information upon component mount using geolocation method 
    componentDidMount() {
// use navigator & geolocation methids to get the users current position
        navigator.geolocation.getCurrentPosition((position) => {
          
            // use fetch to retrieve the weather data from the API
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${API_KEY}&units=metric`)
                .then((fetchedResults) => { return fetchedResults.json(); })
                .then((fetchedResults) => {
                  
                    temp = fetchedResults.main.temp;
                    // set state based on the returned values
                    this.setState({

                        localName: fetchedResults.name,
                        localTemp: fetchedResults.main.temp,
                        localCondition: fetchedResults.weather[0].description
                    })

                });
        });

    }
    // renderthe main component, submitting state and methods as props
    render() {
        console.log(" Method ", this.handleCity);

  return (
      <div className="App">

          <Weather updateWeather={this.handleCity} temp={this.state.localTemp} condition={this.state.localCondition} name={this.state.localName} />
          <h1> Name : {this.state.localName} </h1>

    </div>
  );
}
}
export default App;
