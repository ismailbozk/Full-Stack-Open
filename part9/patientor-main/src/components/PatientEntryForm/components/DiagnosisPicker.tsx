import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Diagnosis } from '../../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface DiagnosisPickerProps {
    diagnosisDefinitions: Diagnosis[];
    selectedDiagnosisCodes: string[];
    onChange: (selectedDiagnosisCodes: string[]) => void;
}

export default function DiagnosisPicker(props: DiagnosisPickerProps): JSX.Element {
    const { diagnosisDefinitions, selectedDiagnosisCodes, onChange } = props;

    const theme = useTheme();
    const [selectedDiagnoses, setSelectedDiagnoses] = React.useState<string[]>(selectedDiagnosisCodes);

    React.useEffect(() => {
        setSelectedDiagnoses(selectedDiagnosisCodes);
    }, [selectedDiagnosisCodes]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const newValue = typeof value === 'string' ? value.split(',') : value;
        setSelectedDiagnoses(newValue);
        onChange(newValue);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Diagnosis</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedDiagnoses}
                    onChange={handleChange}
                    input={<OutlinedInput label="Diagnosis" />}
                    MenuProps={MenuProps}
                >
                    {diagnosisDefinitions.map((diagnosis) => (
                        <MenuItem
                            key={diagnosis.code}
                            value={diagnosis.code}
                            style={getStyles(diagnosis.code, selectedDiagnoses, theme)}
                        >
                            {diagnosis.code} - {diagnosis.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}