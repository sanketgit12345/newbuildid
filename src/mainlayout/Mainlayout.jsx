import React from "react";
import "./Mainlayout.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

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
                    <Container fixed style={{padding:"0px"}}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </>
    )

}