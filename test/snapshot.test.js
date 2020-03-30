// WEatherSnapshot test
import React from 'react';

import renderer from 'react-test-renderer';

import { Weather } from '../src/Components/Weather';


    it('renders correctly', () => {
        const WeatherComponent = renderer.create(<Weather />).toJSON();
        expect(WeatherComponent).toMatchSnapshot();
        // On the first run of this test, Jest will generate a snapshot file automatically.
    });

