import * as functions from 'firebase-functions';
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionAddPlant = functions.https.onRequest((request, response) => {
    var data = {
        plantId: request.body.plantId,
        userId: request.body.userId,
        minLightIntensity: request.body.minLightIntensity,
        maxLightIntensity: request.body.maxLightIntensity,
        minSoilMoisture: request.body.minSoilMoisture,
        maxSoilMoisture: request.body.maxSoilMoisture,
        minTemperature: request.body.minTemperature,
        maxTemperature: request.body.maxTemperature,
    }
    addPlant(data).then(function (updatedPlant) {
        response.send( 'Successfully added plant' );
    }).catch(function (error) {
        response.send( 'Error while adding plant: ' + error );
    })

});

export const callableAddPlant = functions.https.onCall((data, context) => {
    addPlant(data).then(function (updatedPlant) {
        return 'Successfully added plant';
    }).catch(function (error) {
        return 'Error while adding plant: ' + error;
    })
})

function addPlant( data:any ){
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId).set({
        plantId: data.plantId,

        minLightIntensity: data.minLightIntensity,
        maxLightIntensity: data.maxLightIntensity,

        minSoilMoisture: data.minSoilMoisture,
        maxSoilMoisture: data.maxSoilMoisture,

        minTemperature: data.minTemperature,
        maxTemperature: data.maxTemperature
    });
}

export const functionEditPlant = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .update({
            minLightIntensity: request.body.minLightIntensity,
            maxLightIntensity: request.body.maxLightIntensity,

            minSoilMoisture: request.body.minSoilMoisture,
            maxSoilMoisture: request.body.maxSoilMoisture,

            minTemperature: request.body.minTemperature,
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
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.id).delete()
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
