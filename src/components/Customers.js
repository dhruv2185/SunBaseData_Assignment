import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Customers = () => {
    const isLoggedin = useSelector(state => state.authenticated);
    const auth_token = useSelector(state => state.auth_token);
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        if (!isLoggedin) {
            navigate("/");
        }
        else {
            fetch(`https://sunbase-proxy.onrender.com/getCustomerList`, {
                method: "POST", mode: "cors", body: JSON.stringify({ auth_token: auth_token }),
                headers: { "Content-type": "application/json" }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    alert("Unable to Fetch Data!");
                }
            }).then(res => {
                setRows([...res]);
            }).catch(err => {
                alert("Unable to Fetch Data!");
            })
        }
    }, [isLoggedin, refresh, auth_token, navigate])
    const deleteUser = (uuid) => {
        fetch("https://sunbase-proxy.onrender.com/deleteUser", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                uuid: uuid,
                auth_token: auth_token
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                alert("User Deleted");
                setRefresh(!refresh)
            }
            else {
                alert("Failed to DELETE Customer!")
            }
        }).catch(err => {
            alert("Failed to DELETE Customer!")
        })
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: "120px", marginLeft: "60px" }}>
                <Link to="/Register"><Button variant='contained'>ADD CUSTOMER</Button></Link>
            </div>
            <div style={{ padding: "40px" }}>


                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right">{row.first_name}</TableCell>
                                <TableCell align="right">{row.last_name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                                <TableCell align="right">{row.state}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right"><Button onClick={() => {
                                    deleteUser(row.uuid);
                                }}><DeleteIcon /></Button><Link to="/Edit" state={row}><Button><EditIcon /></Button></Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>


        </>
    );
}

export default Customers;
