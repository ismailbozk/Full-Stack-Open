import { useState } from 'react';
import {
    Button,
    TextField,
    Stack,
    Box,
} from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import { BaseEntryForm } from './BaseEntryForm';

interface OccupationalHealthcareEntryFormProps {
    onSubmit: (entry: OccupationalHealthcareEntry) => void;
    onCancel?: () => void;
}

interface FormErrors {
    [key: string]: string;
}

export const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: OccupationalHealthcareEntryFormProps) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!description.trim()) newErrors.description = 'Description is required';
        if (!date) newErrors.date = 'Date is required';
        if (!specialist.trim()) newErrors.specialist = 'Specialist is required';
        if (!employerName.trim()) newErrors.employerName = 'Employer name is required';
        if (sickLeaveStart && !sickLeaveEnd) newErrors.sickLeaveEnd = 'End date is required if start date is provided';
        if (sickLeaveEnd && !sickLeaveStart) newErrors.sickLeaveStart = 'Start date is required if end date is provided';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const entry: OccupationalHealthcareEntry = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'OccupationalHealthcare',
            description,
            date,
            specialist,
            employerName,
            sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',').map(code => code.trim()).filter(code => code) : undefined,
        };

        onSubmit(entry);
        resetForm();
    };

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes('');
        setEmployerName('');
        setSickLeaveStart('');
        setSickLeaveEnd('');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <BaseEntryForm
                description={description}
                date={date}
                specialist={specialist}
                diagnosisCodes={diagnosisCodes}
                errors={errors}
                onDescriptionChange={setDescription}
                onDateChange={setDate}
                onSpecialistChange={setSpecialist}
                onDiagnosisCodesChange={setDiagnosisCodes}
            >
                <Box>
                    <TextField
                        label="Employer Name"
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                        fullWidth
                        required
                        error={!!errors.employerName}
                        helperText={errors.employerName || 'Name of the employer'}
                        placeholder="Acme Corporation"
                    />

                    <TextField
                        label="Sick Leave Start Date"
                        type="date"
                        value={sickLeaveStart}
                        onChange={(e) => setSickLeaveStart(e.target.value)}
                        fullWidth
                        error={!!errors.sickLeaveStart}
                        helperText={errors.sickLeaveStart}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Sick Leave End Date"
                        type="date"
                        value={sickLeaveEnd}
                        onChange={(e) => setSickLeaveEnd(e.target.value)}
                        fullWidth
                        error={!!errors.sickLeaveEnd}
                        helperText={errors.sickLeaveEnd}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    {onCancel && (
                        <Button onClick={onCancel} variant="outlined" color="inherit">
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" variant="contained" color="primary" size="large">
                        Add Entry
                    </Button>
                </Stack>
            </BaseEntryForm>
        </form>
    );
};
