import { Typography } from '@mui/material';
import { Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, Diagnosis } from '../../types';

function DiagnosisEntries(props: { entry: Entry, diagnosisDefinitions: Diagnosis[] }): JSX.Element {
    const { entry, diagnosisDefinitions } = props;
    if ((entry.diagnosisCodes ?? [])?.length === 0) {
        return <></>;
    }

    if (diagnosisDefinitions.length > 0) {
        return (
            <ul>
                {entry.diagnosisCodes?.map(code => {
                    const diagnosis = diagnosisDefinitions.find(d => d.code === code);
                    return (
                        <li key={code}>
                            {code} {diagnosis ? diagnosis.name : ''}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <>
            {(entry.diagnosisCodes ?? []).length > 0 ? (
                <ul>
                    {(entry.diagnosisCodes ?? []).map(code => (
                        <li key={code}>{code}</li>
                    ))}
                </ul>
            ) : (
                <Typography variant="caption">None</Typography>
            )}
        </>
    );
}

function PatientHealthCheckEntry(props: { entry: HealthCheckEntry, diagnosisDefinitions: Diagnosis[] }): JSX.Element {
    const { entry, diagnosisDefinitions } = props;
    return (
        <div>
            <Typography variant="body1">Health Check Entry on {entry.date}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
            <DiagnosisEntries entry={entry} diagnosisDefinitions={diagnosisDefinitions} />
            <Typography variant="caption">Health Rating: {entry.healthCheckRating}</Typography>
            <Typography variant="body2">Diagnosed by {entry.specialist}</Typography>

        </div>
    );
}

function PatientOccupationalHealthcareEntry(props: { entry: OccupationalHealthcareEntry, diagnosisDefinitions: Diagnosis[] }): JSX.Element {
    const { entry, diagnosisDefinitions } = props;
    return (
        <div>
            <Typography variant="body1">Occupational Healthcare Entry on {entry.date}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
            <DiagnosisEntries entry={entry} diagnosisDefinitions={diagnosisDefinitions} />
            <Typography variant="caption">Employer: {entry.employerName}</Typography>
            <Typography variant="body1">Sick Leave: {entry.sickLeave ? `${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}` : 'N/A'}</Typography>
            <Typography variant="body2">Diagnosed by {entry.specialist}</Typography>

        </div>
    );
}

function PatientHospitalEntry(props: { entry: HospitalEntry, diagnosisDefinitions: Diagnosis[] }): JSX.Element {
    const { entry, diagnosisDefinitions } = props;
    return (
        <div>
            <Typography variant="h6">Diagnosed by {entry.specialist}</Typography>
            <Typography variant="body1">Hospital Entry on {entry.date}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
            <DiagnosisEntries entry={entry} diagnosisDefinitions={diagnosisDefinitions} />
            <Typography variant="caption">Discharge Date: {entry.discharge.date}</Typography>
            <Typography variant="body2">Discharge Criteria: {entry.discharge.criteria}</Typography>
            <Typography variant="body2">Diagnosed by {entry.specialist}</Typography>

        </div>
    );
}

export {
    DiagnosisEntries,
    PatientHealthCheckEntry,
    PatientOccupationalHealthcareEntry,
    PatientHospitalEntry
};