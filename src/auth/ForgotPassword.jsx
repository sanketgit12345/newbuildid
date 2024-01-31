import { Box, Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import buildLogo from "../assets/images/build_id_logo.png";
import loginBanner from "../assets/images/login_banner.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <Grid container spacing={2} className="login-grid">
      <Grid item xs={12} sm={12} lg={7} xl={8} className="banner-section">
        <div className="login-header">
          <div className="flex-row">
            <img src={buildLogo} className="logo" />
          </div>
        </div>
        <div className="banner">
          <img className="login-banner" src={loginBanner} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} lg={5} xl={4} className="auth-grid">
        <h6 className="auth-heading">Forgot Password</h6>
        <Stack spacing={2}>
          <Box>
            <InputLabel className="input-label">Email</InputLabel>
            <TextField
              size="small"
              name="email"
              onChange={() => {}}
              value={""}
              fullWidth
              id="my-input"
            />
          </Box>
        </Stack>

        <Stack className="footer-stack forgot-stack" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={false}
            fullWidth
            className="signin-btn"
            size="large"
            onClick={""}>
            CONTINUE
          </Button>
        </Stack>

        <Stack
          direction="row"
          className="footer-stack new-account"
          style={{ justifyContent: "space-between", display: "flex" }}
          spacing={2}>
          <Link className="acc-link" to="/">
            Back To Login
          </Link>
          <Link color="primary" to="/reset-password" className="acc-link">
            I HAVE A RESET CODE
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}
