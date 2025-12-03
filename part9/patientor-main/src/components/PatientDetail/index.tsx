import { Typography } from '@mui/material';
import { PatientDetail } from '../../types';
import service from '../../services/patients';
import { useEffect, useState } from 'react';

export interface PatientDetailPageProps {
    patientId: string;
}

function PatientDetailPage(props: PatientDetailPageProps) {

    const [patientDetail, setPatientDetail] = useState<PatientDetail | null>(null);

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

    function PatientDetailEntries(): JSX.Element {
        if (!patientDetail) {
            return <></>;
        }

        return (
            patientDetail.entries.length === 0 ? (
                <Typography variant="body1">No entries available.</Typography>
            ) : (
                <>
                    {patientDetail.entries.map((entry) => (
                        <div key={entry.id} style={{ marginBottom: "1em", padding: "1em", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <Typography variant="h6">{entry.date} - {entry.type}</Typography>
                            <Typography variant="body2">{entry.description}</Typography>
                            <Typography variant="caption">Specialist: {entry.specialist}</Typography>
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