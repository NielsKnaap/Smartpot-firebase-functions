import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionAddPlant = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).add({
        plantId: request.body.plantId,

        minLightIntensity: request.body.minLightIntensity,
        bestLightIntensity: request.body.bestLightIntensity,
        maxLightIntensity: request.body.maxLightIntensity,

        minSoilMoisture: request.body.minSoilMoisture,
        bestSoilMoisture: request.body.bestSoilMoisture,
        maxSoilMoisture: request.body.maxSoilMoisture,

        minTemperature: request.body.minTemperature,
        bestTemperature: request.body.bestTemperature,
        maxTemperature: request.body.maxTemperature
    }).then(function (updatedPlant) {
        response.send('Successfully added plant' + updatedPlant);
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
});

export const functionEditPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id)
        .update({
            minLightIntensity: request.body.minLightIntensity,
            bestLightIntensity: request.body.bestLightIntensity,
            maxLightIntensity: request.body.maxLightIntensity,

            minSoilMoisture: request.body.minSoilMoisture,
            bestSoilMoisture: request.body.bestSoilMoisture,
            maxSoilMoisture: request.body.maxSoilMoisture,

            minTemperature: request.body.minTemperature,
            bestTemperature: request.body.bestTemperature,
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
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id).delete()
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
