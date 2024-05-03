import * as httpRequests from '../../httpClient';
import {
  fetchWeatherData,
  fetchWeatherDataFailure,
  fetchWeatherDataPending,
  fetchWeatherDataSuccess,
  weatherReducer,
} from '../weatherSlice';

jest.mock('../../httpClient');

describe('weatherSlice', () => {
  const initialState = {
    weatherData: null,
    loading: true,
    error: false,
    errorMessage: null,
  };

  test('should successfully set state to "pending"', async () => {
    const action = { type: fetchWeatherDataPending.type };
    const state = weatherReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: false,
      errorMessage: null,
    });
  });

  test('should successfully set state to "success"', async () => {
    const action = {
      type: fetchWeatherDataSuccess.type,
      payload: {
        coord: {
          lon: 10.99,
          lat: 44.34,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
        dt: 1714407218,
        sys: {
          type: 2,
          id: 2004688,
          country: 'EN',
          sunrise: 1714363759,
          sunset: 1714414629,
        },
        timezone: 0,
        id: 1,
        name: 'test',
      },
    };

    const state = weatherReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      weatherData: action.payload,
    });
  });

  test('should successfully set state to "failed"', async () => {
    const action = {
      type: fetchWeatherDataFailure.type,
      payload: 'loading error',
    };

    const state = weatherReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: true,
      errorMessage: action.payload,
    });
  });

  test('should successfully fetch weather data', async () => {
    const dispatch = jest.fn();

    await fetchWeatherData({ lat: '20', lon: '20' })(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('should fail to fetch weather data', async () => {
    jest.spyOn(httpRequests, 'getCityWeather').mockRejectedValue(new Error());
    const dispatch = jest.fn();

    await fetchWeatherData({ lat: '20', lon: '20' })(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
