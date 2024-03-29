import * as user from './user';
import * as plant from './plant';
import * as measurement from './measurement';
import * as admin from "firebase-admin";
import * as robot from "./robot";

export const USERS_COLLECTION = 'users';
export const PLANTS_COLLECTION = 'plants';
export const MEASUREMENTS_COLLECTION = 'measurements';
export const FIRESTORE = admin.firestore();

export const functionAddUser = user.functionAddUser;
export const triggerAddUser = user.triggerAddUser;
export const functionDeleteUser = user.functionDeleteUser;
export const triggerDeleteUser = user.triggerDeleteUser;
export const functionEditUser = user.functionEditUser;
export const addGoogleTokenToUser = user.addGoogleTokenToUser;
export const functionGetUserIdByPlantId = user.functionGetUserIdByPlantId;

export const functionAddPlant = plant.functionAddPlant;
export const callableAddPlant = plant.callableAddPlant;
export const functionEditPlant = plant.functionEditPlant;
export const callableEditPlant = plant.callableEditPlant;
export const functionDeletePlant = plant.functionDeletePlant;
export const callableGetPlant = plant.callableGetPlant;
export const functionGetPlant = plant.functionGetPlant;
export const callableGetPlants = plant.callableGetPlants;
export const functionGetPlants = plant.functionGetPlants;
export const functionGetMeasurementFrequency = plant.functionGetMeasurementFrequency;

export const functionAddMeasurement = measurement.functionAddMeasurement;
export const functionGetMeasurement = measurement.functionGetMeasurement;
export const functionGetLastMeasurement = measurement.functionGetLastMeasurement;
export const callableGetLastMeasurement = measurement.callableGetLastMeasurement;
export const sendNotificationToUser = measurement.sendNotificationToUser;

export const functionMoveRobot = robot.functionMoveRobot;
export const callableGetMoveRobot = robot.callableGetMoveRobot;
export const callableEditMoveRobot = robot.callableEditMoveRobot;
