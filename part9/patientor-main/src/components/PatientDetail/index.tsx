import { Typography, Button } from '@mui/material';
import { Diagnosis, Entry, PatientDetail } from '../../types';
import service from '../../services/patients';
import { useEffect, useState } from 'react';
import { PatientHospitalEntry, PatientHealthCheckEntry, PatientOccupationalHealthcareEntry } from './DiagnosisEntries';
import PatientEntryForm from '../PatientEntryForm';

export interface PatientDetailPageProps {
    patientId: string;
}

function PatientDetailPage(props: PatientDetailPageProps) {

    const [patientDetail, setPatientDetail] = useState<PatientDetail | null>(null);
    const [diagnosisDefinitions, setDiagnosisDefinitions] = useState<Diagnosis[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [showAddEntryForm, setShowAddEntryForm] = useState<boolean>(false);

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

    function renderEntryComponent(entry: Entry): JSX.Element {
        switch (entry.type) {
            case "HealthCheck":
                return <PatientHealthCheckEntry entry={entry} diagnosisDefinitions={diagnosisDefinitions} />;
            case "OccupationalHealthcare":
                return <PatientOccupationalHealthcareEntry entry={entry} diagnosisDefinitions={diagnosisDefinitions} />;
            case "Hospital":
                return <PatientHospitalEntry entry={entry} diagnosisDefinitions={diagnosisDefinitions} />;
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

    const showMessage = (message: string | null) => {
        if (!message) {
            return;
        }

        setTimeout(() => {
            setMessage(message);
        }, 5000);
    };

    const handleAddEntry = async (entry: Entry) => {
        console.log("Entry submitted:", entry);

        try {
            const newEntry = await service.addEntry(props.patientId, entry);
            if (patientDetail) {
                setPatientDetail({
                    ...patientDetail,
                    entries: [...patientDetail.entries, newEntry]
                });
            }
        } catch (error) {
            showMessage("Failed to add entry");
            console.error("Failed to add entry", error);
            return;
        }
    };

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
            {
                showAddEntryForm
                    ?
                    <PatientEntryForm
                        onSubmit={handleAddEntry}
                        onCancel={() => setShowAddEntryForm(false)}
                        errorMessage={message}
                        diagnosisDefinitions={diagnosisDefinitions}
                    />
                    :
                    <Button variant="contained" onClick={() => setShowAddEntryForm(true)}>
                        Add New Entry
                    </Button>
            }
            <PatientDetailEntries />
            
        </>
    );
}

export default PatientDetailPage;