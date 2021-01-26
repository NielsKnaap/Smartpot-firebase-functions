import * as functions from "firebase-functions";
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

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

            const needToMove = calculateMeasurement(
                minLightIntensity, lightIntensity, maxLightIntensity,
                minTemperature, temperature, maxTemperature);

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
