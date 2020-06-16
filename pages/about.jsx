import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationBar from "../components/NavigationBar";

export default function About() {
    return (
        <React.Fragment>
            <NavigationBar/>
            <Container maxWidth="sm">
                <Box my={4}>
                    ABOUT
                </Box>
            </Container>
        </React.Fragment>

    );
}