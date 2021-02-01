import * as functions from "firebase-functions";
import {FIRESTORE, PLANTS_COLLECTION, USERS_COLLECTION} from "./index";

export const functionMoveRobot = functions.https.onRequest((request, response ) => {

    var httprequest = require('request');

    // @ts-ignore
    httprequest('https://api.openweathermap.org/data/2.5/weather?q=bergschenhoek&appid=771d36198df4b0d19287d7d72999386e', function (httperror, httpresponse, body) {
        if (!httperror && httpresponse.statusCode == 200) {
            //Parse json
            const obj = JSON.parse(body)

            const sunrise = obj.sys.sunrise
            const sunset = obj.sys.sunset

            var dateSunset = new Date(sunset * 1000);
            var dateSunrise = new Date(sunrise * 1000);

            var currenttime = new Date();

            if(currenttime > dateSunrise && currenttime < dateSunset){
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

                        const needToMove = calculateMeasurement(
                            minLightIntensity, lightIntensity, maxLightIntensity,
                            minTemperature, temperature, maxTemperature);

                        response.send(needToMove);

                    })
                    .catch(function(error) {
                        response.send("Error getting document: " + error);
                    });
            } else {
                response.send(false);
            }
        }
    })
});

function calculateMeasurement(minLi: number, li: number, maxLi: number,
                              minT: number, t: number, maxT: number) {
    return ((li < minLi || li > maxLi) || (t < minT || t > maxT));
}
