import { Box, Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import buildLogo from "../assets/images/build_id_logo.png";
import loginBanner from "../assets/images/login_banner.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ISVALID_RESETCODE } from "../constant/Apipath";
import { Getrequestcall } from "../apicall/Getrequest";

export default function EmailVerification() {

    const [inputValue, setInputvalue] = useState({
        email: "",
        verificationCode: ""
    })
    const navigate = useNavigate();

    const inputValuechange = (e) => {
        setInputvalue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleVerifyClick = async () => {
        let url = ISVALID_RESETCODE + `${inputValue?.email}` + "/" + `${inputValue?.verificationCode}`;
        let getverifyresponse = await Getrequestcall(url,null);
        if (getverifyresponse?.status === 200) {
            navigate("/");
        }
    };


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
                <h6 className="auth-heading">Verify Email</h6>
                <Stack spacing={2}>
                    <Box>
                        <InputLabel className="input-label">
                            Email
                        </InputLabel>
                        <TextField size="small" name="email" onChange={(e) => inputValuechange(e)} value={inputValue?.email} fullWidth id="my-input" />
                    </Box>
                    <Box>
                        <InputLabel className="input-label">
                            Verification code
                        </InputLabel>
                        <TextField size="small" name="verificationCode" onChange={(e) => inputValuechange(e)} value={inputValue?.verificationCode} fullWidth id="my-input" />
                    </Box>
                </Stack>
                <Stack direction="row" className="footer-stack forgot-stack" spacing={2}>
                    <Link color="primary" className="forgot-link" to="/login">
                        Back
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={false}
                        className="signin-btn"
                        size="large"
                        onClick={handleVerifyClick}
                    >
                        Verify
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )

}