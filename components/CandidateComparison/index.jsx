import React, { Fragment, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { TableFooter, TablePagination } from '@mui/material';
import { LoadingTable } from 'Components/Commons/TableSkeleton';
import { StyledTableRow, StyledTableCell } from '../StyleTable';
import { TablePaginationActions } from '../PaginateTable';

export const CandidateComparison = ({ candidates }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Fragment>
            <Typography variant="h2" sx={{ mb: 2}}>
                Matchresultaten
            </Typography>
            <TableContainer component={Paper} elevation={3} sx={{ px: 2, pb: 4, mb: 2, width: 'auto' }}>
                {candidates.message && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 100,
                        }}
                    >
                        <Typography variant="h3">{candidates.message}</Typography>
                    </Box>
                )}
                {candidates.length > 0 && (
                    <Table aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="center">Naam</StyledTableCell>
                                <StyledTableCell align="center">CV</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Aangemeld op</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((candidate) => (
                                <StyledTableRow
                                    key={candidate.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {candidate.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{candidate.name}</StyledTableCell>
                                    <StyledTableCell align="center">{candidate.cv_url}</StyledTableCell>
                                    <StyledTableCell align="center">{candidate.email}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {format(parseISO(candidate.recruitment_status.created_at), 'MM/dd/yyyy')}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[{ label: 'All', value: -1 }]}
                                    colSpan={5}
                                    count={candidates.length}
                                    rowsPerPage = {rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                )}
                {candidates.length === 0 && <LoadingTable />}
            </TableContainer>
        </Fragment>
    );
};

CandidateComparison.propTypes = {
    candidates: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                vacancy_id: PropTypes.number,
                name: PropTypes.string,
                email: PropTypes.string,
                country: PropTypes.string,
            }),
        ),
        PropTypes.shape({
            message: PropTypes.string,
            data: PropTypes.arrayOf(PropTypes.object),
        }),
    ]).isRequired,
};