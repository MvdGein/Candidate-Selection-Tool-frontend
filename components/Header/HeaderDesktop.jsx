import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { Menu, MenuList, MenuItem, ListItemIcon, Typography, Box } from '@mui/material';

import { Home, BriefCase, Blog } from '@master-c8/icons';

import { LogoutButton } from 'Components/AuthButtons';

import { LinkStyled } from './styles';

export const HeaderDesktop = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <MenuList sx={{ display: 'flex' }}>
            <MenuItem>
                <LinkStyled to="/">
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                        <Home color="secondary" />
                    </ListItemIcon>
                    <Typography color="secondary">Home</Typography>
                </LinkStyled>
            </MenuItem>
            <MenuItem>
                <LinkStyled to="/vacancies">
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                        <BriefCase color="secondary" />
                    </ListItemIcon>
                    <Typography color="secondary">Vacatures</Typography>
                </LinkStyled>
            </MenuItem>
            <MenuItem>
                <LinkStyled to="/postulations">
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                        <Blog color="secondary" />
                    </ListItemIcon>
                    <Typography color="secondary">Statussen</Typography>
                </LinkStyled>
            </MenuItem>
            <Box sx={{ display: 'flex' }}>
                <ListItemIcon
                    onClick={handleClick}
                    sx={{ display: 'flex', alignItems: 'center', color: 'black' }}
                    size="large"
                >
                    <Avatar sx={{ bgcolor: '#000099', width: 45, height: 45, ml: 3 }} alt="Profile" />
                </ListItemIcon>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem>
                        <LogoutButton />
                    </MenuItem>
                </Menu>
            </Box>
        </MenuList>
    );
};