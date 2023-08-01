import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Edit = () => {
    const location = useLocation();
    const data = location.state;
    const isLoggedin = useSelector(state => state.authenticated);
    const auth_token = useSelector(state => state.auth_token);
    const uuid = data.uuid;
    const [email, setEmail] = useState(data.email);
    const [phone, setPhone] = useState(data.phone);
    const [first, setFirst] = useState(data.first_name);
    const [last, setLast] = useState(data.last_name);
    const [street, setStreet] = useState(data.street);
    const [address, setAddress] = useState(data.address);
    const [city, setCity] = useState(data.city);
    const [state, setState] = useState(data.state);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedin) {
            navigate("/");
        }
        if (!uuid) {
            navigate("/Dashboard");
        }
    }, [isLoggedin, navigate, uuid]);
    const register = (e) => {
        e.preventDefault();
        fetch(`https://sunbase-proxyv2.onrender.com/editUser`, {
            method: "POST", mode: "cors", headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                uuid: uuid,
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
                alert("Customer Edited!");
                navigate("/Dashboard");
            }
            else {
                alert("Unable to Edit, Try again later...");
            }
        }).catch(err => {
            alert("Unable to Edit, Try again later...");
        })
    }
    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: "center", color: "antiquewhite", marginTop: "125px" }}>EDIT CUSTOMER DETAILS</h1>
            <div style={{
                marginTop: "40px", marginLeft: "60px"
            }}>
                <form onSubmit={register} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                    <div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" type='text' defaultValue={first} onChange={(event) => { setFirst(event.target.value) }} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" type='text' defaultValue={last} onChange={(event) => { setLast(event.target.value) }} />
                    </div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="Street" variant="outlined" type='text' defaultValue={street} onChange={(event) => { setStreet(event.target.value) }} />
                        <TextField id="outlined-basic" label="Address" variant="outlined" type='text' defaultValue={address} onChange={(event) => { setAddress(event.target.value) }} /></div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="City" variant="outlined" type='text' defaultValue={city} onChange={(event) => { setCity(event.target.value) }} />
                        <TextField id="outlined-basic" label="State" variant="outlined" type='text' defaultValue={state} onChange={(event) => { setState(event.target.value) }} /></div><div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2vh 30vw" }}>
                        <TextField id="outlined-basic" label="E-mail" variant="outlined" type='email' defaultValue={email} onChange={(event) => { setEmail(event.target.value) }} />
                        <TextField id="outlined-basic" label="Phone" variant="outlined" type='text' defaultValue={phone} onChange={(event) => { setPhone(event.target.value) }} /></div>
                    <div style={{ textAlign: "center", marginLeft: "350px" }}><Button type='submit' >EDIT</Button></div>



                </form>
            </div>
        </>
    );
}

export default Edit;
