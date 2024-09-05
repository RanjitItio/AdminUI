import React from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";




const TestSignupForm = () => {
    
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #7b67d2, #8f44e8)",
      }}
    >
      <Box
        sx={{
          width: 300,
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Main Form */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#4B0082", mb: 3 }}
        >
          Login Form
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Username / Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#4B0082",
            padding: "10px",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#6A0DAD" },
          }}
        >
          LOG IN NOW
        </Button>

        {/* Social Login */}
        <Typography
          variant="body2"
          sx={{ color: "#808080", marginTop: "20px" }}
        >
          Log in via
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <IconButton color="primary">
            <Facebook />
          </IconButton>
          <IconButton color="primary">
            <Twitter />
          </IconButton>
          <IconButton color="primary">
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TestSignupForm;
