"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionAddPlant = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const USER_ID = 'k0eHgDhNhhWAb80CK8yKWIWr1zk2';
exports.functionAddPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection('users').doc(USER_ID).collection('plants').add({
        active: true,
        light: 2,
        soil: 1024,
        temperature: 20
    }).then(function (updatedPlant) {
        response.send('Successfully added plant');
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
});
//# sourceMappingURL=plant.js.map