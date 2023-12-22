import { Box, Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import buildLogo from "../assets/images/build_id_logo.png";
import loginBanner from "../assets/images/login_banner.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();


    const navigateTohome = () => {
         navigate("/main")
    }


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
                <h6 className="auth-heading">Welcome to BuildId</h6>
                <h6 className="auth-subheading">Please Sign in to continue</h6>
                <Stack spacing={2}>
                    <Box>
                        <InputLabel className="input-label">
                            Email
                        </InputLabel>
                        <TextField size="small" fullWidth id="my-input" />
                    </Box>
                    <Box>
                        <InputLabel className="input-label">
                            Password
                        </InputLabel>
                        <TextField size="small" fullWidth id="my-input" />
                    </Box>
                </Stack>
                <Stack direction="row" className="footer-stack forgot-stack" spacing={2}>
                    <Link color="primary" className="forgot-link">
                        Forgot your password?
                    </Link>
                </Stack>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={false}
                    className="signin-btn"
                    size="large"
                    onClick={navigateTohome}
                >
                    Sign In
                </Button>
                <Stack direction="row"  className="footer-stack new-account" style={{justifyContent:"start"}} spacing={2}>
                     <span className="newacct-text">New to BuildID ?</span>
                    <Link color="primary" className="acc-link">
                      Create an account
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    )

}