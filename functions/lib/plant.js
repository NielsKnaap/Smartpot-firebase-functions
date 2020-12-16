"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionDeletePlant = exports.functionEditPlant = exports.functionAddPlant = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const USERS_COLLECTION = 'users';
const PLANTS_COLLECTION = 'plants';
exports.functionAddPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).add({
        active: request.body.active,
        lightIntensity: request.body.lightIntensity,
        soilMoisture: request.body.soilMoisture,
        temperature: request.body.temperature,
    }).then(function (updatedPlant) {
        response.send('Successfully added plant');
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
});
exports.functionEditPlant = functions.https.onRequest((request, response) => {
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
exports.functionDeletePlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id).delete()
        .then(function () {
        response.send('Successfully deleted plant');
    })
        .catch(function (error) {
        response.send('Error deleting plant: ' + error);
    });
});
//# sourceMappingURL=plant.js.map