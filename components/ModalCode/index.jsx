import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';

const ModalCode = ({ handleClose, open, onSubmit, loading, error }) => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    // eslint-disable-next-line no-console

    const valueRequired = {
        required: {
            value: true,
            message: 'This field is required',
        },
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: 'center', mt: 2, fontWeight: 600 }}>
                Wat is de status van mijn vacature?
            </DialogTitle>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ gap: '1em', display: 'flex' }}>
                    <TextField
                        label="Referentienummer"
                        {...register('code', valueRequired)}
                        error={!!errors?.code}
                        helperText={errors?.code?.message}
                    />
                    <TextField
                        label="Identificatienummer"
                        {...register('lastname', valueRequired)}
                        error={!!errors?.lastname}
                        helperText={errors?.lastname?.message}
                    />
                </DialogContent>
                {error && (
                    <Typography component="p" color="error" sx={{ px: 2, textAlign: 'center', pb: 1 }}>
                        {error}
                    </Typography>
                )}
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton type="submit" variant="contained" size="large" loading={loading}>
                        Bekijk status
                    </LoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

ModalCode.defaultProps = {
    error: null,
};

ModalCode.propTypes = {
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default ModalCode;