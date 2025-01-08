import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.loaderContainer}>
                <CircularProgress size={50} color="primary" />
                {message && <span style={styles.message}>{message}</span>}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    },
    loaderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    message: {
        marginTop: "10px",
        fontSize: "16px",
        color: "#fff",
    },
};

export default Loader;
