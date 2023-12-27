import React, { useState } from "react";
import "./Sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import SupportIcon from '@mui/icons-material/Support';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import buildLogo from "../assets/images/build_id_logo.png";
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function Sidebar() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const menuItems = [
        {
            path: "home",
            icon: <HomeIcon className="side-icons" />,
            title: "Home"
        },
        {
            path: "home",
            icon: <PlaceIcon className="side-icons" />,
            title: "Map"
        },
        {
            path: "contacts",
            icon: <PersonIcon className="side-icons" />,
            title: "Builder Network"
        },
        {
            path: "tickets",
            icon: <CreditCardIcon className="side-icons" />,
            title: "Tickets"
        },
        {
            path: "home",
            icon: <StoreIcon className="side-icons" />,
            title: "Rewards"
        },
        {
            path: "timesheets",
            icon: <CalendarMonthIcon className="side-icons" />,
            title: "Timesheets"
        },
        {
            path: "expenses",
            icon: <RequestQuoteIcon className="side-icons" />,
            title: "Expenses"
        },
        {
            path: "home",
            icon: <BusinessCenterIcon className="side-icons" />,
            title: "Job Postings"
        },
        {
            path: "home",
            icon: <HandshakeIcon className="side-icons" />,
            title: "Buy/Sell"
        },
        {
            path: "home",
            icon: <PlayCircleIcon className="side-icons" />,
            title: "Montages"
        },
        {
            path: "home",
            icon: <ConstructionIcon className="side-icons" />,
            title: "My Tool"
        },
        {
            path: "https://mybuilderid.com/faq.html",
            icon: <SupportIcon className="side-icons" />,
            title: "Help & Support"
        },
        {
            path: "home",
            icon: <SettingsIcon className="side-icons" />,
            title: "Settings"
        }
    ]

    const navigateTopage = (item,index) => {
        setCurrentIndex(index);
         navigate(item?.path)
    }

    return (

        <Drawer variant="permanent" open={open} className="header-drawer">
            <DrawerHeader style={{ justifyContent: "center" }}>
                <div>
                    <img src={buildLogo} className="build-logo" />
                </div>
            </DrawerHeader>
            <List className="siderbar-list">
                {menuItems.map((item, index) => (
                    <ListItem onClick={()=>navigateTopage(item,index)} className={`sidebar-item ${currentIndex === index && "active"}`} key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item?.icon}
                            </ListItemIcon>
                            <ListItemText className="item-name" primary={item?.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}