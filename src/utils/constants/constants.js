export const BASE_URL = 'https://breakingbadapi.com/api/episodes';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const fixPromise = (res) => (
  res.ok ? res.json()
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject(`Произошла ошибка ${res.status}: ${res.statusText}`)
);
