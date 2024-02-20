import {
  Button,
  Checkbox,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../expenses/ExpensesPage.css";
import { FETCH_EXPENSES } from "../../constant/Apipath";
import { Postrequestcall } from "../../apicall/Postrequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BIBlue, BIGrey } from "../../constant/Color";
import moment from "moment";
import DescriptionIcon from '@mui/icons-material/Description';

export default function ExpensesPage() {

  const { loginData } = useSelector((state) => state?.main);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Unsent");
  const [selectedExpense, setSelectedExpense] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [])

  const fetchExpenses = async () => {
    try {
      const obj = {
        PageNr: 1,
        NrOfRecPerPage: 100,
        FullSearch: "",
        UserId: Number(loginData?.data?.userId),
        IncludeRecordNr: "true",
        TypeOfObjectReturned: "",
        SearchList: [{ UserId: Number(loginData?.data?.userId) }],
        SortList: [
          {
            FieldName: "Id",
            Direction: "DESC",
          },
        ],
      };
      const fetchExpensesRes = await Postrequestcall(FETCH_EXPENSES, obj, loginData?.token);
      setData(fetchExpensesRes?.data?.data ?? []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while getting expenses list :: ", error)
    }
  }

  const getClassNameForBtn = (value) => {
    if (activeTab === value) {
      return "ticket-btn active"
    } else {
      return "ticket-btn"
    }
  }

  const onItemClick = (e, item) => {
    if (e.target.tagName !== 'INPUT' || e.target.type !== 'checkbox') {
      navigate(`/main/expenses/${item.id}`);
    }
  }

  const onSendClick = () => {
    if (selectedExpense.length > 0) {
      navigate(`/main/expenses/send`, { state: { data: selectedExpense } });
    }
  }

  const onCheckBoxClick = (item) => {
    const isSelected = selectedExpense.some((selectedItem) => selectedItem.id === item.id);
    if (isSelected) {
      const updatedSelection = selectedExpense.filter((selectedItem) => selectedItem.id !== item.id);
      setSelectedExpense(updatedSelection);
    } else {
      setSelectedExpense([...selectedExpense, item]);
    }
  };

  const renderList = () => {
    const expenseData = data?.filter((item) => activeTab === "Unsent" ? !item.isSent : item.isSent);
    return (
      <>
        {expenseData.length > 0 ?
          expenseData.map((item, index) => (
            <Grid container className="expenses-list" onClick={(e) => { onItemClick(e, item) }}>
              <Grid item sm={12} md={12} xs={11} lg={11} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                <Stack direction={'row'} gap={1}>
                  <Checkbox
                    checked={selectedExpense.some((selectedItem) => selectedItem.id === item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onCheckBoxClick(item)
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    style={{ color: BIBlue }}
                  />
                  <div>
                    <h5 className="expense-title">
                      {item?.description ?? ''}
                    </h5>
                    <h6 className="expense-date">
                      {moment(item.expenseDate).format('MMMM D, YYYY')}
                    </h6>
                  </div>
                </Stack>
              </Grid>
              <Grid item sm={12} md={12} xs={1} lg={1} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                <h6 className="expense-amount" style={{ color: BIBlue }}>
                  ${item?.totalAmount.toFixed(2)}
                </h6>
              </Grid>
            </Grid>
          ))
          :
          (<>
            {renderEmptyPlaceHolder(activeTab === "Unsent" ? "You don't have any unsent Expenses." : "You don't have any sent Expenses.")}
          </>
          )
        }
      </>
    )
  }

  const renderEmptyPlaceHolder = (msg) => {
    return (
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} style={{ width: '100%', marginBottom: '15px' }} >
        <DescriptionIcon className="ex-description-icon" style={{ color: BIGrey }} />
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: BIGrey }}>{msg}</p>
          <Button variant="contained" style={{ background: BIBlue, marginTop: '5px', width: '500px' }}
            onClick={() => { navigate('add') }}
          >
            Add Expense
          </Button>
        </div>
      </Stack>
    )
  }

  return (
    <>
      <Grid container spacing={1} rowGap={2} className="page-heading-grid">
        <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
          <h4 className="page-heading-title">Expenses</h4>
        </Grid>
      </Grid>
      <div className="contact-list">
        {
          !loading ?
            (
              <>
                {
                  data.length > 0 ?
                    (
                      <>
                        <Grid container spacing={2} className="expenses-grid">
                          <Grid item xs={12} className="expenses-list">
                            <Stack direction="row" justifyContent={"space-between"} spacing={2}>
                              <Stack direction="row" spacing={2}>
                                <Button className={getClassNameForBtn("Unsent")} onClick={() => {
                                  setSelectedExpense([])
                                  setActiveTab('Unsent')
                                }}>
                                  Unsent
                                </Button>
                                <Button variant="outlined" className={getClassNameForBtn("Sent")} onClick={() => {
                                  setSelectedExpense([])
                                  setActiveTab('Sent')
                                }}>
                                  Sent
                                </Button>
                              </Stack>
                              <Stack direction="row" spacing={2}>
                                <Button variant="contained" disabled={selectedExpense.length === 0}
                                  className={selectedExpense.length > 0 ? "ticket-btn active" : ""}
                                  onClick={onSendClick}>
                                  Send
                                </Button>
                                {
                                  activeTab === "Unsent" && (
                                    <>
                                      <Button className="ticket-btn active" onClick={() => { navigate('add') }}>
                                        Add Expense
                                      </Button>
                                    </>

                                  )
                                }
                              </Stack>
                            </Stack>
                            <div className="list-content">
                              {renderList()}
                            </div>
                          </Grid>
                        </Grid>
                      </>
                    )
                    : (
                      <>
                        {renderEmptyPlaceHolder("You don't have any Expenses.")}
                      </>
                    )
                }

              </>
            )
            :
            (
              <>
                <div className="expenses_loader">
                  <CircularProgress size={24} />
                </div>
              </>
            )
        }
      </div>
    </>
  )
}