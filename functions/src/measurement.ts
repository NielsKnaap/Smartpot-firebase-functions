import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const FIRESTORE = admin.firestore();
const USERS_COLLECTION = 'users';
const PLANTS_COLLECTION = 'plants';
const MEASUREMENTS_COLLECTION = 'measurements';

export const functionAddMeasurement = functions.https.onRequest( (request, response) => {
    FIRESTORE
        .collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .collection(MEASUREMENTS_COLLECTION)
        .add({
            temperature: request.body.temperature,
            lightIntensity: request.body.lightIntensity,
            soilMoisture: request.body.soilMoisture,
            timeStamp: new Date().toLocaleString(),
    })
        .then( function (measurement) {
        console.log('Successfully added measurement:', measurement);
        response.send('Successfully added measurement: ' + measurement);
    })
        .catch(function (error) {
            console.log('Error adding measurement:', error);
            response.send('Error adding measurement: ' + error);
        });
});

export const functionGetMeasurement = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .collection(MEASUREMENTS_COLLECTION).get()
        .then(snapshot => {
            response.json(snapshot.docs.map(doc => doc.data()));
        })
        .catch(function (error) {
            response.status(500).send('Error receiving measurement data');
        });
});
