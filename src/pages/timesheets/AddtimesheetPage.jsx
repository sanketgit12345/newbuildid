import { Button, Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import "./TimesheetPage.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CloseIcon from '@mui/icons-material/Close';
import getPostimg from "../../assets/images/post-card-first.jpg";

export default function AddtimesheetPage() {

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="contact-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="heading">Add Timesheet</h4>
                </Grid>
            </Grid>
            <div className="add-timesheet">
                <Grid container alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={6} lg={10}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="timesheet-picker" label="Timesheet Date" slotProps={{ textField: { size: 'medium' } }} />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sm={12} md={6} lg={2} textAlign={"end"}>
                        <Button className="ticket-btn active">Add Job</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12}>
                        {/* <Stack flexDirection={"column"} className="add-job-place">
                            <BusinessCenterIcon className="business-icon" />
                            <span className="icon-text">Add a Job to get started with this Timesheet</span>
                        </Stack> */}
                        <Grid container className="job-grid">
                            <Grid item xs={12} sm={12} md={6} lg={10} className="post-info">
                                <h4 className="comp-name">ADA Architecture Inc</h4>
                                <Stack direction={"row"} gap={1} marginTop={"12px"}>
                                    <img src={getPostimg} className="post-img" />
                                    <Stack direction={"column"} gap={0.5}>
                                        <h5 className="post-name">Time T</h5>
                                        <span className="post-address">47 Panchawati Road,, Pune, MH, 411008, India</span>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={2} textAlign={"-webkit-right"}>
                                <div className="close-post">
                                    <CloseIcon style={{ color: "red" }} className="close-icon" />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} marginTop={"15px"}>
                                <Stack direction={"row"} alignItems={"center"} gap={1}>
                                    <TextField label="Hour" variant="outlined" />
                                    <span className="required-text">{"(Required)"}</span>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} marginTop={"15px"}>
                                <TextField label="Distance" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} display={"flex"} alignItems={"center"} justifyContent={"end"} textAlign={"end"} marginTop={"15px"}>
                                <Button className="ticket-btn active">Add Goal</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                                <TextField
                                    label="Comments (Optional)"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={2} marginTop={"15px"}>
                                   <div className="upload-image">
                                      <span className="image-text">Upload Image</span>
                                   </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                        <Stack flexDirection={"row"} justifyContent={"end"} gap={1}>
                            <Button className="ticket-btn active">Save</Button>
                            <Button className="ticket-btn active">Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        </>
    )

}