import {
    TextField,
    Card,
    CardContent,
    Box,
} from '@mui/material';
import { Diagnosis } from '../../types';
import DiagnosisPicker from './components/DiagnosisPicker';

interface FormErrors {
    [key: string]: string;
}

interface BaseEntryFormProps {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes: string;
    errors: FormErrors;
    allDiagnosisEntries: Diagnosis[];
    onDescriptionChange: (value: string) => void;
    onDateChange: (value: string) => void;
    onSpecialistChange: (value: string) => void;
    onDiagnosisCodesChange: (value: string) => void;
    children?: React.ReactNode; // For type-specific fields
}

export const BaseEntryForm = ({
    description,
    date,
    specialist,
    diagnosisCodes,
    errors,
    allDiagnosisEntries,
    onDescriptionChange,
    onDateChange,
    onSpecialistChange,
    onDiagnosisCodesChange,
    children,
}: BaseEntryFormProps) => {
    return (
        <Card sx={{ maxWidth: 700, margin: '2em auto' }}>
            <CardContent>
                <Box>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        error={!!errors.description}
                        helperText={errors.description}
                        placeholder="Detailed description of the patient's condition or findings"
                    />
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                        fullWidth
                        required
                        error={!!errors.date}
                        helperText={errors.date}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Specialist"
                        value={specialist}
                        onChange={(e) => onSpecialistChange(e.target.value)}
                        fullWidth
                        required
                        error={!!errors.specialist}
                        helperText={errors.specialist || 'Name of the healthcare professional'}
                        placeholder="Dr. John Doe"
                    />
                    <TextField
                        label="Diagnosis Codes (Optional)"
                        value={diagnosisCodes}
                        onChange={(e) => onDiagnosisCodesChange(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Enter codes separated by commas. E.g., J10.1, M79.3"
                    />
                    <DiagnosisPicker 
                        diagnosisDefinitions={allDiagnosisEntries || []}
                        selectedDiagnosisCodes={diagnosisCodes ? diagnosisCodes.split(',').map(code => code.trim()).filter(code => code) : []}
                        onChange={(selectedCodes) => onDiagnosisCodesChange(selectedCodes.join(', '))}
                    />
                    {children}
                </Box>
            </CardContent>
        </Card>
    );
};
