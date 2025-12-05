import { useState } from 'react';
import {
  Button,
  TextField,
  Stack,
  Box,
} from '@mui/material';
import { Diagnosis, HospitalEntry } from '../../types';
import { BaseEntryForm } from './BaseEntryForm';

interface HospitalEntryFormProps {
  onSubmit: (entry: HospitalEntry) => void;
  onCancel?: () => void;
  allDiagnosisEntries: Diagnosis[];
}

interface FormErrors {
  [key: string]: string;
}

export const HospitalEntryForm = ({ onSubmit, onCancel, allDiagnosisEntries }: HospitalEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    if (!specialist.trim()) newErrors.specialist = 'Specialist is required';
    if (!dischargeDate) newErrors.dischargeDate = 'Discharge date is required';
    if (!dischargeCriteria.trim()) newErrors.dischargeCriteria = 'Discharge criteria is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const entry: HospitalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Hospital',
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
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
    setDischargeDate('');
    setDischargeCriteria('');
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
              <TextField
                label="Discharge Date"
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                fullWidth
                required
                error={!!errors.dischargeDate}
                helperText={errors.dischargeDate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Discharge Criteria"
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
                fullWidth
                required
                error={!!errors.dischargeCriteria}
                helperText={errors.dischargeCriteria || 'Conditions met for discharge'}
                multiline
                rows={3}
                placeholder="E.g., Stable vital signs, pain controlled, able to ambulate"
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
