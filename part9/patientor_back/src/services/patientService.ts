/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v4 as uuid} from 'uuid';
import patientData from '../data/patients.json';
import { Patient, NewPatient, FilteredPatientDetails } from '../types';

const patients: Array<Patient> = patientData;

export const getFilteredPatientEntries = (): FilteredPatientDetails [] => {
    const filteredPatientList: FilteredPatientDetails [] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));

    return filteredPatientList;
};

export const addNewPatient = (entry: NewPatient) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = uuid();
    const newPatientEntry: Patient = {
        id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};