import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const CandidateFormTabs = ({ tabsOptions }) => {
    const selectedTab = localStorage.getItem('selectedTab');
    const [value, setValue] = useState(parseInt(selectedTab, 2) || 0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
        localStorage.setItem('selectedTab', newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs value={value} onChange={handleChange}>
                    {tabsOptions.map((option) => (
                        <Tab key={`TabButton-${option.tabKey}`} label={option.tabKey} />
                    ))}
                </Tabs>
            </Box>
            {tabsOptions.map((option, i) => (
                <TabPanel key={`TabContent-${option.tabKey}`} value={value} index={i}>
                    {option.tabContent}
                </TabPanel>
            ))}
        </Box>
    );
};

CandidateFormTabs.propTypes = {
    tabsOptions: PropTypes.arrayOf(
        PropTypes.shape({
            tabKey: PropTypes.string.isRequired,
            tabContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        }),
    ).isRequired,
};

export default CandidateFormTabs;