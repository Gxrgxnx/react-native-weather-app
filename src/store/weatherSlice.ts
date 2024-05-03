import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCityWeather } from '../httpClient';
import { WeatherData } from '../types';
import { AppDispatch } from './';

interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  loading: true,
  error: false,
  errorMessage: null,
};

const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    fetchWeatherDataPending(state) {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    },
    fetchWeatherDataSuccess(state, action: PayloadAction<WeatherData>) {
      state.loading = false;
      state.error = false;
      state.weatherData = action.payload;
    },
    fetchWeatherDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const fetchWeatherData =
  ({ lat, lon }: { lat: string; lon: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchWeatherDataPending());

    try {
      const weatherData = await getCityWeather({ lat: lat, lon: lon });
      dispatch(fetchWeatherDataSuccess(weatherData));
    } catch (error: any) {
      dispatch(fetchWeatherDataFailure(error.message));
    }
  };

export const {
  fetchWeatherDataPending,
  fetchWeatherDataSuccess,
  fetchWeatherDataFailure,
} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
