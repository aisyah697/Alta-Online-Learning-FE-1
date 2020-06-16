import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationBar from "../components/NavigationBar";
import Link from "../utils/Link";

export default function About() {
    return (
        <React.Fragment>
            <NavigationBar/>
            <Container maxWidth="sm">
                <Link href={'/'}>
                    <Box my={4}>
                        <h4 style={{color: 'red'}}>ABOUT</h4>
                    </Box>
                </Link>
            </Container>
        </React.Fragment>

    );
}