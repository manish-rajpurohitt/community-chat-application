import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        let res = await login(email, password);
        if (res.status === 200) {
            localStorage.setItem("_t", res.data.access_token);
            window.location.href = "/chat"
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, padding: 3, textAlign: "center" }}>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={handleLogin} noValidate>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
