import diagnoseData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

export const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

