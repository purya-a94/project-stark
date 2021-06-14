import axios from 'axios'

const OW_API_KEY = 'cbd4348b5bd184cecc4a4dfc55d462c3'

const instance = axios.create({
	baseURL: 'https://api.openweathermap.org',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	responseType: 'json',
})

// Karaj Co-ords:
// Latitude:	35.8355
// Longitude:	51.0103
export const fetchWeather = (latitude, longitude) => {
	return instance({
		method: 'get',
		url: '/data/2.5/onecall',
		params: {
			lat: latitude,
			lon: longitude,
			exclude: 'minutely,hourly,daily,alerts',
			appid: OW_API_KEY,
			units: 'metric',
		},
	})
}

export const fetchGeocodeData = (cityName) => {
	return instance({
		method: 'get',
		url: '/geo/1.0/direct',
		params: {
			q: cityName,
			limit: 3,
			appid: OW_API_KEY,
		},
	})
}
