import { ERROR_MESSAGES } from '../../constants';
import { getAllByCityName, getCityWeather } from '../weather';
('..');

jest.mock('../../httpClient', () => ({
  ...jest.requireActual('../../httpClient'),
}));

describe('Weather API requests', () => {
  test('should be able to successfully city weather', async () => {
    const expectedResult = {
      base: expect.anything(),
      clouds: expect.anything(),
      cod: expect.anything(),
      coord: { lat: 44.34, lon: 10.99 },
      dt: expect.anything(),
      id: expect.anything(),
      main: expect.anything(),
      name: expect.anything(),
      sys: expect.anything(),
      timezone: expect.anything(),
      visibility: expect.anything(),
      weather: expect.anything(),
      wind: expect.anything(),
    };

    const result = await getCityWeather({ lat: '44.34', lon: '10.99' });

    expect(result).toEqual(expectedResult);
  });

  test('should fail to get city weather', async () => {
    await getCityWeather({ lat: 'true', lon: '20' }).catch((e) => {
      expect(e.message).toEqual(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    });
  });

  test('should successfuly get all cities by name', async () => {
    const result = await getAllByCityName('city name');

    expect(result).toEqual([]);
  });

  test('should fail to get all cities by name', async () => {
    await getAllByCityName('test').catch((e) => {
      expect(e.message).toEqual(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    });
  });
});
