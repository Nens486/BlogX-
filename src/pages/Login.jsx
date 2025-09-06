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
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import apiClient from "../callApi/configAxios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
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
      const { data } = await apiClient.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });

      if (data?.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("🎉 Welcome back to BlogX!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
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
            🔑 Login
          </Typography>

          <form onSubmit={handleSubmit}>
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
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              }}
            >
              🚀 Login
            </Button>
          </form>

          <Button
            onClick={() => navigate("/register")}
            type="button"
            variant="text"
            fullWidth
            sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
          >
            New to BlogX? 👉 Register Here
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
