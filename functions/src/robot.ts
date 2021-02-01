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

    var httprequest = require('request');

    // @ts-ignore
    httprequest('https://api.openweathermap.org/data/2.5/weather?q=leiden&appid=771d36198df4b0d19287d7d72999386e', function (httperror, httpresponse, body) {
        if (!httperror && httpresponse.statusCode == 200) {
            //Parse json
            const obj = JSON.parse(body)

            const sunrise = obj.sys.sunrise
            const sunset = obj.sys.sunset

            var dateSunset = new Date(sunset * 1000);
            var dateSunrise = new Date(sunrise * 1000);

            var currenttime = new Date();

            if(currenttime > dateSunrise && currenttime < dateSunset) {
                // Time to move
                FIRESTORE.collection(USERS_COLLECTION).doc(request.body.userId)
                    .collection(PLANTS_COLLECTION).doc(request.body.plantId).get()
                    .then(function(doc) {

                        const minLightIntensity = doc.get('minLightIntensity');
                        const maxLightIntensity = doc.get('maxLightIntensity');
                        const lightIntensity = request.body.lightIntensity;

                        const minTemperature = doc.get('minTemperature');
                        const maxTemperature = doc.get('maxTemperature');
                        const temperature = request.body.temperature;

                        let moveRobot = doc.get('moveRobot');

                        if (moveRobot == true) {
                            moveRobot = calculateMeasurement(
                                minLightIntensity, lightIntensity, maxLightIntensity,
                                minTemperature, temperature, maxTemperature);
                        } else {
                            moveRobot = false;
                        }
                        response.send(moveRobot);

                    })
                    .catch(function(error) {
                        response.send("Error getting document: " + error);
                    });
            } else {
                response.send(false);
            }
        } else {
            response.send(false);
        }
    })
});

function calculateMeasurement(minLi: number, li: number, maxLi: number,
                              minT: number, t: number, maxT: number) {
    return ((li < minLi || li > maxLi) || (t < minT || t > maxT));
}
