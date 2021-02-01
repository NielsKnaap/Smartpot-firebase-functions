import * as functions from "firebase-functions";
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const callableGetMoveRobot = functions.https.onCall((data, context) => {
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId).get()
        .then(doc => {
            return doc.get('moveRobot');
        })
        .catch(function (error) {
            return {
                error: "Het ophalen van moveRobot is mislukt"
            };
        });
})

function editMoveRobot( data: any ){
    return FIRESTORE.collection(USERS_COLLECTION).doc(data.userId).collection(PLANTS_COLLECTION).doc(data.plantId).update({

        moveRobot: data.moveRobot
    });
}

export const callableEditMoveRobot = functions.https.onCall((data, context) => {
    editMoveRobot(data).then(function (updatedMoveRobot) {
        return 'Successfully updated moveRobot';
    }).catch(function (error) {
        return 'Error while updating moveRobot: ' + error;
    });
});

export const functionMoveRobot = functions.https.onRequest((request, response ) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId).get()
        .then(function(doc) {

            const minLightIntensity = doc.get('minLightIntensity');
            const maxLightIntensity = doc.get('maxLightIntensity');
            const lightIntensity = request.body.lightIntensity;

            const minTemperature = doc.get('minTemperature');
            const maxTemperature = doc.get('maxTemperature');
            const temperature = request.body.temperature;

            const moveRobot = doc.get('moveRobot');
            let needToMove: boolean;

            if (moveRobot == true) {
                needToMove = calculateMeasurement(
                    minLightIntensity, lightIntensity, maxLightIntensity,
                    minTemperature, temperature, maxTemperature);
            } else {
                needToMove = false;
            }
            response.send(needToMove);

        })
        .catch(function(error) {
            response.send("Error getting document: " + error);
        });
});

function calculateMeasurement(minLi: number, li: number, maxLi: number,
                              minT: number, t: number, maxT: number) {
    return ((li < minLi || li > maxLi) || (t < minT || t > maxT));
}
