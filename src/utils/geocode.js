const request = require('postman-request');

const geoCode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json';
    const mapboxAPIOptions = {
        access_token: 'pk.eyJ1IjoianNhcmRpbmkiLCJhIjoiY2tqaGFrd2xvMTJ1dDJxbXNneDZwbWF0NyJ9.G2TGjU949qirgHZiNlzgUQ',
        limit: 1,
    }

    request({ url: geocodeURL , json: true, qs: mapboxAPIOptions}, (error, { body } ) => {
        if (error) {
            callback('Network transport error.', undefined);
        }else if (body.message){
            callback('Missing Token', undefined);
        }else if(body.features.length === 0){
            callback('Nothing found for search query', undefined);
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;
