import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head';

const NotFound = () => {
    return (
        <Layout>
            <Head title="404"/>
            <h1>Nie znaleziono strony</h1>
            <p>
                <Link to='/'>Powrót do strony głównej</Link>
            </p>
        </Layout>
    );
};

export default NotFound;