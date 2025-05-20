// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, post } from "../services/endpoints";
import toast from "react-hot-toast";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const res = await post("/auth/logout");
      const data = res.data;
      if (res.success) {
        navigate("/");
        dispatch(logout());
        toast.success(data.message || "Logout successful!");
      } else {
        toast.error(data.message || "Logout failed.");
      }
    } catch (error) {}
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#2563EB" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
              ml: 1,
            }}
          >
            Blogify
          </Typography>
        </Box>

        <Box>
          {!user ? (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
          ) : (
            // Avatar dropdown logic
            <>
              <IconButton
                onClick={handleAvatarClick}
                size="small"
                sx={{ p: 0 }}
              >
                <Avatar src={`${user.profilePicture}`} alt={user.name} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      minWidth: 150,
                      bgcolor: "#1f2937", // Tailwind’s bg-gray-900
                      color: "#fff",
                      borderRadius: 1,
                      boxShadow: 6,
                    },
                  },
                }}
              >
                {user?.role === "admin" && (
                  <MenuItem
                    component={RouterLink}
                    to="/dashboard"
                    onClick={handleClose}
                  >
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem
                  component={RouterLink}
                  to="/profile/399354"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
