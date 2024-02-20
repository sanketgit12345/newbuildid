import "../home/HomePage.css";
import React, { useEffect, useState } from "react";
import { red } from '@mui/material/colors';
import defaultPostimg from "../../assets/images/post_default.jpg";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { GETPOSTS_NEWSFEED } from "../../constant/Apipath";
import { Getrequestcall } from "../../apicall/Getrequest";
import { BIBlue } from "../../constant/Color";
import {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getList = async (active) => {
        let url = `${GETPOSTS_NEWSFEED}${loginData?.data?.userId}/${active}/1/7`
        let getPostlistreponse = await Getrequestcall(url, loginData?.token);
        console.log("getpost", getPostlistreponse);
        if (getPostlistreponse.status === 200) {
            console.log("getlist", getPostlistreponse?.data?.data);
            setPostdata(getPostlistreponse?.data?.data);
        }
    }

    const callCurrentlist = (active) => {
        setActivelist(active);
        getList(active);
    }

    const getPostIcon = (postIcon) => {
        switch (postIcon) {
            case "Briefcase": return <Stack alignItems={"center"} height={195} justifyContent={"center"}><BusinessCenterIcon sx={{ fontSize: "130px", color: BIBlue }} /></Stack>;
            case "Map Pin": return <Stack alignItems={"center"} height={195} justifyContent={"center"}><RoomIcon sx={{ fontSize: "130px", color: BIBlue }} /></Stack>;
            case "Wrench": return <Stack alignItems={"center"} height={195} justifyContent={"center"}><BuildIcon sx={{ fontSize: "130px", color: BIBlue }} /></Stack>;
            case "Pencil": return <Stack alignItems={"center"} height={195} justifyContent={"center"}><EditIcon sx={{ fontSize: "130px", color: BIBlue }} /></Stack>;
            default: return;
        }
    }

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button className={`ticket-btn ${activeList === "All" ? "active" : ""}`} onClick={() => callCurrentlist("All")}>All</Button>
                <Button variant="outlined" className={`ticket-btn ${activeList === "Projects" ? "active" : ""}`} onClick={() => callCurrentlist("Projects")}>Projects</Button>
                <Button className={`ticket-btn ${activeList === "Trades" ? "active" : ""}`} onClick={() => callCurrentlist("Trades")}>Trades</Button>
                <Button variant="outlined" className={`ticket-btn ${activeList === "Products" ? "active" : ""}`} onClick={() => callCurrentlist("Products")}>Products</Button>
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
                                    item?.appId === 2 || item?.appId === 7 || item?.appId === 4 || item?.appId === 24 ? (
                                        <Stack direction={"column"}>
                                            <span>{item?.postedByFirstName + " " + item?.postedByLastName}
                                                {item?.tradeName !== "" && ` (${item?.tradeName})`}
                                            </span>
                                            <span>{item?.age}</span>
                                        </Stack>
                                    ) : (
                                        <Stack direction={"column"}>
                                            <span className="trade-name">
                                                {item?.tradeName}
                                            </span>
                                            <span>{item?.age}</span>
                                        </Stack>
                                    )
                                }
                            />
                            {
                                (item?.icon === null || item?.icon === "") &&
                                (
                                    <CardMedia
                                        component="img"
                                        height={item?.pictureList?.length > 0 ? "194" : "215"}
                                        image={item?.pictureList?.length > 0 ? item?.pictureList[0]?.pictureUrl : defaultPostimg}
                                        onError={(e) => { e.target.src = defaultPostimg }}
                                    />
                                )
                            }
                            {getPostIcon(item?.icon)}
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {
                                        item?.message !== "<<<picture>>>" && (
                                            item?.message
                                        )
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}