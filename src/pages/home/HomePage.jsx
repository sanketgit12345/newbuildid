import "../home/HomePage.css";
import React, { useEffect, useState } from "react";
import { red } from '@mui/material/colors';
import getImage from "../../assets/images/post-icon.jpg";
import getPostimg from "../../assets/images/post-card-first.jpg";
import getPostsecond from "../../assets/images/post-card-third.jpg";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { GETPOSTS_NEWSFEED } from "../../constant/Apipath";
import { Getrequestcall } from "../../apicall/Getrequest";
import { BIBlue } from "../../constant/Color";
import {
	PushPin as PushPinIcon,
	MoreVert as MoreVertIcon,
	BusinessCenter as BusinessCenterIcon,
	Room as RoomIcon,
	Build as BuildIcon,
	Edit as EditIcon,
} from '@mui/icons-material';

export default function HomePage() {

    const { loginData } = useSelector((state) => state?.main);
    const [postData, setPostdata] = useState([]);
    const [activeList, setActivelist] = useState("All");

    useEffect(() => {
        getList("All");
    }, [])


    const getList = async (active) => {
        let url = GETPOSTS_NEWSFEED + `${loginData?.data?.userId}` + "/" + `${active}` + "/" + 1 + "/" + 7
        let getPostlistreponse = await Getrequestcall(url, loginData?.token);
        console.log("getpost", getPostlistreponse);
        if (getPostlistreponse.status === 200) {
            setPostdata(getPostlistreponse?.data?.data);
        }
    }

    const callCurrentlist = (active) => {
        setActivelist(active);
        getList(active);
    }

    const getPostIcon = (postIcon) => {
        switch (postIcon) {
            case "Briefcase": return <Stack alignItems={"center"}><BusinessCenterIcon sx={{ fontSize: "50px", color: BIBlue }} /></Stack>;
            case "Map Pin": return <Stack alignItems={"center"}><RoomIcon sx={{ fontSize: "50px", color: BIBlue }} /></Stack>;
            case "Wrench": return <Stack alignItems={"center"}><BuildIcon sx={{ fontSize: "50px", color: BIBlue }} /></Stack>;
            case "Pencil": return <Stack alignItems={"center"}><EditIcon sx={{ fontSize: "50px", color: BIBlue }} /></Stack>;
            default: return;
        }
    }

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button className={`ticket-btn ${activeList === "All" ? "active" : ""}`} onClick={() => callCurrentlist("All")}>All</Button>
                <Button variant="outlined" className={`ticket-btn ${activeList === "Sites" ? "active" : ""}`} onClick={() => callCurrentlist("Sites")}>Sites</Button>
                <Button className={`ticket-btn ${activeList === "Products" ? "active" : ""}`} onClick={() => callCurrentlist("Products")}>Products</Button>
                <Button variant="outlined" className={`ticket-btn ${activeList === "Trades" ? "active" : ""}`} onClick={() => callCurrentlist("Trades")}>Trades</Button>
            </Stack>
            <Grid container spacing={1} rowGap={2} className="post-grid">
                {postData.map((item) => (
                    <Grid item sm={6} md={4} lg={4}>
                        <Card sx={{ maxWidth: 360 }} className="post-card">
                            <CardHeader
                                avatar={
                                    <Avatar style={{ height: "50px", width: "50px" }} src={item?.postedByPictureUrl} sx={{ bgcolor: red[500] }} aria-label="recipe" />
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={item?.appId === 25 ? item?.postedByFirstName + " " + item?.postedByLastName : item?.appRecordName}
                                subheader={
                                    item?.appId === 2 || item?.appId === 7 ? (
                                        <Stack direction={"column"}>
                                            <span>{item?.postedByFirstName + " " + item?.postedByLastName}
                                                {item?.tradeName !== "" && " " + "(" + item?.tradeName + ")"}
                                            </span>
                                            <span>{item?.age}</span>
                                        </Stack>
                                    ) : (
                                        <Stack direction={"column"}>
                                            <span>
                                                {item?.tradeName}
                                            </span>
                                            <span>{item?.age}</span>
                                        </Stack>
                                    )
                                }
                            />
                            {
                                item?.pictureList?.length > 0 ? (
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={item?.pictureList[0]?.pictureUrl}
                                        alt="Paella dish"
                                    />
                                ) : (
                                       getPostIcon(item?.icon)
                                )
                            }
                            {/* {
                                item?.appId === 2 && ( */}
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {item?.message}
                                        </Typography>
                                    </CardContent>
                                {/* )
                            } */}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>

    )
}