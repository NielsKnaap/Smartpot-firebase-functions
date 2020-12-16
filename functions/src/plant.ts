import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const USER_ID = 'k0eHgDhNhhWAb80CK8yKWIWr1zk2';

export const functionAddPlant = functions.https.onRequest((request, response) => {
    admin.firestore().collection('users').doc(USER_ID).collection('plants').add({
        active: true,
        light: 2,
        soil: 1024,
        temperature: 20
    }).then( function (updatedPlant) {
        response.send('Successfully added plant');
    }).catch(function (error) {
        response.send('Error while adding plant: ' + error);
    });
})
