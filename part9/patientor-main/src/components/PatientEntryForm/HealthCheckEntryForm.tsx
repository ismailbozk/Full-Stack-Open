import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
import { HealthCheckRating, HealthCheckEntry, Diagnosis } from '../../types';
import { BaseEntryForm } from './BaseEntryForm';

interface HealthCheckEntryFormProps {
  onSubmit: (entry: HealthCheckEntry) => void;
  onCancel?: () => void;
  allDiagnosisEntries: Diagnosis[];
}

interface FormErrors {
  [key: string]: string;
}

export const HealthCheckEntryForm = ({ onSubmit, onCancel, allDiagnosisEntries }: HealthCheckEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    if (!specialist.trim()) newErrors.specialist = 'Specialist is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const entry: HealthCheckEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
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
    setHealthCheckRating(HealthCheckRating.Healthy);
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
        allDiagnosisEntries={allDiagnosisEntries}
        onDescriptionChange={setDescription}
        onDateChange={setDate}
        onSpecialistChange={setSpecialist}
        onDiagnosisCodesChange={setDiagnosisCodes}
      >
        <Box>
          <FormControl fullWidth sx={{ marginBottom: '2em' }}>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
              label="Health Check Rating"
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
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
