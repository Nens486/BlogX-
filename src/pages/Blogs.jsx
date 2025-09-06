import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/Blogcard";
import { Grid, Typography, Container } from "@mui/material";
import toast from "react-hot-toast";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/allblogs");
      if (data?.success) {
        setBlogs(data?.blogs || []);
      } else {
        toast.error("No blogs available ❌");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs ❌");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Container sx={{ paddingY: 5 }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 5,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        🌍 Explore Blogs
      </Typography>

      {/* Blogs Grid */}
      <Grid container spacing={4}>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard
                id={blog._id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user?.username}
                time={blog.createdAt}
                isUser={false} // since these are all blogs, not always user's
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 5, width: "100%" }}
          >
            🚀 No blogs found, be the first to post!
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Blogs;
