import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const USERS_COLLECTION = 'users';
const PLANTS_COLLECTION = 'plants';

export const functionAddPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).add({
        active: request.body.active,
        plantId: request.body.plantId,
        lightIntensity: request.body.lightIntensity,
        soilMoisture: request.body.soilMoisture,
        temperature: request.body.temperature,
    }).then(function (updatedPlant) {
        response.send('Successfully added plant');
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
});

export const functionEditPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id)
        .update({
            active: request.body.active,
            lightIntensity: request.body.lightIntensity,
            soilMoisture: request.body.soilMoisture,
            temperature: request.body.temperature,
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
