import { Box, Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import buildLogo from "../assets/images/build_id_logo.png";
import loginBanner from "../assets/images/login_banner.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Postrequestcall } from "../apicall/Postrequest";
import { LOGIN } from "../constant/Apipath";
import CryptoJS from 'crypto-js';
import { useDispatch } from "react-redux";
import { setLogindata } from "../redux/actions/actions";


export default function Login() {

    const [inputValue, setInputvalue] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputValuechange = (e) => {
        setInputvalue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const navigateTohome = async () => {
        const hash = CryptoJS.SHA256(inputValue?.password).toString();
        const loginObj = {
            Email: inputValue?.email,
            Password: hash,
            DeviceName: "Dell",
            NotifyToken: "Test12333",
            Platform: "windows",
        }
        let getLoginresponse = await Postrequestcall(LOGIN, loginObj, null); // Get token from login api
        if (getLoginresponse.status === 200) {
            let signIndata = {
                token: getLoginresponse?.data?.data?.token,
                data: getLoginresponse?.data?.data
            }
            dispatch(setLogindata(signIndata));
            navigate("/main/home");
        }
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
                        <TextField size="small" name="email" onChange={(e) => inputValuechange(e)} value={inputValue?.email} fullWidth id="my-input" />
                    </Box>
                    <Box>
                        <InputLabel className="input-label">
                            Password
                        </InputLabel>
                        <TextField size="small" name="password" onChange={(e) => inputValuechange(e)} value={inputValue?.password} fullWidth id="my-input" />
                    </Box>
                </Stack>
                <Stack direction="row" className="footer-stack forgot-stack" spacing={2}>
                    <Link color="primary" className="forgot-link" to="/forgot-password">
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
                <Stack direction="row" className="footer-stack new-account" style={{ justifyContent: "start" }} spacing={2}>
                    <span className="newacct-text">New to BuildID ?</span>
                    <Link color="primary" to="/register" className="acc-link">
                        Create an account
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    )

}