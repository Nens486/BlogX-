import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import apiClient from "../callApi/configAxios";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getBlogDetail = async () => {
    try {
      const { data } = await apiClient.get(`/api/v1/blog/getblog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to fetch blog");
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.put(`/api/v1/blog/updateblog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      });

      if (data?.success) {
        toast.success("✅ Blog updated successfully!");
        navigate("/myblogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to update blog");
    }
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
            color="warning.main"
            gutterBottom
          >
            <EditNoteIcon sx={{ fontSize: 35, verticalAlign: "middle" }} />{" "}
            Update Blog
          </Typography>

          <InputLabel sx={{ fontWeight: "bold" }}>Title</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Update blog title"
            required
          />

          <InputLabel sx={{ fontWeight: "bold" }}>Description</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Update blog description"
            multiline
            rows={4}
            required
          />

          <InputLabel sx={{ fontWeight: "bold" }}>Image URL</InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            placeholder="Update image link"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="warning"
            size="large"
            sx={{ borderRadius: 3, mt: 2 }}
          >
            ✏️ Update Blog
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BlogDetails;
