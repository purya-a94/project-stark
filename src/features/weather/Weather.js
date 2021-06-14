import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadWeatherAsync } from './weatherSlice'

const WeatherInput = ({ callback }) => {
	const [value, setValue] = useState('')

	const handleChange = (eventArgs) => {
		setValue(eventArgs.target.value)
		callback(eventArgs.target.value)
	}

	return <input type="text" value={value} onChange={handleChange} />
}

function Weather() {
	const weather = useSelector((state) => state.weather)
	const dispatch = useDispatch()

	let inputText = ''
	const retrieveText = (text) => (inputText = text)

	return (
		<div>
			<WeatherInput callback={retrieveText} />

			<button onClick={() => dispatch(loadWeatherAsync(inputText))}>
				Load Weather
			</button>

			{
				// LOADING UI
				weather.status === 'loading' ? (
					<h3>LOADING...</h3>
				) : // ERROR UI
				weather.status === 'error' ? (
					<h3>{weather.error}</h3>
				) : (
					// MAIN UI
					<ul>
						{weather.forecasts.map((item) => {
							return (
								<li key={item.id}>
									<p>
										{item.city}, {item.temp} Celcius
										degrees, {item.status}
									</p>
									<p>Sunrise: {item.sunrise}</p>
									<p>Sunset: {item.sunset}</p>
									<img
										src={item.statusIcon}
										alt={item.statusDescription}
									/>
								</li>
							)
						})}
					</ul>
				)
			}
		</div>
	)
}

export default Weather
