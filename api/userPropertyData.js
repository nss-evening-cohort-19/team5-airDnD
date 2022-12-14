import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// Get all User Properties

const getAllProperties = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/properties.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// Create a User Property
const createProperties = (propertiesObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/properties.json`, propertiesObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/properties/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

// Update User Property
const updateProperties = (propertiesObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/properties/${propertiesObj.firebaseKey}.json`, propertiesObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// Delete User Property
const deleteProperty = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/properties/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// Get Single property
const getSingleProperties = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/properties/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getPropertiesReservations = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/reservations.json?orderBy="userPropertyId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  createProperties,
  getAllProperties,
  getSingleProperties,
  deleteProperty,
  updateProperties,
  getPropertiesReservations,
};
