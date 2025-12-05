import { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';
import { HealthCheckEntryForm } from './HealthCheckEntryForm';
import { OccupationalHealthcareEntryForm } from './OccupationalHealthcareEntryForm';
import { HospitalEntryForm } from './HospitalEntryForm';

interface PatientEntryFormProps {
    onSubmit: (entry: Entry) => void;
    onCancel?: () => void;
    errorMessage: string | null;
    diagnosisDefinitions: Array<Diagnosis>;
}

type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

function PatientEntryForm({ onSubmit, onCancel, errorMessage, diagnosisDefinitions }: PatientEntryFormProps): JSX.Element {
    const [entryType, setEntryType] = useState<EntryType>('HealthCheck');

    return (
        <Box sx={{ border: '1px solid #ccc', padding: '2em', borderRadius: '8px', marginBottom: '2em' }}>
            <Typography variant="h5" style={{ marginTop: "2em", marginBottom: "0.5em" }}>
                Add New Entry
            </Typography>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <FormControl fullWidth sx={{ marginBottom: '2em', maxWidth: 700, margin: '2em auto 2em auto' }}>
                <InputLabel>Entry Type</InputLabel>
                <Select
                    value={entryType}
                    onChange={(e) => setEntryType(e.target.value as EntryType)}
                    label="Entry Type"
                >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                </Select>
                <FormHelperText>Select the type of medical entry to add</FormHelperText>
            </FormControl>

            {/* Render appropriate form based on type */}
            {entryType === 'HealthCheck' && (
                <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} allDiagnosisEntries={diagnosisDefinitions} />
            )}
            {entryType === 'OccupationalHealthcare' && (
                <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} allDiagnosisEntries={diagnosisDefinitions} />
            )}
            {entryType === 'Hospital' && (
                <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} allDiagnosisEntries={diagnosisDefinitions} />
            )}
        </Box>
    );
}

export default PatientEntryForm;