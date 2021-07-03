export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}
export enum Gender {
    Female = 'Female',
    Male = 'Male',    
    Other = 'Other'
}

export type NewPatient = Omit<Patient, 'id'>;

export type FilteredPatientDetails = Omit<Patient, 'ssn'>;