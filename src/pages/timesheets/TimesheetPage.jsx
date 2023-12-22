import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { BIBlue } from "../../constant/Color";
import "../timesheets/TimesheetPage.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TimesheetPage() {

    const tabsArray = ["unsent", "sent"];
    const [activeTab, setActiveTab] = useState("unsent");

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    }

    return (
        <div className="page">
            <div className="header">
                <div className="page-content">
                    <h1 className="heading">Timesheets</h1>
                </div>
            </div>
            <div className="detail-info">
                <Grid container spacing={2} className="timesheet-grid">
                    <Grid item xs={4}>
                        <Card style={{ padding: '15px' }}>
                            <Button variant="contained"
                                style={{ background: BIBlue,float:"right" }}>Edit</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="grid-content">
                            <Tabs
                                textColor="primary"
                                indicatorColor="primary"
                                value={activeTab}
                                onChange={handleTabChange}>
                                {
                                    tabsArray.map((tab, index) => (
                                        <Tab key={index} value={tab} label={tab}
                                            style={{ backgroundColor: 'white', borderRadius: '5px', marginRight: '20px', }} />
                                    ))
                                }
                            </Tabs>
                            <div className="action-btn">
                                {activeTab === "unsent" && <div className="input-container">
                                    <Button
                                        variant="contained"
                                        style={{ background: BIBlue }}
                                    >
                                        Add Timesheet
                                    </Button>
                                </div>}
                                <div className="input-container">
                                    <Button
                                        variant="contained"
                                        disabled={true}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="list-content" style={{ marginTop: "10px" }}>
                            <Accordion className="list-item">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>November 27, 2023</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="list-item">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>November 04, 2023</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="list-item">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>November 04, 2023</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    )

}