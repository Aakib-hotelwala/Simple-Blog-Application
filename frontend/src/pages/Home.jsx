import React from "react";
import { Box, Typography } from "@mui/material";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "150px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('earth.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "4rem" }}>
          Welcome To My Blog
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          Embark on a journey through creativity, fresh ideas, and endless
          inspiration. Uncover the beauty in every story.
        </Typography>
      </Box>

      <Box className="w-full px-4 mx-auto">
        <RecentBlogs />
      </Box>
    </>
  );
};

export default Home;
