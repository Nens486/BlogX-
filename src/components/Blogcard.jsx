import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogCard = ({ id, title, description, image, username, time, isUser }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  // Handle blog delete
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`https://blog-x-backend.vercel.app/api/v1/blog/deleteblog/${id}`);
      if (data?.success) {
        toast.success("Blog deleted successfully 🚀");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog ❌");
    }
  };

  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: "900px",
        margin: "20px auto",
        borderRadius: 4,
        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* Blog Image */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: { xs: 180, sm: 220, md: 300 }, // bigger image for desktop
          width: "100%",
          objectFit: "cover", // crops nicely without distortion
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />




      {/* Blog Content */}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: "bold", color: "#222" }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          {expanded ? description : description.slice(0, 200) + (description.length > 200 ? "..." : "")}
        </Typography>

        {/* Read More / Less button */}
        {description.length > 200 && (
          <Button
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{ mt: 1, textTransform: "none", fontWeight: "bold" }}
          >
            {expanded ? "Read Less ▲" : "Read More ▼"}
          </Button>
        )}

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            By <b>{username}</b> • {new Date(time).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      {isUser && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            color="primary"
            onClick={() => navigate(`/blogdetails/${id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default BlogCard;
