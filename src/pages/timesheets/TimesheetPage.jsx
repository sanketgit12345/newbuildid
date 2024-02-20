import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import "../timesheets/TimesheetPage.css";
import { useNavigate } from "react-router-dom";
import { Postrequestcall } from "../../apicall/Postrequest";
import { FETCH_TIMESHEETS } from "../../constant/Apipath";
import { useSelector } from "react-redux";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


export default function TimesheetPage() {

    const navigate = useNavigate();
    const { loginData } = useSelector((state) => state?.main);

    const [timeSheetlist, setTimesheetlist] = useState([]);
    const [activeList, setActivelist] = useState("unsent")

    useEffect(() => {
        fetchTimesheets("unsent");
    }, [])

    const fetchTimesheets = async (flag) => {
        const obj = {
            PageNr: 1,
            NrOfRecPerPage: 100,
            FullSearch: "",
            UserId: loginData?.data?.userId,
            IncludeRecordNr: true,
            TypeOfObjectReturned: "",
            SearchList: [{ UserId: loginData?.data?.userId }],
            SortList: [
                {
                    FieldName: "Id",
                    Direction: "DESC"
                }
            ]
        }
        let getResponse = await Postrequestcall(FETCH_TIMESHEETS, obj, loginData?.token);
        if (getResponse.status === 200) {
            if (flag === "unsent") {
                let getSentTimesheet = getResponse?.data?.data?.filter((item) => item.isSent === false);
                setTimesheetlist(getSentTimesheet);
            } else {
                let getSentTimesheet = getResponse?.data?.data?.filter((item) => item.isSent === true);
                setTimesheetlist(getSentTimesheet);
            }
        }
    }

    const addTimesheet = () => {
        navigate("add");
    }

    const getTimsheetlist = (flag) => {
        setActivelist(flag)
        fetchTimesheets(flag)
    }

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">Timesheets</h4>
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
                                <Button className={`ticket-btn ${activeList === "unsent" ? "active" : ""}`} onClick={() => getTimsheetlist("unsent")}>Unsent</Button>
                                <Button variant="outlined" className={`ticket-btn ${activeList === "sent" ? "active" : ""}`} onClick={() => getTimsheetlist("sent")}>Sent</Button>
                            </Stack>
                            <Button className="ticket-btn active" onClick={() => addTimesheet()}>Add Timesheet</Button>
                        </Stack>
                        {timeSheetlist?.length > 0 ? (
                            <div className="list-content">
                                {timeSheetlist.map((item) => (
                                    <Accordion className="list-item">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="acc-summary"
                                        >
                                            <Typography className="title">{moment(item.timesheetDate).format("MMMM DD, YYYY")}</Typography>
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
                        ) : (
                            <Stack className="no-data">
                                <CalendarMonthIcon className="timesheet-icon" />
                                <span className="no-text" style={{color:"#8D8D8D"}}>You don't have any Timesheets.</span>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </div >
        </>
    )

}