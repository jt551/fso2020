import patientData from '../data/patients.json';
import { Patient, FilteredPatientDetails } from '../types';

const patients: Array<Patient> = patientData;

export const getFilteredPatientEntries = (): FilteredPatientDetails [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};