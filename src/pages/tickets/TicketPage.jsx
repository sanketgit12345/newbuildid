import React from "react";
import "./TicketPage.css"
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Stack } from "@mui/material";
import getPostimg from "../../assets/images/post-card-first.jpg";

export default function TicketPage() {

    

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">Tickets</h4>
                </Grid>
            </Grid>
            <div className="contact-list">
                <div>
                    <Stack direction="row" spacing={2}>
                        <Button className="ticket-btn active">My Tickets</Button>
                        <Button variant="outlined" className="ticket-btn">Shared with me</Button>
                    </Stack>
                    <Grid container spacing={2} className="ticket-grid" marginTop={0}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid item xs={12} sm={6} md={3} lg={3} className="ticket-item">
                                <Card sx={{ maxWidth: 345 }} className="ticket-card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={getPostimg}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <h6 className="ticket-title">Problems has solution</h6>
                                            <span className="ticket-date">Sun, Dec 17, 2023</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                </div>
            </div>
        </>
    )

}