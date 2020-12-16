"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionAddPlant = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const USER_ID = 'k0eHgDhNhhWAb80CK8yKWIWr1zk2';
exports.functionAddPlant = functions.https.onCall((data, context) => {
    // if(!context.auth){
    //     throw new functions.https.HttpsError(
    //         'unauthenticated',
    //         'You are not authenticated'
    //     );
    // }
    return admin.firestore().collection('users').doc(USER_ID).collection('plants').add({
        active: true,
        light: 2,
        soil: 1024,
        temperature: 20
    });
});
//# sourceMappingURL=plant.js.map