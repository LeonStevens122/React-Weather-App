import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box';

let cities = require('../Assets/city.list.json');


export default class SearchCities extends Component {
    data = cities;

    render() {
        console.log("cities object", cities);
    return (
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
            data={cities}
        callback={record => console.log("Console Log Search : ",record)}
      />
    )
  }
}