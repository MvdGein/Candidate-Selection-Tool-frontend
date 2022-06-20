import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
    <div>
        <h3>Niet gevonden pagina</h3>
        <Link to="/">Ga terug</Link>
    </div>
);