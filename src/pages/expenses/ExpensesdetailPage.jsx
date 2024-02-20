import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Postrequestcall } from "../../apicall/Postrequest";
import { FETCH_EXPENSES } from "../../constant/Apipath";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import Slider from "react-slick";

export default function ExpensesdetailPage() {

    let { id } = useParams();
    const navigate = useNavigate();
    const { loginData } = useSelector((state) => state?.main);
    const [detail, setDetail] = useState({});
    const [setting,setSetting] = useState({
        dots: false,
        infinite: true,                                                                                         
        speed: 500,
        slidesToShow: 7,
        slidesToScroll:1 ,
        arrows: false
    })

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const obj = {
            UserId: Number(loginData?.data?.userId),
            IncludeRecordNr: "true",
            TypeOfObjectReturned: "",
            SearchList: [{ UserId: Number(loginData?.data?.userId), id: id }],
            SortList: [],
        };
        const fetchExpensesRes = await Postrequestcall(FETCH_EXPENSES, obj, loginData?.token);
        if (fetchExpensesRes.status === 200 && fetchExpensesRes?.data?.data?.length > 0) {
            setSetting({
                ...setting,
                arrows: fetchExpensesRes?.data?.data[0]?.pictureList?.length > 7  ? true : false
            })
            setDetail(fetchExpensesRes?.data?.data[0]);
        }
    }

    const onEditExpense = () => {
        navigate(`/main/expenses/edit/${id}`);
    }

    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">{detail?.description}</h4>
                </Grid>
            </Grid>
            <Grid container className="expenses-view">
                <Grid item sm={6} md={4} xs={12} lg={12}>
                    <Slider {...setting} className="expenses-list">
                        {
                          detail?.pictureList?.map((item)=>(
                            <img src={item?.pictureUrl} alt="expense_image" className="expenses-img" style={{ cursor: 'pointer' }} />
                          ))
                        }
                    </Slider>
                </Grid>
                <Grid container className="expenses-detail" marginTop={2}>
                    <Grid item sm={6} md={4} xs={4} lg={4}>
                        <Stack style={{ width: '50%' }} gap={0}>
                            <h5 className='view-expense-key'>Date</h5>
                            <span className='view-expense-value'>
                                {moment(detail?.expenseDate).format("MMM D, YYYY")}
                            </span>
                        </Stack>
                    </Grid>
                    <Grid item sm={6} md={4} xs={4} lg={4}>
                        <Stack>
                            <h5 className='view-expense-key'>Total Amount</h5>
                            <span className='view-expense-value'>{detail?.totalAmount}</span>
                        </Stack>
                    </Grid>
                    <Grid item sm={6} md={4} xs={12} lg={12} marginTop={2}>
                        <Stack>
                            <h5 className='view-expense-key'>Description</h5>
                            <span className='view-expense-value'>{detail?.description}</span>
                        </Stack>
                    </Grid>
                    <Grid item sm={6} md={4} xs={12} lg={12} className="exaction-btn" marginTop={2}>
                        <Button variant='outlined' className="exdelete-btn">
                            Delete
                        </Button>
                        <Button variant='outlined' className="exedit-btn" onClick={onEditExpense}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}