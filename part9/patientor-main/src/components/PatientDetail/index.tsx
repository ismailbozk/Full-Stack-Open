import { Typography } from '@mui/material';
import { Diagnosis, Entry, PatientDetail, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../../types';
import service from '../../services/patients';
import { useEffect, useState } from 'react';

export interface PatientDetailPageProps {
    patientId: string;
}

function PatientDetailPage(props: PatientDetailPageProps) {

    const [patientDetail, setPatientDetail] = useState<PatientDetail | null>(null);
    const [diagnosisDefinitions, setDiagnosisDefinitions] = useState<Diagnosis[]>([]);
    useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                const detail = await service.getPatientById(props.patientId);
                setPatientDetail(detail);
                // Assuming you have a way to set the fetched patient detail in state
                // setPatientDetail(detail);
            } catch (error) {
                console.error("Failed to fetch patient detail", error);
            }
        };
        void fetchPatientDetail();
    }, [props.patientId]);

    useEffect(() => {
        const fetchDiagnosisCodes = async () => {
            try {
                const codes = await service.getAllDiagnosisCodes();
                setDiagnosisDefinitions(codes);
            } catch (error) {
                console.error("Failed to fetch diagnosis codes", error);
            }
        };
        void fetchDiagnosisCodes();
    }, []);

    /**
 * Helper function for exhaustive type checking
 */
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    function DiagnosisEntries(props: { entry: Entry }): JSX.Element {
        const { entry } = props;
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

    function PatientHealthCheckEntry(props: { entry: HealthCheckEntry }): JSX.Element {
        const { entry } = props;
        return (
            <div>
                <Typography variant="body1">Health Check Entry on {entry.date}</Typography>
                <Typography variant="body2">{entry.description}</Typography>
                <DiagnosisEntries entry={entry} />
                <Typography variant="caption">Health Rating: {entry.healthCheckRating}</Typography>
            </div>
        );
    }

    function PatientOccupationalHealthcareEntry(props: { entry: OccupationalHealthcareEntry }): JSX.Element {
        const { entry } = props;
        return (
            <div>
                <Typography variant="body1">Occupational Healthcare Entry on {entry.date}</Typography>
                <Typography variant="body2">{entry.description}</Typography>
                <DiagnosisEntries entry={entry} />
                <Typography variant="caption">Employer: {entry.employerName}</Typography>
                <Typography variant="body2">Sick Leave: {entry.sickLeave ? `${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}` : 'N/A'}</Typography>

            </div>
        );
    }

    function PatientHospitalEntry(props: { entry: HospitalEntry }): JSX.Element {
        const { entry } = props;
        return (
            <div>
                <Typography variant="body1">Hospital Entry on {entry.date}</Typography>
                <Typography variant="body2">{entry.description}</Typography>
                <DiagnosisEntries entry={entry} />
                <Typography variant="caption">Discharge Date: {entry.discharge.date}</Typography>
                <Typography variant="body2">Discharge Criteria: {entry.discharge.criteria}</Typography>
            </div>
        );
    }

    function renderEntryComponent(entry: Entry): JSX.Element {
        switch (entry.type) {
            case "HealthCheck":
                return <PatientHealthCheckEntry entry={entry} />;
            case "OccupationalHealthcare":
                return <PatientOccupationalHealthcareEntry entry={entry} />;
            case "Hospital":
                return <PatientHospitalEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    }

    function PatientDetailEntries(): JSX.Element {
        if (!patientDetail) {
            return <></>;
        }

        return (
            patientDetail.entries.length === 0 ? (
                <Typography variant="body1">No entries available.</Typography>
            ) : (
                <>
                    {patientDetail.entries.map(entry => (
                        <div key={entry.id} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em', borderRadius: '5px' }}>
                            {renderEntryComponent(entry)}
                        </div>
                    ))}
                </>
            )
        );
    }

    if (!patientDetail) {
        return <Typography>Loading patient details...</Typography>;
    }

    return (
        <>
            <Typography variant="h4">
                name: {patientDetail.name}
            </Typography>
            <Typography variant="body1">
                gender: {patientDetail.gender}
            </Typography>
            <Typography variant="body1">
                ssn: {patientDetail.ssn}
            </Typography>
            <Typography variant="body1">
                occupation: {patientDetail.occupation}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "1em", marginBottom: "0.5em" }}>
                Entries
            </Typography>
            <PatientDetailEntries />
        </>
    );
}

export default PatientDetailPage;