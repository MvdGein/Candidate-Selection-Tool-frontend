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
import { VacancyContentCard } from 'Components/VacancyContentCard';
import { TablePaginationActions } from '../PaginateTable';

const vacancies = [
    {
        id: 1,
        vacancy: 'P_00065425 GICT INHUUR Projectmanager C',
        applications: 5,
        company: 'Kandidaat 1',
        date: new Date(2022, 5, 19),
    },
    {
        id: 2,
        vacancy: 'P_00065690 Manager in SKA',
        applications: 1,
        company: 'Kandidaat 2',
        date: new Date(2022, 5, 19),
    },
    {
        id: 3,
        vacancy: 'P_00065549 Senior Second Line Control Monitoring Officer',
        applications: 0,
        company: 'Kandidaat 6',
        date: new Date(2022, 5, 19),
    },
];

export const NewVacancies = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vacancies.length) : 0;

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
                Recent aangemaakte vacatures
            </Typography>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0
                        ? vacancies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : vacancies
                    ).map((vacancy) => (
                        <TableRow key={vacancy.id}>
                            <TableCell component="th" scope="row">
                                <VacancyContentCard
                                    vacancy={vacancy.vacancy}
                                    applications={vacancy.applications}
                                    date={format(vacancy.date, 'dd/MM/yyyy')}
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
                            count={vacancies.length}
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