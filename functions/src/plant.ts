import * as functions from 'firebase-functions';
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionAddPlant = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId).set({
        plantId: request.body.plantId,

        minLightIntensity: request.body.minLightIntensity,
        maxLightIntensity: request.body.maxLightIntensity,

        minSoilMoisture: request.body.minSoilMoisture,
        maxSoilMoisture: request.body.maxSoilMoisture,

        minTemperature: request.body.minTemperature,
        maxTemperature: request.body.maxTemperature
    }).then(function (updatedPlant) {
        response.send('Successfully added plant');
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
});

export const functionEditPlant = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .update({
            minLightIntensity: request.body.minLightIntensity,
            maxLightIntensity: request.body.maxLightIntensity,

            minSoilMoisture: request.body.minSoilMoisture,
            maxSoilMoisture: request.body.maxSoilMoisture,

            minTemperature: request.body.minTemperature,
            maxTemperature: request.body.maxTemperature
        })
        .then(function () {
            response.send('Successfully updated plant');
        })
        .catch(function (error) {
            response.send('Error while updating plant: ' + error);
        });
});

export const functionDeletePlant = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id).delete()
        .then(function () {
            response.send('Successfully deleted plant');
        })
        .catch(function (error) {
            response.send('Error deleting plant: ' + error);
        });
});

export const functionGetPlant = functions.https.onRequest((request, response ) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId).get()
        .then(function(doc) {
            response.send(doc.data());
        })
        .catch(function(error) {
            response.send("Error getting document: " + error);
        });
});
