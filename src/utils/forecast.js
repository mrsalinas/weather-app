const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=154fcca9e5eac7509d7fbbbf14f13d1a&query='+latitude+','+longitude+'&unit=f'

    request({url, json:true}, (error, data) => {

        if ( error ) {
            callback('Unable to connect to forecast services', undefined)
        } else if ( data.body.error ) {
            callback('There is no data for the latitude and longitude provided', undefined)
        } else {
            console.log(data.body.current)
            callback(undefined,
                console.log(' Today is doing '+data.body.current.temperature+'  but it feels like: '+ data.body.current.feelslike+'. The humidity is of '+data.body.current.humidity+' The description is: '+data.body.current.weather_descriptions[0]))
        }


    })

}

module.exports = forecast