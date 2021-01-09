const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current';
    const weatherOptions = {
        access_key: '5d36bb24546be2f1d9442f2e371024ae',
        query: `${lat},${long}`
    }

    request({ url: weatherURL, json: true, qs: weatherOptions }, (error, { body } ) => {
        if (error) {
            callback(error, undefined);
        }else if (body.error){
            callback(body.error.info, undefined);
        }else{
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`);
        }
    });
}

module.exports = forecast;
    
