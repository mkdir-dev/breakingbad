import * as constants from '../constants/constants';

const { BASE_URL, headers, fixPromise } = constants;

// eslint-disable-next-line import/prefer-default-export
export const getEpisodes = () => fetch(`${BASE_URL}`, {
  method: 'GET',
  headers: {
    headers,
  },
}).then((res) => fixPromise(res));