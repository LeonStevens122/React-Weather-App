import { Weather } from './Components/Weather';



    test('Fetch Weather Data', done => {
        function callback(data) {
            try {
                expect(data).toBe('peanut butter');
                done();
            } catch (error) {
                done(error);
            }
        }

        fetchData(callback);
    });
