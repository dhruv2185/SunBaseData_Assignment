

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Customers from "./components/Customers";
import { ThemeProvider, createTheme } from "@mui/material";
import store from "./store/reducer";
import { Provider } from 'react-redux';
import Edit from "./components/Edit";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      neutral: {
        main: '#f45c03'
      }
    },

  });

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Dashboard" element={<Customers />} />
              <Route path="/Edit" element={<Edit />} />

            </Routes>
          </Router>
        </ThemeProvider></Provider>
    </>
  );
}

export default App;
