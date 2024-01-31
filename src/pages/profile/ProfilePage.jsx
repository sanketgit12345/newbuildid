import React from "react";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./ProfilePage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import profileIcon from "../../assets/images/profile-img.jpg";

export default function Profile() {

  const firstName = "Yash";
  const lastName = "Chavan";

  return (
    <>
      <Grid container spacing={1} className="profile-grid">
        <Grid item xs={10} sm={8} lg={11} md={6}>
          <Box className="profile-container" gap={2}>
            <img src={profileIcon} alt="User profile pic" />
            <div>
              <Typography variant="h6" component="h2" className="heading">
                {firstName} {lastName}
              </Typography>
              <Chip label="yash" />
            </div>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} lg={1} md={6}>
          <IconButton color="primary" onClick={() => { }}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={"5px"}>
        <Grid item xs={12} sm={12} lg={4} xl={4}>
          <div className="profile-card">
            <CardContent>
              <div className="cardcontent">
                <Typography variant="h6" className="heading">
                  About
                </Typography>
                <Box>
                  <button variant="contained" className="button">
                    Edit
                  </button>
                </Box>
              </div>
              <div className="content">
                <MailIcon className="icon" />
                <Box>
                  <Typography>stepron.ychavan@gmail.com</Typography>
                  <span>Primary</span>
                  <Typography>yashuoct06@gmail.com</Typography>
                  <span>Personal</span>
                </Box>
              </div>
              <div className="content">
                <CallIcon className="icon" />
                <Box>
                  <Typography>+91 8983071235</Typography>
                  <span>Mobile</span>
                  <Typography>+91 8999693363</Typography>
                  <span>Home</span>
                </Box>
              </div>
              <div className="content">
                <HomeIcon className="icon" />
                <Box>
                  <span>India</span>
                </Box>
              </div>
              <div className="content">
                <span>Joined Oct 13, 2023</span>
              </div>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={8} xl={8}>
          <div className="profile-card">
            <CardContent>
              <div className="cardcontent">
                <Typography variant="h6" className="heading">
                  Experience
                </Typography>
                <Box>
                  <IconButton variant="contained" className="button">
                    <AddIcon />
                  </IconButton>
                </Box>
              </div>

              <div className="experience-main">
                <div className="content">
                  <div>
                    <Typography variant="h6" className="heading">
                      Sultan
                    </Typography>
                    <Typography>Pune</Typography>
                    <Typography>October 2020 - Present</Typography>
                    <Typography>Development</Typography>
                  </div>
                  <EditIcon className="icon" />
                </div>
                <div className="experience-sub">
                  <Box gap={2} className="content">
                    <img src={profileIcon} alt="User profile pic" />
                    <div>
                      <Typography>Testing 2</Typography>
                      <Typography>Pradip Technlogies</Typography>
                      <Typography>September 2023 - Present</Typography>
                      <Typography>Testing</Typography>
                    </div>
                  </Box>
                  <EditIcon className="icon" />
                </div>
                <div>
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => { }}>
                    Add Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="profile-card">
            <CardContent className="cardcontent">
              <Typography variant="h6" className="heading">
                Education
              </Typography>
              <Box>
                <IconButton variant="contained" className="button">
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
