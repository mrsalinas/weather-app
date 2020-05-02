const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFyY3VzZGV2IiwiYSI6ImNrOWM2OWk3djAxanMzZG16YWd1dmI5NW8ifQ.hx3GmUbcqa5RhRk7xblV1g&limit=1'

    request({url, json: true}, (error, { body }) => {

        if ( error ) {
            callback('Unable to connect to location services', undefined)
        } else if ( body.features.length == 0 ) {
            callback('There are no results. Try another location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode