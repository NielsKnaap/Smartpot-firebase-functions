"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionEditUser = exports.triggerDeleteUser = exports.functionDeleteUser = exports.triggerAddUser = exports.functionAddUser = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const FIREBASE_AUTH_USER = functions.auth.user();
const FIRESTORE = admin.firestore();
const USERS_COLLECTION = 'users';
exports.functionAddUser = functions.https.onRequest((request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    admin.auth().createUser({
        email: email,
        password: password
    })
        .then(function (userRecord) {
        console.log('Successfully created new user:', userRecord.uid);
        response.send('Successfully created new user: ' + userRecord.uid);
    })
        .catch(function (error) {
        console.log('Error creating new user:', error);
        response.send('Error creating new user: ' + error);
    });
});
exports.triggerAddUser = FIREBASE_AUTH_USER.onCreate(user => {
    return FIRESTORE.collection('users').doc(user.uid).set({
        email: user.email,
        userId: user.uid
    });
});
exports.functionDeleteUser = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).delete()
        .then(function (deletedUser) {
        console.log('Successfully deleted user:', deletedUser);
        response.send('Successfully deleted user: ' + deletedUser);
    })
        .catch(function (error) {
        console.log('Error deleting user:', error);
        response.send('Error deleting user: ' + error);
    });
});
exports.triggerDeleteUser = FIREBASE_AUTH_USER.onDelete(user => {
    const doc = admin.firestore().collection(USERS_COLLECTION).doc(user.uid);
    return doc.delete();
});
exports.functionEditUser = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .update({ measureFrequency: request.body.measureFrequency })
        .then(function (updatedUser) {
        console.log('Successfully updated user:', updatedUser);
        response.send('Successfully updated user: ' + updatedUser);
    })
        .catch(function (error) {
        console.log('Error updating user:', error);
        response.send('Error updating user: ' + error);
    });
});
//# sourceMappingURL=user.js.map