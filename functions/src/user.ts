import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();

export const newUserSignup2 = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upvotedOn: []
    });
});
