import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarData = (info) => ({
    labels: ['Ambitieaansluiting', 'Managementvaardigheden', 'Carrièreontwikkeling', 'Skillaansluiting'],
    datasets: [
        {
            label: 'Score',
            backgroundColor: 'rgba(34, 202, 236, .2)',
            borderColor: 'rgba(34, 202, 236, 1)',
            pointBackgroundColor: 'rgba(34, 202, 236, 1)',
            poingBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
            data: [
                info.gral_ambition_rating,
                info.gral_management_capability_rating,
                info.gral_career_development_rating,
                info.gral_skill_capability_rating,
            ],
        },
    ],
});

const RadarOptions = {
    scales: {
        r: {
            angleLines: {
                display: true,
                color: 'rgba(255, 255, 255, .3)',
                lineWidth: 1,
            },
            ticks: {
                stepSize: 1,
                showLabelBackdrop: false,
                display: false,
            },
            grid: {
                circular: false,
            },
            pointLabels: {
                size: 30,
            },
            min: 0,
            max: 5,
        },
    },
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,
        },
    },
};

const RadarChart = ({ info }) => {
    return <Radar data={RadarData(info)} options={RadarOptions} />;
};

RadarChart.propTypes = {
    info: PropTypes.shape({
        candidate_information: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            linkedin_url: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            job_title: PropTypes.string.isRequired,
        }).isRequired,
        candidate_rating: PropTypes.number.isRequired,
        total_evaluations: PropTypes.number.isRequired,
        gral_ambition_rating: PropTypes.number.isRequired,
        gral_management_capability_rating: PropTypes.number.isRequired,
        gral_career_development_rating: PropTypes.number.isRequired,
        gral_skill_capability_rating: PropTypes.number.isRequired,
    }).isRequired,
};

export default RadarChart;
