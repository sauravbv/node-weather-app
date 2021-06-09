const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=4710483581f7421bfa630e658bc39a24&query='+ lat + ',' + long +' &units=m'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to fetch weather service', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0]+ '.<br> It is currently ' + body.current.temperature + 
                'C🌡. It feels like ' + body.current.feelslike + 'C ☁. <br>Humidity ' +  body.current.humidity + '😰'
                )
        }
    })
}

module.exports = forecast