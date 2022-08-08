import { deleteReservation } from './reservationData';
import { getSingleUser } from './userData';
import { deleteProperty, getPropertiesReservations, getSingleProperties } from './userPropertyData';

const viewPropertyDetails = (propertyFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProperties(propertyFirebaseKey), getSingleUser(propertyFirebaseKey)])
    .then(([userObject, userPropertiesArray]) => {
      resolve({ ...userObject, properties: userPropertiesArray });
    }).catch((error) => reject(error));
});

const deletePropertyReservations = (propertyId) => new Promise((resolve, reject) => {
  getPropertiesReservations(propertyId).then((reservationsArray) => {
    const deleteReservationPromises = reservationsArray.map((reservations) => deleteReservation(reservations.firebaseKey));

    Promise.all(deleteReservationPromises).then(() => {
      deleteProperty(propertyId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewPropertyDetails,
  deletePropertyReservations,
};
