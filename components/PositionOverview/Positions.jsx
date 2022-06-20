import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import PositionCard from 'Components/PositionOverview/PositionCard';
import { countPage } from 'Components/PositionOverview/helpers';
import GroupSkeleton from 'Components/PositionOverview/PositionSkeleton';
import usePagination from '../../hooks/usePagination';

const Positions = ({ loading, error, data }) => {
    const { handleChange, sliceData } = usePagination(data);
    const enumPage = countPage(data);
    
    if (error && !loading)
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                {error}
            </Typography>
        );

    return (
        <Fragment>
            {loading && <GroupSkeleton />}
            {sliceData.length < 1 && !loading && (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                    Geen vacatures gevonden die overeenkomen!
                </Typography>
            )}
            {sliceData?.map((position) => (
                <PositionCard key={position.id} position={position} />
            ))}
            {!!sliceData.length && (
                <Box sx={{ mt: 3, mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={enumPage} shape="rounded" color="primary" onChange={handleChange} />
                </Box>
            )}
        </Fragment>
    );
};

Positions.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            userId: PropTypes.string,
            functie: PropTypes.string,
            refnummer: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.bool,
            typecontract: PropTypes.string,
            daterequest: PropTypes.string,
            skills: PropTypes.arrayOf(PropTypes.string),
            hiringmanager: PropTypes.string,
        }),
    ).isRequired,
};

Positions.defaultProps = {
    error: '',
};

export default Positions;