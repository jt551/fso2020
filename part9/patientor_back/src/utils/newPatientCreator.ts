import { NewPatient, Gender } from "../types";
import { isString, isGender } from "./typeGuards";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const createNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseStringProperty(name),
        dateOfBirth: parseStringProperty(dateOfBirth),
        ssn: parseStringProperty(ssn),
        gender: parseGenderProperty(gender),
        occupation: parseStringProperty(occupation)
    };
    return newEntry;
};

const parseStringProperty = (prop: unknown): string => {
    if(!prop || !isString(prop)){
        throw new Error('Obj. property missing or in invalid format: ' + prop);
    }
    return prop;
};

const parseGenderProperty = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export default createNewPatientEntry;
