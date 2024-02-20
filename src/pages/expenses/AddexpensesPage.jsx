import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, Select, Stack, TextField } from "@mui/material";
import { DELETE_EXPENSES_PICTURES, FETCH_EXPENSES, FETCH_USER_WORK_HISTORY, SAVE_EXPENSES, SAVE_EXPENSES_PICTURES } from "../../constant/Apipath";
import { useSelector } from "react-redux";
import { Postrequestcall } from "../../apicall/Postrequest";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import { BIBlue, BIRed } from "../../constant/Color";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxWidth: ITEM_HEIGHT + ITEM_PADDING_TOP,
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 'auto',

        }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    variant: "menu"
};

export default function AddExpensesPage() {


    const { loginData } = useSelector((state) => state?.main);
    let getLast = window.location.pathname.split("/");
    const [options, setOptions] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        expenseId: 0,
        selectedDate: dayjs(),
        selectedSite: null,
        amount: null,
        description: "",
        comments: null,
        images: [],
        deletedImages: [],
        loading: false,
        showDeleteModal: false,
    });


    useEffect(() => {
        fetchUserWorkHistory();
    }, [])


    const fetchUserWorkHistory = async () => {
        try {
            const obj = { SearchList: [{ UserId: Number(loginData?.data?.userId) }] }
            let getResponse = await Postrequestcall(FETCH_USER_WORK_HISTORY, obj, loginData?.token);
            if (getResponse?.status === 201) {
                if (getLast[3] === "edit") {
                    await getExpensesdetail(getResponse?.data?.data);
                }
                setOptions(getResponse?.data?.data);
            }
        } catch (err) {
            console.log("Error while fetching user work history :: ", err)
        }

    }

    const getExpensesdetail = async (options) => {
        const obj = {
            UserId: Number(loginData?.data?.userId),
            IncludeRecordNr: "true",
            TypeOfObjectReturned: "",
            SearchList: [{ UserId: Number(loginData?.data?.userId), id: getLast[4] }],
            SortList: [],
        };
        const fetchExpensesRes = await Postrequestcall(FETCH_EXPENSES, obj, loginData?.token);
        if (fetchExpensesRes.status === 200) {
            console.log("fetchExpensesRes", fetchExpensesRes);
            if (fetchExpensesRes?.data?.data?.length > 0) {
                let getExpenses = fetchExpensesRes?.data?.data[0];
                let sitedetail = options.map((item)=> item.siteId === getExpenses?.siteId)
                setFormData({
                    ...formData,
                    expenseId: getExpenses?.id,
                    selectedDate: dayjs(getExpenses?.expenseDate),
                    selectedSite: sitedetail?.length > 0 ? sitedetail[0] : null,
                    amount: getExpenses?.totalAmount,
                    description: getExpenses?.description,
                    comments: getExpenses?.comments,
                    images: getExpenses?.pictureList,
                })
            }
        }
    }

    const handleChooseFile = (event) => {
        const files = event.target.files;
        const pictures = [];
        Array.from(files).forEach(file => pictures.push(file));
        setFormData((prevFormData) => {
            return { ...prevFormData, images: [...prevFormData.images, ...pictures] };
        });
        event.target.value = "";
    }

    const handleInputChange = (key, value) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [key]: value };
        });
    }

    const onDeletePicturePressed = (item, getIndex) => {
        console.log("item",item)
        if (item?.pictureUrl) {
            setFormData((prevFormData) => {
                return { ...prevFormData, deletedImages: [...prevFormData.deletedImages, item] };
            });
        }
        const updatedImages = formData.images.filter((pic, i) => i !== getIndex);
        setFormData((prevFormData) => {
            return { ...prevFormData, images: updatedImages ?? [] };
        });
    }

    const onCancel = () => {
        navigate(-1);
    }

    const isButtonDisable = () => {
        return formData.selectedDate !== '' && formData.amount > 0 && formData.description.trim() != '' ? false : true
    }

    const onSaveExpenses = async () => {
        try {
            handleInputChange('loading', true);
            if (formData?.deletedImages?.length !== 0) {
                const deleteArray = formData.deletedImages.map((deletePic) => {
                    return { Id: deletePic.id }
                })
                const deleteObj = {
                    UserId: Number(loginData?.data?.userId),
                    ReturnRecordId: false,
                    ReturnRecordError: true,
                    DeleteList: deleteArray
                }
                await Postrequestcall(DELETE_EXPENSES_PICTURES, deleteObj, loginData?.token);
            }
            const saveExpensObj = {
                UserId: Number(loginData?.data?.userId),
                ReturnRecordId: true,
                ReturnRecordError: true,
                SaveList: [
                    {
                        Id: formData.expenseId,
                        ExpenseDate: formData.selectedDate,
                        TotalAmount: formData.amount,
                        Description: formData.description,
                        SiteId: formData?.selectedSite?.siteId || 0,
                        Comments: formData.comments,
                        IsSent: false,
                        ModifiedBy: Number(loginData?.data?.userId)
                    }
                ]
            }
            const saveExpensesRes = await Postrequestcall(SAVE_EXPENSES, saveExpensObj, loginData?.token);
            const pictureListToSave = formData.images?.filter((pic) => !pic.pictureUrl);
            if (pictureListToSave && pictureListToSave.length > 0) {
                const promises = pictureListToSave.map(async (img) => {
                    const formData1 = new FormData();
                    formData1.append('Id', 0);
                    formData1.append('ExpenseId', saveExpensesRes?.data?.data?.[0].objData?.id ?? formData?.expenseId);
                    formData1.append('PictureUrl', img);
                    formData1.append('ModifiedBy', Number(loginData?.data?.userId));
                    await Postrequestcall(SAVE_EXPENSES_PICTURES, formData1, loginData?.token, "formData").catch(err => {
                        if (err === "Content Inappropriate") {
                            alert('The text picture you entered has been automatically identified as inappropriate. Please remove the content and try again.')
                        }
                    })
                })
                await Promise.all(promises);
            }
            handleInputChange('loading', false);
            navigate(-2);
        } catch (error) {
            navigate(-2);
            handleInputChange('loading', false);
            console.log("Error while saving expenses :: ", error)
        }
    }

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">{getLast[3] === "edit" ? "Edit" : "Add"} Expenses</h4>
                </Grid>
            </Grid>
            <div className="add-timesheet">
                <Grid container alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={6} lg={10}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select Date"
                                value={formData.selectedDate}
                                onChange={(date) => {
                                    handleInputChange('selectedDate', date)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12}>
                        <Grid container className="job-grid">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <FormControl fullWidth>
                                        <InputLabel className="timesheet-label">Site (Optional)</InputLabel>
                                        <Select
                                            label="Site (Optional)"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.selectedSite}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                handleInputChange('selectedSite', value)
                                            }}
                                            MenuProps={MenuProps}
                                            style={{ width: '100%' }}
                                            className="site-options"
                                        >
                                            {options.map((option) => {
                                                return (
                                                    <MenuItem key={option.id} value={option}>
                                                        <ListItemText className="selected-item" primary={option.siteName}
                                                            secondary={option.address}
                                                        />
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4} >
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        placeholder="0.00"
                                        label="Amount"
                                        fullWidth
                                        value={formData.amount}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            handleInputChange('amount', value)
                                        }}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> $ </InputAdornment>) }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                                <TextField label="Description"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => {
                                        handleInputChange("description", e.target.value);
                                    }}
                                    value={formData?.description}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                                <TextField
                                    label="Comments (Optional)"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => { handleInputChange('comments', e.target.value) }}
                                    value={formData?.comments}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} sm={12} lg={12}>
                                <div className="store-cards-container">
                                    <div className="upload-image" onClick={() => { fileInputRef.current.click(); }}>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleChooseFile}
                                            ref={fileInputRef}
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
                                    {formData.images.map((item, index) => {
                                        return (
                                            <div key={index} className="store-card-image" >
                                                <span className="store-card-colse-icon" >
                                                    <CloseIcon className="store-card-colse-icon-color" onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeletePicturePressed(item, index)
                                                    }} />
                                                </span>
                                                <img src={item.pictureUrl ? item.pictureUrl : URL.createObjectURL(item)} alt="Expenses"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        handleInputChange('activeImage', index)
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12} marginTop={"15px"}>
                        <Stack flexDirection={"row"} justifyContent={"end"} gap={1}>
                            {formData?.expenseId ? (
                                <>
                                    <Button variant="outlined" style={{ color: BIRed, borderColor: BIRed }}
                                        onClick={() => {
                                            handleInputChange('showDeleteModal', true);
                                        }}
                                    >Delete</Button>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: BIBlue }}
                                        onClick={onSaveExpenses}
                                    >Save</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                                    <Button
                                        variant="contained"
                                        disabled={isButtonDisable()}
                                        style={!isButtonDisable() ? { backgroundColor: BIBlue } : {}}
                                        onClick={onSaveExpenses}
                                    >
                                        Save</Button>
                                </>
                            )
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </div>

        </>
    )

}