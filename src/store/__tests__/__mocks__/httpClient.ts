jest.mock('../../httpClient', () => ({
  ...jest.requireActual('../../httpClient'),
  getCityWeather: jest.fn().mockResolvedValue({
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
  }),
}));
