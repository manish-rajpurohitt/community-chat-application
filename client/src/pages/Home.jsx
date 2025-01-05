import React from "react";
import { Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
        <Box sx={{ textAlign: "center", p: 5 }} style={{ marginBottom: "5%", display: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" gutterBottom>
                Welcome to MyApp!
            </Typography>
            <Typography variant="body1">
                Explore our platform. Join the Community Chat or Login to access more features.
            </Typography>
        </Box>
    );
};

export default HomePage;
