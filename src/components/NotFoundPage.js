import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>You found the 404 page! <Link to="/">Go to homepage</Link></p>
    </div>
);

export { NotFoundPage as default };