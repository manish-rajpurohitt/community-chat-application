import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [showUsername, setShowUsername] = useState(false);

    useEffect(() => {
        let socketConn;

        if (showUsername) {
            socketConn = new WebSocket("ws://localhost:8000/chat/ws/community/connect/" + username);
            setSocket(socketConn);

            socketConn.onmessage = (event) => {
                const msg = event.data;
                setMessages((prevMessages) => [...prevMessages, msg]);
            };

            socketConn.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            socketConn.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            const handleBeforeUnload = () => {
                if (socketConn) {
                    socketConn.close();
                }
            };

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                if (socketConn) {
                    socketConn.close();
                }
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, [showUsername, username]);


    const sendMessage = () => {
        if (socket && message) {
            socket.send(message);
            setMessage("");
        }
    };

    const submitUsername = () => {
        let time = Date.now().toString()
        setUsername(username.toLowerCase() + time.substring(time.length - 6));
        setShowUsername(true);
    }

    return (
        <div style={{ marginTop: "5%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Community Chat. {showUsername && `Your User Id : ${username}`}
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
                {showUsername && `Your User Id : ${username}`}
            </Typography>
            {showUsername ? <Box sx={{ p: 2, width: "800px", margin: "auto", }}>
                <Paper sx={{ p: 2, mb: 2, height: "300px", overflowY: "auto", border: "solid black 1px" }}>
                    {messages.map((msg, index) => (
                        <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                            {msg}
                        </Typography>
                    ))}
                </Paper>
                <Box sx={{ display: "flex", gap: 2, }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        disabled={!message.trim()}
                    >
                        Send
                    </Button>
                </Box>
            </Box> : <Box style={{ gap: "15px", display: "flex" }}>
                <TextField
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter User Name"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => submitUsername()}
                    disabled={!username.trim()}
                >
                    Submit
                </Button>
            </Box>}
        </div>

    );
};

export default Chat;
