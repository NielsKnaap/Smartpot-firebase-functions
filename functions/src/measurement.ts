import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FIRESTORE, MEASUREMENTS_COLLECTION, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionAddMeasurement = functions.https.onRequest( (request, response) => {
    FIRESTORE
        .collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .collection(MEASUREMENTS_COLLECTION)
        .add({
            temperature: request.body.temperature,
            lightIntensity: request.body.lightIntensity,
            soilMoisture: request.body.soilMoisture,
            timeStamp: admin.firestore.Timestamp.fromDate(new Date()),
    })
        .then( function (measurement) {
        response.send('Successfully added measurement: ' + measurement);
    })
        .catch(function (error) {
            response.send('Error adding measurement: ' + error);
        });
});

export const functionGetMeasurement = functions.https.onRequest((request, response) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
        .collection(MEASUREMENTS_COLLECTION).get()
        .then(snapshot => {
            response.json(snapshot.docs.map(doc => doc.data()));
        })
        .catch(function (error) {
            response.status(500).send('Error receiving measurement data');
        });
});

export const functionGetLastMeasurement = functions.https.onRequest((request, response) => {
    var period = request.body.period ? request.body.period : 7;

    var date = new Date();
    date ;
    date.setDate(date.getDate() - period);

    if(request.body.limit){
        var firestore = FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
            .collection(MEASUREMENTS_COLLECTION).where('timeStamp', '>', date).orderBy('timeStamp').limit(request.body.limit).get();
    } else {
        var firestore = FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId).collection(PLANTS_COLLECTION).doc(request.body.plantId)
            .collection(MEASUREMENTS_COLLECTION).where('timeStamp', '>', date).orderBy('timeStamp').get()
    }

    firestore
        .then(snapshot => {
            response.json(snapshot.docs.map(doc => doc.data()));
        })
        .catch(function (error) {
            response.status(500).send('Error receiving measurement data');
        });
});

export const callableGetLastMeasurement = functions.https.onCall((data, context) => {
    var period = data.period ? data.period : 7;

    var date = new Date();
    date ;
    date.setDate(date.getDate() - period);

    if(data.limit){
        var firestore = FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId)
            .collection(MEASUREMENTS_COLLECTION).where('timeStamp', '>', date).orderBy('timeStamp').limit(data.limit).get();
    } else {
        var firestore = FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId)
            .collection(MEASUREMENTS_COLLECTION).where('timeStamp', '>', date).orderBy('timeStamp').get()
    }

    return firestore
        .then(snapshot => {
            var data = snapshot.docs.map(doc => doc.data());
            console.log(data);
            return data;
        })
        .catch(function (error) {
            return {
                error: "Er ging iets mis met ophalen"
            };
        });
})