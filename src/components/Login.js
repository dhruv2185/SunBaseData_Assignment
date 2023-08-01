import React, { useState } from 'react';
import Navbar from './Navbar';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [passwd, setPasswd] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        fetch(`https://sunbase-proxyv2.onrender.com/login`, {
            method: "POST", mode: "cors",

            body: JSON.stringify({
                login_id: email,
                password: passwd
            }),
            headers: {
                "Content-type": "application/json"
            }


        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                alert("Unable to Login");
            }
        }).then(res => {
            dispatch({ type: "LOGIN", payload: { auth_token: res.access_token, authenticated: true } });
            alert("Login Successful!");
            navigate("/Dashboard");
        }).catch(err => {
            alert("Unable to Login");
        })
    }
    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: "center", color: "antiquewhite", marginTop: "225px" }}>LOGIN</h1>
            <form onSubmit={login}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "2vh 30vw" }}>
                    <TextField id="outlined-basic" label="Login ID" variant="outlined" type='email' onChange={(event) => { setEmail(event.target.value) }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(event) => { setPasswd(event.target.value) }} />
                    <Button type='submit'>LOGIN</Button>
                </div>

            </form>
        </>
    );
}

export default Login;
