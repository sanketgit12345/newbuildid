import React, { useState } from "react";
import "./Mainlayout.css";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Grid } from "@mui/material";
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getImage from "../assets/images/post-icon.jpg";
import getPostimg from "../assets/images/post-card-first.jpg";
import getPostsecond from "../assets/images/post-card-third.jpg";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import ContactsPage from "../pages/buildernetwork/ContactsPage";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function Mainlayout() {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Sidebar />
                <Box component="main" className="main-content" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Container fixed>
                        <ContactsPage />
                        {/* <Grid container spacing={1} rowGap={2} className="post-grid">
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
                                        image={getPostimg}
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
                                        image={getPostsecond}
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
                                        image={getPostimg}
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
                                        image={getPostsecond}
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
                        </Grid>
                       */}
                    </Container>
                </Box>
            </Box>
        </>
    )

}