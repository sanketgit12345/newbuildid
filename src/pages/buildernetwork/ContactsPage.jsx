import { Avatar, Card, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import mapIcon from "../../assets/images/map_marker.png";
import EmailIcon from '@mui/icons-material/Email';
import "./ContactsPage.css";
import profileIcon from "../../assets/images/profile-img.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


export default function ContactsPage() {


    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(()=>{
    console.log("ddddddddddddd")
    },[])


    return (
        <>
            <Grid container spacing={1} rowGap={2} className="page-heading-grid">
                <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                    <h4 className="page-heading-title">Contacts</h4>
                </Grid>
            </Grid>
            <div className="contact-list">
                <TableContainer component={Paper} className="contact-container">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" className="contact-table">
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className="profile-content">
                                    <Avatar className="profile-icon" alt="Remy Sharp" src={profileIcon} />
                                    <Stack spacing={2}>
                                        <h6 className="user-name">Mihai Velicue</h6>
                                        <h6 className="joined-date">Joined May 4, 2022</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left" className="email-content">
                                    <Stack spacing={2}>
                                        <h6 className="user-email">mvelicu@thermalsystems.ca</h6>
                                        <h6 className="status">Primary</h6>
                                    </Stack>
                                </TableCell> 
                                 <TableCell align="center">
                                    <div className="last-cell">
                                        <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        <DeleteIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </div>
                                </TableCell> 
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className="profile-content">
                                    <Avatar className="profile-icon" alt="Remy Sharp" src={profileIcon} />
                                    <Stack spacing={2}>
                                        <h6 className="user-name">Mihai Velicue</h6>
                                        <h6 className="joined-date">Joined May 4, 2022</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left" className="email-content">
                                    <Stack spacing={2}>
                                        <h6 className="user-email">mvelicu@thermalsystems.ca</h6>
                                        <h6 className="status">Primary</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="last-cell">
                                        <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        <DeleteIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className="profile-content">
                                    <Avatar className="profile-icon" alt="Remy Sharp" src={profileIcon} />
                                    <Stack spacing={2}>
                                        <h6 className="user-name">Mihai Velicue</h6>
                                        <h6 className="joined-date">Joined May 4, 2022</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left" className="email-content">
                                    <Stack spacing={2}>
                                        <h6 className="user-email">mvelicu@thermalsystems.ca</h6>
                                        <h6 className="status">Primary</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="last-cell">
                                        <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        <DeleteIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className="profile-content">
                                    <Avatar className="profile-icon" alt="Remy Sharp" src={profileIcon} />
                                    <Stack spacing={2}>
                                        <h6 className="user-name">Mihai Velicue</h6>
                                        <h6 className="joined-date">Joined May 4, 2022</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left" className="email-content">
                                    <Stack spacing={2}>
                                        <h6 className="user-email">mvelicu@thermalsystems.ca</h6>
                                        <h6 className="status">Primary</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="last-cell">
                                        <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        <DeleteIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className="profile-content">
                                    <Avatar className="profile-icon" alt="Remy Sharp" src={profileIcon} />
                                    <Stack spacing={2}>
                                        <h6 className="user-name">Mihai Velicue</h6>
                                        <h6 className="joined-date">Joined May 4, 2022</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left" className="email-content">
                                    <Stack spacing={2}>
                                        <h6 className="user-email">mvelicu@thermalsystems.ca</h6>
                                        <h6 className="status">Primary</h6>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="last-cell">
                                        <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        <DeleteIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    className="table-pagination"
                    count={100}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </div> 
        </>
    )

}