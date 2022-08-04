import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getReservations = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/reservations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteReservation = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/reservations/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleReservation = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/reservations/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createReservation = (reservationObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/reservations.json`, reservationObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/reservations/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateReservation = (reservationObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/reservations/${reservationObj.firebaseKey}.json`, reservationObj)
    .then(resolve)
    .catch(reject);
});

export {
  getReservations,
  deleteReservation,
  createReservation,
  getSingleReservation,
  updateReservation,
};
