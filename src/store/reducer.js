import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
const initialState = {
    auth_token: "",
    authenticated: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return {
                auth_token: "",
                authenticated: false
            }
        default:
            return state;
    }
}
export default configureStore({ reducer: reducer });