import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [showAuth, setShowAuth] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("_t")) {
            setShowAuth(true);
        } else {
            setShowAuth(false);
        }
    }, []);


    return (
        <AppBar position="static" color="primary" >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    MyApp
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    {showAuth && <Button color="inherit" component={Link} to="/login">Login</Button>}
                    {showAuth && <Button color="inherit" component={Link} to="/signup">Signup</Button>}
                    {!showAuth && <Button color="inherit" onClick={() => { localStorage.clear(); window.location.reload() }}>Logout</Button>}
                    <Button color="inherit" component={Link} to="/chat">Community Chat</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
