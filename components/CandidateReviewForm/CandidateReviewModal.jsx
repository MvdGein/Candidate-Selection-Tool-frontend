import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Modal,
    RadioGroup,
    Radio,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import { DateInput } from '../../controls/DateInput';

// import { TermsMessage } from '../TermsMessage';

import { useMediaQueryContext } from '../../context/MediaQueryContext';

const boxStyles = (isMobile) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile.medium ? '75%' : '65%',
    height: '75%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    textAlign: isMobile.medium ? 'center' : 'unset',
});

const StyledGrid = styled(Grid)`
    @media (max-width: 900px) {
        margin: 15px 0;

        div {
            margin: 3px;
        }

        .MuiFormControlLabel-label {
            font-size: 15px;
        }
    }
`;

const subtitleStyles = {
    fontSize: 18,
    marginBottom: '10px',
    lineHeight: '30px',
};

const CandidateReviewForm = ({ open, handleClose, handleValidate, modalError, review, handleInput }) => {
    const isMobile = useMediaQueryContext();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleValidate}>
                <Box sx={boxStyles(isMobile)}>
                    <Typography variant="h1" align="center" sx={{ fontSize: 28 }}>
                        Evalueer de kandidaat
                    </Typography>
                    <Grid container marginTop={5}>
                        <Grid item md={12} xs={12} marginBottom="20px">
                            <Typography variant="subtitle1" sx={subtitleStyles}>
                                Functie
                            </Typography>
                            <FormControl sx={{ width: '100%' }} required>
                                <OutlinedInput
                                    id="job_title"
                                    name="job_title"
                                    placeholder="Functie"
                                    value={review.job_title}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12} marginBottom="20px">
                            <Typography variant="subtitle1" sx={subtitleStyles}>
                                Uw e-mail
                            </Typography>
                            <FormControl sx={{ width: '100%' }} required>
                                <OutlinedInput
                                    id="employee_email"
                                    name="employee_email"
                                    placeholder="Uw email"
                                    value={review.employee_email}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12} marginBottom="20px">
                            <Typography variant="subtitle1" sx={subtitleStyles}>
                                Content
                            </Typography>
                            <FormControl sx={{ width: '100%' }} required>
                                <OutlinedInput
                                    id="content_type"
                                    name="content_type"
                                    placeholder="Content"
                                    value={review.content_type}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Typography variant="h1" align="center" sx={subtitleStyles}>
                        Hoe zou u de volgende categorieën evalueren voor deze kandidaat?
                    </Typography>
                    <Grid marginTop={3} marginBottom={3}>
                        <StyledGrid container sx={{ alignItems: 'center' }}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography variant="subtitle1" sx={subtitleStyles}>
                                    Ambitieaansluiting
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        id="ambition_rating"
                                        data-testid="ambition_rating"
                                        name="ambition_rating"
                                        row
                                        value={review.ambition_rating}
                                        onChange={handleInput}
                                    >
                                        <FormControlLabel value="Good" control={<Radio />} label="Goed" />
                                        <FormControlLabel value="Regular" control={<Radio />} label="Gemiddeld" />
                                        <FormControlLabel value="Bad" control={<Radio />} label="Matig" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </StyledGrid>
                        <StyledGrid container sx={{ alignItems: 'center' }}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography variant="subtitle1" sx={subtitleStyles}>
                                    Managementaansluiting
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        id="management_capability_rating"
                                        data-testid="management_capability_rating"
                                        name="management_capability_rating"
                                        row
                                        value={review.management_capability_rating}
                                        onChange={handleInput}
                                    >
                                        <FormControlLabel value="Good" control={<Radio />} label="Goed" />
                                        <FormControlLabel value="Regular" control={<Radio />} label="Gemiddeld" />
                                        <FormControlLabel value="Bad" control={<Radio />} label="Matig" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </StyledGrid>
                        <StyledGrid container sx={{ alignItems: 'center' }}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography variant="subtitle1" sx={subtitleStyles}>
                                    Carrièreontwikkeling
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        id="career_development_rating"
                                        data-testid="career_development_rating"
                                        name="career_development_rating"
                                        row
                                        value={review.career_development_rating}
                                        onChange={handleInput}
                                    >
                                        <FormControlLabel value="Good" control={<Radio />} label="Goed" />
                                        <FormControlLabel value="Regular" control={<Radio />} label="Gemiddeld" />
                                        <FormControlLabel value="Bad" control={<Radio />} label="Matig" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </StyledGrid>
                        <StyledGrid container sx={{ alignItems: 'center' }}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography variant="subtitle1" sx={subtitleStyles}>
                                    Skillaansluiting
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        id="skill_capability_rating"
                                        data-testid="skill_capability_rating"
                                        name="skill_capability_rating"
                                        row
                                        value={review.skill_capability_rating}
                                        onChange={handleInput}
                                    >
                                        <FormControlLabel value="Good" control={<Radio />} label="Goed" />
                                        <FormControlLabel value="Regular" control={<Radio />} label="Gemiddeld" />
                                        <FormControlLabel value="Bad" control={<Radio />} label="Matig" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </StyledGrid>
                    </Grid>
                    {modalError && <Alert severity="error">{modalError}</Alert>}
                    <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Grid item md={2} xs={4} onClick={handleClose}>
                            <Button variant="outlined">Cancel</Button>
                        </Grid>
                        <Grid item md={2} xs={4}>
                            <Button variant="contained" type="submit">
                                Verzend
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Modal>
    );
};

CandidateReviewForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    modalError: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    review: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired,
    // handleCheck: PropTypes.func.isRequired,
};

export default CandidateReviewForm;
