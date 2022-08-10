import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// Get all User Properties

const getAllMessages = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// Create a User Property
const createMessage = (messageObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/messages.json`, messageObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/messages/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

// Update User Property
const updateMessage = (messageObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/messages/${messageObj.firebaseKey}.json`, messageObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// Delete User Property
const deleteMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// Get Single property
const getSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  createMessage,
  getAllMessages,
  getSingleMessage,
  deleteMessage,
  updateMessage,
};
