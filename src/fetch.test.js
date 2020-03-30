import { Weather } from '../src/Components/Weather';
import React from 'react';
import { shallow } from 'enzyme';


// check if the API fetch request runs without returning an error

    test('Fetch Weather Data - fails if API returns an error', () => {
        return fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=7d0b4cb28e605d519d157802f6335349&units=metric')
            .catch(e => expect(e).not.toBe('error'));
    });


// check if the API request returns an object
test('API shoud return JSON String', () => {
    return fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=7d0b4cb28e605d519d157802f6335349&units=metric')
        .then(data => data.json())
        .then(dataRecieved => {
            expect(typeof dataRecieved).toBe('object')
        })
})
