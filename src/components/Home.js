import React from 'react';
import Navbar from './Navbar';
import { Box, Button, DialogContentText } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Navbar />

            <h1 style={{ textAlign: "center", color: "antiquewhite", marginTop: "250px", }}>WELCOME TO SUNBASE DATA</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/Login"><Button>Login</Button></Link>
            </div>
        </>
    );
}

export default Home;
