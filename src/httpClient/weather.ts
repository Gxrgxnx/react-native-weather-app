import { API_KEY } from '@env';
import { HttpStatusCode } from 'axios';
import { instance } from '.';
import { ERROR_MESSAGES } from '../constants';

export const getCityWeather = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  try {
    const res = await instance.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return res.data;
  } catch (error: any) {
    const message = getErrorMessage(error.code);

    throw new Error(message);
  }
};

export const getAllByCityName = async (city: string) => {
  try {
    const res = await instance.get(
      `/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );

    return res.data;
  } catch (error: any) {
    const message = getErrorMessage(error.code);

    throw new Error(message);
  }
};

const getErrorMessage = (errorCode: number) => {
  switch (errorCode) {
    case HttpStatusCode.NotFound:
      return ERROR_MESSAGES.CITY_NOT_FOUND;
    case HttpStatusCode.InternalServerError:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.SOMETHING_WENT_WRONG;
  }
};
