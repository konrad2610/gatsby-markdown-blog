import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head';

const AboutPage = () => {
    return (
        <Layout>
            <Head title="About"/>
            <h1>About Page</h1>
            <p>About Page</p>
            <Link to='/contact'>Contact Page</Link>
        </Layout>
    );
};

export default AboutPage;