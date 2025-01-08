import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Box, Typography, Paper, Avatar } from "@mui/material";
import { getAIText, getAllActivUsers } from "../services/api";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import toast from "react-hot-toast";
import Loader from "./Loader";
const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [showUsername, setShowUsername] = useState(false);
    const messagesEndRef = useRef(null);
    const [activeMembers, setActiveMembers] = useState([]);
    const [color, setColor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let socketConn;

        if (showUsername) {
            socketConn = new WebSocket(`ws://localhost:8000/chat/ws/community/connect/${username}`);
            setSocket(socketConn);

            socketConn.onmessage = (event) => {
                const msg = JSON.parse(event.data); // Parse incoming message as JSON
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

        setColor(getRandomColor());
    }, [showUsername, username]);

    useEffect(() => {
        async function getAllActiveUsers() {
            let res = await getAllActivUsers();
            setActiveMembers(res.data.users)
        }

        getAllActiveUsers();
    }, [messages])

    const sendMessage = () => {
        if (socket && message) {
            socket.send(message);
            setMessage("");
        }
    };

    const submitUsername = () => {
        const time = Date.now().toString();
        setUsername(username.toLowerCase() + time.substring(time.length - 6));
        setShowUsername(true);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase();
    };
    const handleAIButtonClick = async () => {
        let splittedText = message.split(" ");

        if (splittedText.length > 5) {
            setIsLoading(true);
            let res = await getAIText(message);
            setMessage(res.data?.response)
            setIsLoading(false);

        } else {
            toast.error("Please add atleast 5 words to the message");
        }
    };
    return (
        <div
            style={{
                marginTop: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isLoading ? <Loader /> : <></>}
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Community Chat.
            </Typography>
            {showUsername && (
                <Typography variant="h6" align="center" gutterBottom>
                    Your User ID: {username}
                </Typography>
            )}
            {showUsername ? (

                <Box sx={{ p: 2, width: "80%", border: "solid black 1px", height: "60vh", display: 'flex', justifyContent: "space-between" }}>
                    <Paper
                        sx={{
                            p: 2,
                            mb: 2,
                            overflowY: "auto",
                            width: "13%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <Typography style={{ border: "1px solid gray", width: "95%", display: "flex", justifyContent: "center" }} variant="h5">Active Members</Typography>
                        <div ></div>
                        <div style={{ width: "100%" }}>
                            {activeMembers.map((member) => (
                                <div key={member} style={{ padding: "2%", display: "flex", alignItems: "center", width: "100%", justifyContent: "start" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: color,
                                            width: 40,
                                            height: 40,
                                            fontSize: "1.5rem",
                                            color: "white",
                                        }}
                                    >
                                        {capitalizeFirstLetter(member)}
                                    </Avatar>
                                    <Typography style={{ marginLeft: "2%" }} variant="h6">{member.length > 15 ? member.slice(0, 15) + "..." : member}</Typography>
                                </div>)
                            )}
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            mb: 2,

                            width: "83%"
                        }}
                    >
                        <div style={{ height: "90%", overflowY: "auto", }}>
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        mb: 1,
                                        p: 1,
                                        backgroundColor: msg.client_id === username ? "#e3f2fd" : "#f5f5f5",
                                        borderRadius: "8px",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold", color: "#1565c0" }}
                                    >
                                        {msg.client_id}
                                    </Typography>
                                    <Typography variant="body1">{msg.message}</Typography>
                                </Box>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Enhance with AI">
                                                <IconButton onClick={handleAIButtonClick} >
                                                    <SmartToyIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                }}
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


                    </Paper>

                </Box>
            ) : (
                <Box style={{ gap: "15px", display: "flex" }}>
                    <TextField
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter User Name"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitUsername}
                        disabled={!username.trim()}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default Chat;
