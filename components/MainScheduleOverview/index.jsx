import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [
    {
        title: 'Positie P_00065425 is gekoppeld aan uw identificatienummer',
        startDate: new Date(2022, 5, 17, 9, 15),
        endDate: new Date(2022, 5, 17, 9, 20),
    },
    {
        title: 'Nieuwe evaluatie kandidaat 1',
        startDate: new Date(2022, 5, 16, 12, 15),
        endDate: new Date(2022, 5, 16, 12, 20),
    },
    {
        title: 'Nieuwe aanmelding op uw vacature',
        startDate: new Date(2022, 5, 17, 10, 10),
        endDate: new Date(2022, 5, 17, 10, 15),
    },
];

const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
    <ToggleButtonGroup
        color="primary"
        value={currentViewName}
        exclusive
        onChange={onChange}
        sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}
    >
        <ToggleButton
            sx={{
                textTransform: 'none',
                fontWeight: 400,
                color: '#373F41',
            }}
            value="Day"
        >
            Dag
        </ToggleButton>
        <ToggleButton
            sx={{
                textTransform: 'none',
                fontWeight: 400,
                color: '#373F41',
            }}
            value="Week"
        >
            Week
        </ToggleButton>
        <ToggleButton
            sx={{
                textTransform: 'none',
                fontWeight: 400,
                color: '#373F41',
            }}
            value="Month"
        >
            Maand
        </ToggleButton>
    </ToggleButtonGroup>
);

export const MainScheduleOverview = () => {
    const [data, setData] = useState();
    const [currentViewName, setCurrentViewName] = useState('Month');

    const currentViewNameChange = (e) => {
        setCurrentViewName(e.target.value);
    };

    useEffect(() => {
        setData(appointments);
    }, []);

    return (
        <Paper elevation={3}>
            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
            <Scheduler data={data} height={700}>
                <ViewState currentViewName={currentViewName} />
                <DayView startDayHour={8} endDayHour={18} />
                <WeekView startDayHour={8} endDayHour={18} />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
            </Scheduler>
        </Paper>
    );
};

ExternalViewSwitcher.propTypes = {
    currentViewName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};