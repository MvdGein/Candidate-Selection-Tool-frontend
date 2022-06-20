import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Pagination, Stack } from '@mui/material';
import { FilterRemarks } from 'Components/FilterRemarks';
import { SideDetails } from '../SideDetails';
import { ReviewCard } from '../ReviewCard';

import { sortName } from '../../utils';
import api from '../../services/api';
// import config from '../../config';

const Reviews = ({ info, handleReload, reload }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [data, setData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState({ sortKey: 'created_at', orientation: 'ASC' });
    const [filterValue, setFilterValue] = useState('job_title');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSortCriteria = (sortKey) => {
        const orientation =
            sortCriteria.sortKey === sortKey ? (sortCriteria.orientation === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        setSortCriteria({ sortKey, orientation });
    };

    const handleQueries = () => {
        const sortQuery = `&${sortName(sortCriteria.sortKey).toLowerCase()}=${sortCriteria.orientation}`;
        const filterQuery = `&${filterValue}=${searchQuery}`;
        let queries = sortQuery;
        if (searchQuery.length > 0) queries += filterQuery;

        return queries;
    };

    useEffect(() => {
        api.candidateEvaluations
            .listReviews(info.candidate_information.id, page, handleQueries())
            .then((response) => response.json())
            .then((result) => {
                setIsLoaded(true);
                setData(result.items || []);
                setReviewsCount(result.total || 0);
            })
            .catch((e) => {
                setIsLoaded(true);
                setError(e);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sortCriteria, searchQuery, reload]);

    const handlePage = (e, v) => {
        setIsLoaded(false);
        setPage(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (query, attribute) => {
        setFilterValue(attribute);
        setSearchQuery(query);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <FilterRemarks
                reviewsQuantity={data.length}
                reviewsCount={reviewsCount}
                handleSearch={handleSearch}
                sortCriteria={sortCriteria}
                toggleSortCriteria={toggleSortCriteria}
            />
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 25rem), 1fr))',
                    p: 1,
                    my: 2,
                }}
            >
                {data.map((review) => (
                    <ReviewCard key={review.id} review={review} handleReload={handleReload} />
                ))}
            </Box>
            <SideDetails info={info} />
            <Box
                sx={{
                    mb: 3,
                    display: 'grid',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={2}>
                    <Pagination
                        color="secondary"
                        count={Math.ceil(reviewsCount / 10)}
                        disabled={Math.ceil(reviewsCount / 10) < 1}
                        page={page}
                        onChange={handlePage}
                    />
                </Stack>
            </Box>
        </Fragment>
    );
};

Reviews.propTypes = {
    info: PropTypes.shape({
        candidate_information: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            linkedin_url: PropTypes.string,
            country: PropTypes.string.isRequired,
            job_title: PropTypes.string,
        }).isRequired,
        candidate_rating: PropTypes.number.isRequired,
        total_evaluations: PropTypes.number.isRequired,
        gral_ambition_rating: PropTypes.number.isRequired,
        gral_management_capability_rating: PropTypes.number.isRequired,
        gral_career_development_rating: PropTypes.number.isRequired,
        gral_skill_capability_rating: PropTypes.number.isRequired,
    }).isRequired,
    handleReload: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired,
};

export default Reviews;
