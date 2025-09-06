import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  


  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });

      if (data?.success) {
        toast.success("🎉 Account created! Please login.");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 4,
          boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color="primary"
          >
            ✍️ Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              onChange={handleChange}
              value={inputs.username}
              name="username"
              type="text"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              onChange={handleChange}
              value={inputs.email}
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              onChange={handleChange}
              value={inputs.password}
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
              }}
            >
              🚀 Register
            </Button>
          </form>

          <Button
            onClick={() => navigate("/login")}
            type="button"
            variant="text"
            fullWidth
            sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
          >
            Already Registered? 👉 Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
