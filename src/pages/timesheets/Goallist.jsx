import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Postrequestcall } from "../../apicall/Postrequest";
import { FETCH_GOALS } from "../../constant/Apipath";
import { List, ListItem, ListItemButton, Modal, Stack } from "@mui/material";

export default function Goallist(props) {

    const { loginData } = useSelector((state) => state?.main);
    const [goallist,setGoallist] = useState([]);

    useEffect(() => {
        if(props.showGoals === true) {
            getGoallist();
        }
    }, [props.showGoals])

    const getGoallist = async () => {
        try {
            const obj = {
                PageNr: 1,
                NrOfRecPerPage: 10,
                FullSearch: "",
                UserId: Number(loginData?.data?.userId),
                IncludeRecordNr: true,
                SearchList: [{ createdBy: Number(loginData?.data?.userId) }],
            }
            let res = await Postrequestcall(FETCH_GOALS, obj, loginData?.token);
            if(res.status === 200) {
                console.log("response", res);
                setGoallist(res?.data?.data);
            }
        } catch (error) {
            console.log("Error while fetching user goals list :: ", error)
        }
    }

    const goallistClose = () => {
          props.setShowgoals(false)
    }

    const selectRequiredGoal = (item) => {
         
    }

    return (
        <Modal
            open={props.showGoals}
            onClose={() => goallistClose()}
        >
            <div className="joblist-content">
                <List className="joblist">
                    {console.log("goallist",goallist)}
                 {goallist?.map((item) => {
                        return (
                            <ListItem
                                key={item?.id}
                                disablePadding
                                className="list-item"
                                onClick={() => selectRequiredGoal(item)}
                            >
                                <ListItemButton className="list-content">
                                    <Stack display={"flex"} flexDirection={"column"}>
                                        <h5 className="comp-name">{item?.name}</h5>
                                        {/* <p className="site-address">{item?.address}</p> */}
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