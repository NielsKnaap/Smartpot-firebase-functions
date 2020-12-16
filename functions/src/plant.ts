import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const USER_ID = 'k0eHgDhNhhWAb80CK8yKWIWr1zk2';

export const functionAddPlant = functions.https.onCall((data, context) => {
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
})
