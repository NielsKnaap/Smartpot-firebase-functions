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
        measureFrequency: request.body.measureFrequency
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
        maxTemperature: data.maxTemperature,

        measureFrequency: data.measureFrequency,
        moveRobot: true
    });
}

export const functionEditPlant = functions.https.onRequest((request, response) => {
    var data = {
        userId: request.body.userId,
        plantId: request.body.plantId,

        minLightIntensity: request.body.minLightIntensity,
        maxLightIntensity: request.body.maxLightIntensity,

        minSoilMoisture: request.body.minSoilMoisture,
        maxSoilMoisture: request.body.maxSoilMoisture,

        minTemperature: request.body.minTemperature,
        maxTemperature: request.body.maxTemperature,

        measureFrequency: request.body.measureFrequency
    }
    editPlant(data).then(function (updatedPlant) {
        response.send( 'Successfully updated plant' );
    }).catch(function (error) {
        response.send( 'Error while updating plant: ' + error );
    })
});

function editPlant( data:any ){
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId).update({

        minLightIntensity: data.minLightIntensity,
        maxLightIntensity: data.maxLightIntensity,

        minSoilMoisture: data.minSoilMoisture,
        maxSoilMoisture: data.maxSoilMoisture,

        minTemperature: data.minTemperature,
        maxTemperature: data.maxTemperature,

        measureFrequency: data.measureFrequency
    });
}

export const callableEditPlant = functions.https.onCall((data, context) => {
    editPlant(data).then(function (updatedPlant) {
        return 'Successfully updated plant';
    }).catch(function (error) {
        return 'Error while updating plant: ' + error;
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

export const callableGetPlant = functions.https.onCall((data, context) => {
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId).get()
        .then(doc => {
            return doc.data();
        })
        .catch(function (error) {
            return {
                error: "Het ophalen van de plant is mislukt"
            };
        });
})

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

export const callableGetPlants = functions.https.onCall((data, context) => {
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).get()
        .then(snapshot => {
            let data = snapshot.docs.map(doc => doc.data());
            return data;
        })
        .catch(function (error) {
            return {
                error: "Er ging iets mis met ophalen"
            };
        });
})

export const functionGetPlants = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).get()
        .then(snapshot => {
            response.json( snapshot.docs.map(doc => doc.data()) );
        })
        .catch(function (error) {
            response.status(500).send( 'Error receiving measurement data' );
        });
})

export const functionGetMeasurementFrequency = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId).get()
        .then(function(doc) {
            const measureFrequency: string = (doc.get('measureFrequency') * 1000).toString();
            response.send(measureFrequency);
        })
        .catch(function(error) {
            response.send("Error getting measure frequency: " + error);
        });
})
