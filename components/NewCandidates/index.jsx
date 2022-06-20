import React from 'react';
import { format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { TablePaginationActions } from '../PaginateTable';
import { CandidateContentCard } from '../CandidateContentCard';

const candidates = [
    {
        id: 1,
        name: 'Kandidaat 1',
        vacancy: 'Process Management',
        company: 'P_00065425 GICT INHUUR Projectmanager C',
        date: new Date(2022, 5, 19),
    },
    {
        id: 2,
        name: 'Kandidaat 2',
        vacancy: 'IT & Business Consultant',
        company: 'P_00065425 GICT INHUUR Projectmanager C',
        date: new Date(2022, 5, 19),
    },
    {
        id: 3,
        name: 'Kandidaat 3',
        vacancy: 'Software Engineer',
        company: 'P_00065425 GICT INHUUR Projectmanager C',
        date: new Date(2022, 5, 19),
    },
    {
        id: 4,
        name: 'Kandidaat 4',
        vacancy: 'IT & Control Officer',
        company: 'P_00065425 GICT INHUUR Projectmanager C',
        date: new Date(2022, 5, 19),
    },
    {
        id: 5,
        name: 'Kandidaat 5',
        vacancy: 'Head Marketing',
        company: 'P_00065690 Manager in SKA',
        date: new Date(2022, 5, 19),
    },
    {
        id: 6,
        name: 'Kandidaat 6',
        vacancy: 'HR Product Owner',
        company: 'P_00065425 GICT INHUUR Projectmanager C',
        date: new Date(2022, 5, 19),
    },
];

export const NewCandidates = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - candidates.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} elevation={3}>
            <Typography variant="h2" sx={{ p: 2 }}>
                Nieuwe kandidaten
            </Typography>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0
                        ? candidates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : candidates
                    ).map((candidate) => (
                        <TableRow key={candidate.id}>
                            <TableCell component="th" scope="row">
                                <CandidateContentCard
                                    name={candidate.name}
                                    vacancy={candidate.vacancy}
                                    company={candidate.company}
                                    date={format(candidate.date, 'dd/MM/yyyy')}
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[{ label: 'All', value: -1 }]}
                            colSpan={3}
                            count={candidates.length}
                            rowsPerPage={rowsPerPage}
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
        </TableContainer>
    );
};