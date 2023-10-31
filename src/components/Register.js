import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Register = () => {
    const isLoggedin = useSelector(state => state.authenticated);
    const auth_token = useSelector(state => state.auth_token);
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [street, setStreet] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, navigate]);
    const register = (e) => {
        e.preventDefault();
        fetch(`https://sunbase-proxy.onrender.com/createUser`, {
            method: "POST", mode: "cors", headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                auth_token: auth_token,
                first_name: first,
                last_name: last,
                street: street,
                phone: phone,
                city: city,
                email: email,
                state: state,
                address: address

            })
        }).then(res => {
            if (res.ok) {
                alert("New Customer added!");
                navigate("/Dashboard");
            }
            else {
                alert("Unable to ADD Customer!");
            }
        }).catch(err => {
            alert("Unable to ADD Customer!");
        })
    }
    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: "center", color: "antiquewhite", marginTop: "125px" }}>ADD CUSTOMER</h1>
            <div style={{
                marginTop: "40px", marginLeft: "60px"
            }}>
                <form onSubmit={register} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                    <div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" type='text' onChange={(event) => { setFirst(event.target.value) }} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" type='text' onChange={(event) => { setLast(event.target.value) }} />
                    </div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="Street" variant="outlined" type='text' onChange={(event) => { setStreet(event.target.value) }} />
                        <TextField id="outlined-basic" label="Address" variant="outlined" type='text' onChange={(event) => { setAddress(event.target.value) }} /></div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="City" variant="outlined" type='text' onChange={(event) => { setCity(event.target.value) }} />
                        <TextField id="outlined-basic" label="State" variant="outlined" type='text' onChange={(event) => { setState(event.target.value) }} /></div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="E-mail" variant="outlined" type='email' onChange={(event) => { setEmail(event.target.value) }} />
                        <TextField id="outlined-basic" label="Phone" variant="outlined" type='text' onChange={(event) => { setPhone(event.target.value) }} /></div>
                    <div style={{ textAlign: "center", marginLeft: "350px" }}><Button type='submit' >ADD</Button></div>



                </form>
            </div>
        </>
    );
}

export default Register;
