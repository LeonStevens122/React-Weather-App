import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchCities from './SearchBar';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import $ from 'jquery';

require("es6-promise").polyfill();
require("isomorphic-fetch");

// set API key as a constant
const API_KEY = '7d0b4cb28e605d519d157802f6335349';
// import Cities list JSON

let cities = require('../Assets/city.list.json');

let temp = "";
let input = "";
let cityAPI = "";

// map cities list, to get an array of city Names
let cityNames = cities.map((currentObject) => {
   return (currentObject.name )
});



class Weather extends Component {
    // set initial state and bind event handling
    constructor(props) {
        super(props);

       

        this.state = {
            cityName: "blank",
            key: "1",
            fetchData: ""           
        }      
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }

   

    // method to capture user input
    handleCityInput(textInput) {
        input = textInput.target.value;

        // capitilize first letter of each word to match API requirements
        input = input.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');

        // add user input & API Key to API URL & Save as a variable
        cityAPI = ("http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + API_KEY + "&units=metric");
       
    }

  // onClick Event
    handleClick(event) {

        
        // check if the city name exists in the list of cities that the API has data on
        if (cityNames.includes(input)) {
            
            // use try to catch potential errors

            try {
            // use fetch to fetch the data from the API 
            fetch(cityAPI)
                .then(res => res.json())
                .then(// set state & call the APP method with the resulting JSON 
                    (result) => {
                        this.setState({

                            fetchData: result
                        });
                        this.props.updateWeather(result);
                      
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log("logged  Error", error);
                        // log any errors
                    });
                    }// catch any arrors that may have slipped through
                    catch (e) {
                        console.error(e.message);
                    }
                
        }
    }

    // render the component, props and methods are imported from the App component
    render() {
        
       return (
            <div>
                <MuiThemeProvider>
                    <div>

                        <h2> Select City </h2>
                      
                        <TextField
                            key={this.state.key}

                            hintText="Enter City Name"
                            floatingLabelText="City"
                            onChange={this.handleCityInput}
                        />
                        <RaisedButton onClick={this.handleClick}> Submit  </RaisedButton>
                        <h1> Weather Component </h1>
                        <h3> Weather City Name : {this.props.name} </h3>
                        <h3> Weather Temp : {this.props.temp} </h3>
                        <h3> Weather Conditions : {this.props.condition} </h3>
                      

                        </div>
                    </ MuiThemeProvider>
            </div>

            )
    }
}

const style = {
    margin: 15
};

export default Weather;
