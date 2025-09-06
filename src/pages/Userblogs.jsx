import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blogcard";
import { Grid, Typography, Container } from "@mui/material";
import toast from "react-hot-toast";
import apiClient from "../callApi/configAxios";

const Userblogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await apiClient.get(`/api/v1/blog/userblogs/${id}`);

      if (data?.success) {
        setBlogs(data?.userBlog?.blogs || []);
      } else {
        toast.error("No blogs found for this user ❌");
      }
    } catch (error) {
      console.error("❌ Error fetching user blogs:", error);
      toast.error("Failed to fetch your blogs");
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
      >
        ✍️ My Blogs
      </Typography>

      <Grid container spacing={4}>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid
              item
              xs={12}   // 1 per row on mobile
              sm={6}    // 2 per row on tablet
              md={4}    // 3 per row on desktop
              key={blog._id}
            >
              <BlogCard
                id={blog._id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user?.username}
                time={blog.createdAt}
                isUser={true}
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 5, width: "100%" }}
          >
            🚀 Please upload your first blog
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Userblogs;
