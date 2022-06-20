import React from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const filter = createFilterOptions();

export const Tags = ({ name, label, control, helperText, options, required }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { invalid, error} }) => (
                <Autocomplete
                    multiple
                    value={value}
                    id={name}
                    onChange={(_, data) => onChange(data)}
                    filterOptions={(test, params) => {
                        const filtered = filter(test, params);
                        // Suggest the creation of a new value
                        const { inputValue } = params;
                        const isExisting = test.some((option) => inputValue === option);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                name: `Voeg de skill "${inputValue}" toe`,
                            });
                        }
                        return filtered;
                    }} 
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={options}
                    defaultValue={value}
                    // renderOption={(props, option) => <li {...props}>{option.name}</li>}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                      // Voeg een "skill" dynamisch toe
                        if (option.inputValue) {
                            return option.name;
                        }
                        // Regular option
                        return option.name;
                    }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label={label}
                            error={invalid}
                            helperText={error && error.message}
                        />
                    )}
                />
            )}
            rules={{
                required: {
                    value: required,
                    message: helperText,
                },
            }}
        />
    );
};

Tags.propTypes = {
    control: PropTypes.shape({}).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    required: PropTypes.bool,
};

Tags.defaultProps = {
    required: false,
    helperText: 'Gelieve de skills/vaardigheden in te voeren.',
};