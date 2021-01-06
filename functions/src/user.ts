import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

admin.initializeApp();
export const FIREBASE_AUTH_USER = functions.auth.user();

export const functionAddUser = functions.https.onRequest( (request, response) => {

    if((request.body.email && request.body.password) != null) {
        admin.auth().createUser({
            email: request.body.email,
            password: request.body.password
        })
            .then(function (userRecord) {
                response.send('Successfully created new user: ' + userRecord.uid);
            })
            .catch(function (error) {
                response.send('Error creating new user: ' + error);
            });
    }
    else {
        response.send('Given variables are null');
    }
});

export const triggerAddUser = FIREBASE_AUTH_USER.onCreate( user => {
    return FIRESTORE.collection('users').doc(user.uid).set({
        email: user.email,
        userId: user.uid
    });
});

export const functionDeleteUser = functions.https.onRequest( (request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).delete()
        .then(function () {
            response.send('Successfully deleted user');
        })
        .catch(function (error) {
            response.send('Error deleting user: ' + error);
        });
});

export const triggerDeleteUser = FIREBASE_AUTH_USER.onDelete( user => {
    const doc = admin.firestore().collection(USERS_COLLECTION).doc(user.uid);
    return doc.delete();
});

export const functionEditUser = functions.https.onRequest( (request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .update(
            {measureFrequency: request.body.measureFrequency}
        )
        .then( function () {
            response.send('Successfully updated user');
        })
        .catch(function (error) {
            console.log('Error updating user:', error);
            response.send('Error updating user: ' + error);
        });
});

export const functionGetUserIdByPlantId = functions.https.onRequest((request, response ) => {
    FIRESTORE.collectionGroup(PLANTS_COLLECTION).where('plantId', '==', request.body.plantId).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.ref.parent.parent);
                response.send(doc.ref.parent.parent?.id);
            });
        });
});
