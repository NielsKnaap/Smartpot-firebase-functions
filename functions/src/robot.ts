import * as functions from "firebase-functions";
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionMoveRobot = functions.https.onRequest((request, response ) => {
    FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
        .collection(PLANTS_COLLECTION).doc(request.body.plantId).get()
        .then(function(doc) {

            const minLightIntensity = doc.get('minLightIntensity');
            const maxLightIntensity = doc.get('maxLightIntensity');
            const lightIntensity = request.body.lightIntensity;

            const minSoilMoisture = doc.get('minSoilMoisture');
            const maxSoilMoisture = doc.get('maxSoilMoisture');
            const soilMoisture = request.body.soilMoisture;

            const minTemperature = doc.get('minTemperature');
            const maxTemperature = doc.get('maxTemperature');
            const temperature = request.body.temperature;

            const needToMove = calculateMeasurement(
                minLightIntensity, lightIntensity, maxLightIntensity,
                minSoilMoisture, soilMoisture, maxSoilMoisture,
                minTemperature, temperature, maxTemperature);

            response.send(needToMove);

        })
        .catch(function(error) {
            response.send("Error getting document: " + error);
        });
});

function calculateMeasurement(minLi: number, li: number, maxLi: number,
                              minSm: number, sm: number, maxSm: number,
                              minT: number, t: number, maxT: number) {
    return ((li < minLi || li > maxLi) || (sm < minSm || sm > maxSm) || (t < minT || t > maxT));
}
