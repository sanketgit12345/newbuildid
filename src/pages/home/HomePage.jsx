import "../home/HomePage.css";
import React from "react";
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getImage from "../../assets/images/post-icon.jpg";
import getPostimg from "../../assets/images/post-card-first.jpg";
import getPostsecond from "../../assets/images/post-card-third.jpg";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Stack } from "@mui/material";

export default function HomePage() {


    return (
        <>
           <Stack direction="row" spacing={2}>
                <Button className="ticket-btn active">All</Button>
                <Button variant="outlined" className="ticket-btn">Sites</Button>
                <Button className="ticket-btn">Products</Button>
                <Button variant="outlined" className="ticket-btn">Trades</Button>
            </Stack>
            <Grid container spacing={1} rowGap={2} className="post-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item sm={6} md={4} lg={4}>
                    <Card sx={{ maxWidth: 360 }} className="post-card">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={getImage}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
       
    )
}