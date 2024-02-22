import { List, Modal, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./TimesheetPage.css";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from "react-redux";
import { Postrequestcall } from "../../apicall/Postrequest";
import placeholder_img from "../../assets/images/placeholder-img.jpg";
import { FETCH_USER_WORK_HISTORY } from "../../constant/Apipath";
import dayjs from 'dayjs';

export default function JoblistPage(props) {

    const [checked, setChecked] = useState([1]);
    const [joblist, setJoblist] = useState([]);
    const { loginData } = useSelector((state) => state?.main);

    useEffect(() => {
        if(props.showJoblist === true) {
            getUserworkhistory();
        }
    }, [props.showJoblist])

    const getUserworkhistory = async () => {
        const workHistoryObj = {
            FullSearch: "",
            IncludeRecordNr: false,
            SearchList: [{ Id: 0, UserId: loginData?.data?.userId }],
            NrOfRecPerPage: 0
        }
        let userSites = await Postrequestcall(FETCH_USER_WORK_HISTORY, workHistoryObj, loginData?.token);
        if (userSites.status === 201) {
            let getUsersites = userSites?.data?.data?.filter((comp) => comp.companyId != 0 || comp.companyName != '');
            let getUniqueArray = removeDuplicate(getUsersites);
            setJoblist(getUniqueArray);
        }
    }

    const removeDuplicate = (getUsersites) => {
        const uniqueMap = new Map();
        getUsersites.forEach(item => {
            uniqueMap.set(item.siteId, item);
        });
        const uniqueArray = Array.from(uniqueMap.values());
        return uniqueArray;
    }


    const joblistClose = () => {
        props.setShowjoblist(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const selectRequiredJob = (item) => {
        let getJob = {
            ...item,
            hours: dayjs(),
            distance: 0,
            comments: "",
            uploadImage: [],
            isNew:true,
            selectedGoals: []
        }
        props.setSelectedjob([...props.selectedJob, getJob]);
        props.setShowjoblist(false);
    }

    return (
        <Modal
            open={props.showJoblist}
            onClose={() => joblistClose()}
        >
            <div className="joblist-content">
                <List className="joblist">
                    {joblist.map((item) => {
                        return (
                            <ListItem
                                key={item?.id}
                                disablePadding
                                className="list-item"
                                onClick={() => selectRequiredJob(item)}
                            >
                                <ListItemButton className="list-content">
                                    <img className="site-img" onError={(event) => event.target.src = placeholder_img} src={item?.mainPictureUrl !== "" ? item?.mainPictureUrl : placeholder_img}></img>
                                    <Stack display={"flex"} flexDirection={"column"}>
                                        <h5 className="comp-name">{item?.companyName}</h5>
                                        <h5 className="site-name">{item?.siteName}</h5>
                                        <p className="site-address">{item?.address}</p>
                                    </Stack>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </Modal>
    )

}
