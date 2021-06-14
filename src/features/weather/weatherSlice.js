import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWeather, fetchGeocodeData } from './weatherAPI'
import { terraformData } from '../../utilities/weatherUtils'

const initialState = {
	status: 'idle',
	forecasts: [],
	error: '',
}

export const loadWeatherAsync = createAsyncThunk(
	'weather/fetchWeather',
	async (cityName, { rejectWithValue }) => {
		try {
			// Convert city name to geocoordinates
			const geocodeResponse = await fetchGeocodeData(cityName)
			const [geocodeData, ...other] = geocodeResponse.data

			// Fetch weather data based on geocoords
			const response = await fetchWeather(
				geocodeData.lat,
				geocodeData.lon
			)

			// Re-structure the data for use in store
			const data = terraformData(geocodeData.name, response.data)

			return data
		} catch (error) {
			return rejectWithValue({
				message: error.message,
			})
		}
	}
)

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadWeatherAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(loadWeatherAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.forecasts.push(action.payload)
				state.error = ''
			})
			.addCase(loadWeatherAsync.rejected, (state, action) => {
				state.status = 'error'
				state.forecasts = []
				state.error = action.payload.message
			})
	},
})

// export const {  } = weatherSlice.actions

export default weatherSlice.reducer
