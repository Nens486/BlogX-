import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CreateIcon from "@mui/icons-material/Create";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/createblog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("🚀 Post uploaded successfully!");
        navigate("/myblogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to upload blog");
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            <CreateIcon sx={{ fontSize: 35, verticalAlign: "middle" }} /> Create
            a Blog
          </Typography>

          <InputLabel sx={{ fontWeight: "bold" }}>Title</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />

          <InputLabel sx={{ fontWeight: "bold" }}>Description</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Write your blog description"
            multiline
            rows={4}
            required
          />

          <InputLabel sx={{ fontWeight: "bold" }}>Image URL</InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            placeholder="Paste image link"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, mt: 2 }}
          >
            🚀 Post Blog
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateBlog;
