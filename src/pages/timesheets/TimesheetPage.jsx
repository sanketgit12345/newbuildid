import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import "../timesheets/TimesheetPage.css";
import { useNavigate } from "react-router-dom";

export default function TimesheetPage() {


    const navigate = useNavigate();


    const addTimesheet = () => {
            navigate("add");
    }
   
    return (
        <>
            <Grid container spacing={1} rowGap={2} className="contact-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="heading">Timesheets</h4>
                </Grid>
            </Grid>
            <div className="contact-list">
                <Grid container spacing={2} className="timesheet-grid">
                    <Grid item xs={4}>
                        <div className="goal-list">
                            <Stack alignItems={"end"}>
                                <Button style={{ width: "fit-content" }} className="ticket-btn active">Edit</Button>
                            </Stack>
                            <Stack gap={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                    <h6 className="goal-name">Test Goal</h6>
                                    <span>10 / 20 hrs</span>
                                </Stack>
                                <LinearProgress variant="determinate" value={50} />
                            </Stack>
                            <Stack gap={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                    <h6 className="goal-name">Test Goal</h6>
                                    <span>10 / 20 hrs</span>
                                </Stack>
                                <LinearProgress variant="determinate" value={50} />
                            </Stack>
                            <Stack gap={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                    <h6 className="goal-name">Test Goal</h6>
                                    <span>10 / 20 hrs</span>
                                </Stack>
                                <LinearProgress variant="determinate" value={50} />
                            </Stack>
                            <Stack gap={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                    <h6 className="goal-name">Test Goal</h6>
                                    <span>10 / 20 hrs</span>
                                </Stack>
                                <LinearProgress variant="determinate" value={50} />
                            </Stack>
                            <Stack gap={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                    <h6 className="goal-name">Test Goal</h6>
                                    <span>10 / 20 hrs</span>
                                </Stack>
                                <LinearProgress variant="determinate" value={50} />
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs={8} className="timesheet-list">
                        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <Button className="ticket-btn active">Unsent</Button>
                                <Button variant="outlined" className="ticket-btn">Sent</Button>
                            </Stack>
                            <Button className="ticket-btn active"  onClick={()=>addTimesheet()}>Add Timesheet</Button>
                        </Stack>
                        <div className="list-content">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Accordion className="list-item">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        className="acc-summary"
                                    >
                                        <Typography className="title">November 27, 2023</Typography>
                                        <span className="time">1 Jobs,  4 Hours</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )

}