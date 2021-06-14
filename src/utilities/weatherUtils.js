import { nanoid } from 'nanoid'

const terraformData = (cityName, apiData) => {
	const date = new Date(apiData.current.dt * 1000)
	const dateOptions = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		timeZoneName: 'short',
	}

	return {
		id: nanoid(),
		city: cityName,
		date: date.toLocaleString('en-US', dateOptions),
		timezone: apiData.timezone,
		sunrise: new Date(apiData.current.sunrise * 1000).toLocaleTimeString(
			'en-US'
		),
		sunset: new Date(apiData.current.sunset * 1000).toLocaleTimeString(
			'en-US'
		),
		temp: apiData.current.temp,
		status: apiData.current.weather[0].main,
		statusDescription: apiData.current.weather[0].description,
		statusIcon:
			`https://openweathermap.org/img/wn/${apiData.current.weather[0].icon}@4x.png` ||
			'',
	}
}

export { terraformData }
