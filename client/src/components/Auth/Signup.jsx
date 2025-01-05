import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signup } from "../../services/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        let res = await signup(email, password, name);
        if (res.status === 200) window.location.href = "/login"
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, padding: 3, textAlign: "center" }}>
                <Typography variant="h5">Sign Up</Typography>
                <form onSubmit={handleSignup} noValidate>
                    <TextField
                        label="Full Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account?{" "}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Signup;
