import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button variant="contained" type="button" onClick={() => loginWithRedirect()}>
            Log in
        </Button>
    );
};

export const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() =>
                loginWithRedirect({
                    screen_hint: 'signup',
                })
            }
        >
            Registreer
        </Button>
    );
};

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button variant="contained" type="button" onClick={() => logout({ returnTo: window.location.origin })}>
            Log uit
        </Button>
    );
};

export const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};