import { Button, Grid, IconButton, Input, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import "./TimesheetPage.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CloseIcon from '@mui/icons-material/Close';
import placeholder_img from "../../assets/images/placeholder-img.jpg";
import JoblistPage from "./JoblistPage";
import dayjs from 'dayjs';
import { Postrequestcall } from "../../apicall/Postrequest";
import { useSelector } from "react-redux";
import { SAVE_TIMESHEETS, SAVE_TIMESHEETS_ENTRIES, SAVE_TIMESHEETS_PICTURES } from "../../constant/Apipath";
import { Fileuploadrequestcall } from "../../apicall/Fileuploadrequest";
import AddIcon from '@mui/icons-material/Add';
import { BIBlue, BIGrey } from "../../constant/Color";
import HelpIcon from "@mui/icons-material/Help";
import Goallist from "./Goallist";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function AddtimesheetPage() {

    const [showJoblist, setShowjoblist] = useState(false);
    const [showGoals, setShowgoals] = useState(false);
    const [selectedJob, setSelectedjob] = useState([]);
    const { loginData } = useSelector((state) => state?.main);
    const [timesheetInfo, setTimesheetinfo] = useState({
        id: 0,
        timesheetDate: dayjs(),
        totalHours: "0:0",
        totalDistance: 0,
        unitOfDistance: "km",
        isSent: false,
    })

    const onTimechange = (newValue, index) => {
        selectedJob[index].hours = newValue.toDate();
        setSelectedjob(selectedJob);
        let totalhours = "";
        let totalmin = "";
        selectedJob.map((item) => {
            // let getValue = item.hours.hour();
            const formattedTime = dayjs(item.hours).format('hh:mm');
            let getTime = formattedTime.split(":");
            if (getTime.length > 0) {
                totalhours = totalhours + getTime[0];
                totalmin = totalmin + getTime[1];
            }
        });
        setTimesheetinfo({
            ...timesheetInfo,
            totalHours: totalhours + ":" + totalmin
        })
    }

    const onDistancechange = (e, index) => {
        const updatedSelectedJob = selectedJob.map((item, i) => i === index ? { ...item, distance: e.target.value } : item);
        const totalDistance = updatedSelectedJob.reduce((total, item) => total + Number(item.distance), 0)
        setTimesheetinfo({
            ...timesheetInfo,
            totalDistance: totalDistance
        })
        setSelectedjob(updatedSelectedJob);
    }

    const onCommentchange = (e, index) => {
        const updatedSelectedJob = selectedJob.map((item, i) => i === index ? { ...item, comments: e.target.value } : item);
        setSelectedjob(updatedSelectedJob);
    }

    const handleDateChange = (date) => {
        // Handle the date change here
        setTimesheetinfo({
            ...timesheetInfo,
            timesheetDate: date
        })
    };

    const openFilepicker = () => {
        document.getElementById("timesheetimg-upload").click();
    }

    const handleChooseFile = (event, index) => {
        const file = event.target.files[0];
        let getFiles = [...selectedJob[index]?.uploadImage]
        getFiles.push(file);
        selectedJob[index].uploadImage = getFiles;
        let getImages = [...selectedJob];
        setSelectedjob(getImages);
        event.target.value = "";
    }

    const onDeletePicturePressed = (e, parentIndex, getIndex) => {
        e.preventDefault();
        let getFiles = [...selectedJob[parentIndex]?.uploadImage];
        getFiles = getFiles.filter((item, index) => index !== getIndex);
        selectedJob[parentIndex].uploadImage = getFiles;
        let getImages = [...selectedJob];
        setSelectedjob(getImages);
    }

    const viewJoblist = () => {
        setShowjoblist(true);
    }

    const removeCurrentTimesheet = (getIndex) => {
        let getUpdatedlist = selectedJob.filter((item, index) => index !== getIndex);
        setSelectedjob(getUpdatedlist);
    }

    const onSaveTimesheet = async () => {
        const obj = {
            UserId: loginData?.data?.userId,
            ReturnRecordId: true,
            ReturnRecordError: true,
            SaveList: [
                {
                    Id: timesheetInfo?.id,
                    TimesheetDate: dayjs(timesheetInfo?.timesheetDate).format('YYYY-MM-DD'),
                    TotalHours: timesheetInfo?.totalHours?.toString()?.replace(":", "."),
                    TotalDistance: timesheetInfo?.totalDistance,
                    UnitOfDistance: timesheetInfo?.unitOfDistance,
                    IsSent: timesheetInfo?.isSent,
                    ModifiedBy: loginData?.data?.userId
                }
            ]
        }
        const timesheetData = await Postrequestcall(SAVE_TIMESHEETS, obj, loginData?.token);
        if (timesheetData.status === 201) {
            let getUpdateddata = selectedJob.map((item) => {
                return {
                    Id: item?.isNew ? 0 : item?.id,
                    TimesheetId: timesheetData?.data?.data[0]?.objData?.id,
                    SiteId: item.siteId,
                    Hours: item?.hours != '' ? dayjs(item.hours).format('hh.mm') : 0,
                    Distance: item?.distance != '' ? item?.distance : 0,
                    UnitOfDistance: timesheetInfo?.unitOfDistance,
                    Comments: item?.comments,
                    CompanyId: item?.companyId,
                    ModifiedBy: loginData?.data?.userId
                }
            })
            const finalEntriesObj = {
                UserId: loginData?.data?.userId,
                ReturnRecordId: true,
                ReturnRecordError: true,
                SaveList: getUpdateddata
            }
            const savedEntry = await Postrequestcall(SAVE_TIMESHEETS_ENTRIES, finalEntriesObj, loginData?.token);
            if (savedEntry.status === 201) {
                selectedJob.forEach(item => {
                    item.uploadImage.map(async (image) => {
                        const formData = new FormData();
                        formData.append('Id', 0);
                        formData.append('TimeSheetId', timesheetData?.data?.data[0]?.objData?.id);
                        formData.append('TimeSheetEntryId', item?.isNew ? savedEntry?.data?.data[0]?.objData?.id : item?.id);
                        formData.append('SiteId', item?.siteId);
                        formData.append('ModifiedBy', loginData?.data?.userId);
                        formData.append('PictureUrl', image)
                        await Fileuploadrequestcall(SAVE_TIMESHEETS_PICTURES, formData, loginData?.token);
                    })
                });
            }
        }
    }

    const openGoalslist = () => {
        setShowgoals(true);
    }

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">Add Timesheet</h4>
                </Grid>
            </Grid>
            <div className="add-timesheet">
                <Grid container alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={6} lg={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={timesheetInfo?.timesheetDate} onChange={handleDateChange} className="timesheet-picker" label="Timesheet Date" slotProps={{ textField: { size: 'medium' } }} />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sm={12} md={6} lg={4} textAlign={"end"}>
                        <Stack className="total-calc">
                            <Stack className="total-hours" direction={"row"}>
                                <h5 className="total">Total :</h5>
                                <span className="value" style={{ marginLeft: "3px" }}>{timesheetInfo?.totalHours}</span>
                            </Stack>
                            <Stack className="total-distance" direction={"row"}>
                                <h5 className="total">Distance :</h5>
                                <span className="value" style={{ marginLeft: "3px" }}>{timesheetInfo?.totalDistance}</span>
                            </Stack>
                            <Button className="ticket-btn active" onClick={() => viewJoblist()}>Add Job</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12}>
                        {selectedJob.length === 0 ?
                            (<Stack flexDirection={"column"} className="add-job-place">
                                <BusinessCenterIcon className="business-icon" />
                                <span className="icon-text">Add a Job to get started with this Timesheet</span>
                            </Stack>) :
                            (selectedJob.map((item, parentIndex) => (
                                <Grid container className="job-grid">
                                    <Grid item xs={12} sm={12} md={6} lg={10} className="post-info">
                                        <h4 className="comp-name">{item?.companyName}</h4>
                                        <Stack direction={"row"} gap={1} marginTop={"12px"}>
                                            <img onError={(event) => event.target.src = placeholder_img} src={item?.mainPictureUrl !== "" ? item?.mainPictureUrl : placeholder_img} className="post-img" />
                                            <Stack direction={"column"} gap={0.5}>
                                                <h5 className="post-name">{item?.siteName}</h5>
                                                <span className="post-address">{item?.address}</span>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={2} textAlign={"-webkit-right"}>
                                        <div className="close-post" onClick={() => removeCurrentTimesheet(parentIndex)}>
                                            <CloseIcon style={{ color: "red" }} className="close-icon" />
                                        </div>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6} lg={4} marginTop={"15px"}>
                                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker
                                                        key={parentIndex}
                                                        label="Hour"
                                                        format="hh:mm"
                                                        value={dayjs(item?.hours)}
                                                        onChange={(newValue) => onTimechange(newValue, parentIndex)}
                                                    />
                                                </LocalizationProvider>
                                                <span className="required-text">{"(Required)"}</span>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={2} marginTop={"15px"}>
                                            <TextField label="Distance" onWheel={(e) => e.target.blur()} type="number" value={item?.distance} name="distance" onChange={(e) => onDistancechange(e, parentIndex)} variant="outlined" />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} marginTop={"15px"} className="goals-list">
                                        {[1, 2, 3, 4].map((item, index) => (
                                            <Stack flexDirection={"row"} alignItems={"center"} gap={2} style={{ marginTop: index > 0 ? "10px" : 0 }} >
                                                <DeleteIcon style={{ cursor: "pointer" }} htmlColor="#f50505" />
                                                <Input
                                                    type={"text"}
                                                    value={"123"}
                                                    className="goal-input"
                                                    size="medium"
                                                    disabled={true}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton edge="end">
                                                                <ArrowDropDownIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileTimePicker slotProps={{ textField: { size: "small" } }} defaultValue={dayjs('2022-04-17T15:30')} />
                                                </LocalizationProvider>
                                            </Stack>
                                        ))
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={12}>
                                        <Stack flexDirection={"row"} alignItems={"center"} gap={1} margin={"5px 0px"}>
                                            <Button style={{ color: BIBlue }} startIcon={<AddIcon />} onClick={() => openGoalslist()}>
                                                Add Goal
                                            </Button>
                                            <HelpIcon style={{ color: BIGrey, cursor: 'pointer', fontSize: '18px' }} />
                                        </Stack>
                                        <TextField
                                            label="Comments (Optional)"
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            fullWidth
                                            value={item?.comments}
                                            onChange={(e) => onCommentchange(e, parentIndex)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={12}>
                                        <div className="store-cards-container">
                                            <div className="upload-image" onClick={(e) => openFilepicker(e)}>
                                                <input
                                                    id="timesheetimg-upload"
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={(e) => handleChooseFile(e, parentIndex)}
                                                    hidden />
                                                <Button
                                                    style={{ width: '100%', padding: 0, }}
                                                    variant="text"
                                                    color="primary"
                                                    size="small"
                                                    component="label">
                                                    Upload Image
                                                </Button>
                                            </div>
                                            {item?.uploadImage?.map((item, index, arr) => {
                                                return (
                                                    <div key={index} className="store-card-image" >
                                                        <span className="store-card-colse-icon" >
                                                            <CloseIcon className="store-card-colse-icon-color" onClick={(e) => onDeletePicturePressed(e, parentIndex, index)} />
                                                        </span>
                                                        {
                                                            (item.pictureUrl !== "")
                                                                ? (<img src={URL.createObjectURL(item)} alt="Expenses" />)
                                                                : (<img style={{ display: "none" }} alt="" />)
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Grid>
                                </Grid>
                            )))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                        <Stack flexDirection={"row"} justifyContent={"end"} gap={1}>
                            <Button className="ticket-btn active" onClick={() => onSaveTimesheet()}>Save</Button>
                            <Button className="ticket-btn active">Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
            <JoblistPage selectedJob={selectedJob} setSelectedjob={setSelectedjob} showJoblist={showJoblist} setShowjoblist={setShowjoblist} />
            <Goallist showGoals={showGoals} setSelectedjob={setSelectedjob} setShowgoals={setShowgoals} />
        </>
    )

}