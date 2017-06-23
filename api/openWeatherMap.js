const axios = require('axios');
const moment = require('moment');

moment.locale('ru');

const owApiKey = process.env.OPEN_WEATHER_API_KEY || '8205f9ce0d9aeec4c40c1b211e06a006';

const OPEN_WEATHER_MAP_URL = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&appid=${owApiKey}`;
// q=Almaty

module.exports = (cityId) => {
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&id=${cityId}`;

    return axios.get(requestUrl).then(function (res) {
        return res.data.list.slice(0, 4).map((el) => {
            return moment(el.dt_txt).format('LT') + ' — ' + Math.round(el.main.temp) + ' ℃, ' + el.weather[0].description;
        }).join('\n');
    }).catch((data) => {
        console.log(data);
    });
};