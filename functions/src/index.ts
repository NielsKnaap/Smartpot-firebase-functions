import * as user from './user';
import * as plant from './plant';
import * as measurement from './measurement';

export const functionAddUser = user.functionAddUser;
export const triggerAddUser = user.triggerAddUser;
export const functionDeleteUser = user.functionDeleteUser;
export const triggerDeleteUser = user.triggerDeleteUser;
export const functionEditUser = user.functionEditUser;

export const functionAddPlant = plant.functionAddPlant;
export const functionEditPlant = plant.functionEditPlant;
export const functionDeletePlant = plant.functionDeletePlant;

export const functionAddMeasurement = measurement.functionAddMeasurement;
export const functionGetUserIdByPlantId = measurement.functionGetUserIdByPlantId;
export const functionGetMeasurement = measurement.functionGetMeasurement;
