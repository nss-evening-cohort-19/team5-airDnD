import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMessages = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/messages.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteMessages = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/messages/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createMessage = (reservationObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/messages.json`, reservationObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/messages/${response.data.name}.json`, payload).then(resolve);
    })
    .catch(reject);
});

const updateMessage = (reservationObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/messages/${reservationObj.firebaseKey}.json`, reservationObj).then(resolve).catch(reject);
});

export {
  getMessages,
  getSingleMessage,
  deleteMessages,
  createMessage,
  updateMessage,
};
