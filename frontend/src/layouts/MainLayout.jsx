import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slicers/auth';
import {useLocation} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Link from '../components/bmui/Link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { setCreateMarkerStatus } from '../slicers/advertising';
import CreateAd from '../components/Map/CreateAd';

const pages = [{
    name: 'Главная',
    url: "/"
},
{
    name: 'Карта',
    url: "/map"
},
{
    name: 'Места',
    url: "/place"
}];

const drawerItems = [{
    id: 1,
    title: 'Создать рекламу',
    icon: <AddCircleIcon></AddCircleIcon>
}]


const drawerWidth = 350;

function MainLayout({ children }) {

    const user = useSelector(state => state.auth.user);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();


    const logoutUser = () => {
        dispatch(logout());
    }


    const createMarkerStatus = useSelector(state => state.advertising.createMarkerStatus);

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: '100%',
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',

        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const theme = useTheme();


    const location = useLocation();

    useEffect(()=>{
        console.log(location.pathname);
        console.log(user);
    },[user])

   

    const createAdOpen = () => {
        console.log('createAdOpen');

        dispatch(setCreateMarkerStatus(true));
    }

  
  

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed"
             style={{
                 boxShadow: '0px 4px 14px rgba(0,0,0,5%)',
                backgroundColor: 'white',
                color: 'black',
                padding: '5px 0px',
            }} open={open}
            >
                <Toolbar >
                    {
                        user?.user_type.id != 1 ?(<IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>) : ''
                  }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}
                    >
                        <Box sx={{ display: 'flex',alignItems: 'center' }}>
                            <Typography variant="h6" noWrap component="div"
                            style={{
                                color: location.pathname == '/' ? '#005EFF': 'black'
                            }}
                            >
                                <Link underline='none' to="/">
                                    KazBillboard
                                </Link>
                            </Typography>
                            <Typography marginLeft={2} style={{
                                fontWeight: 400,
                                fontSize: 16,
                                color: location.pathname == '/map' ? '#005EFF': 'black'
                            }} noWrap component="div">
                                <Link underline='none' to="/map">
                                    Карта
                                </Link>
                            </Typography>
                            
                            {/* <Typography marginLeft={2} style={{
                                fontWeight: 400,
                                fontSize: 16,
                                color: location.pathname == '/about' ? '#005EFF': 'black'
                            }} noWrap component="div">
                                <Link underline='none' to="/about" >
                                    О нас
                                </Link>
                            </Typography> */}
                        </Box>
                        {user == null ? <Typography marginLeft={2} variant="h6" noWrap component="div">
                                <Link underline='none' to="/login">
                                    Войти
                                </Link>
                            </Typography> : <Typography onClick={logoutUser} style={{
                                cursor: 'pointer'
                            }} marginLeft={2} variant="h6" noWrap component="div">
                            Выйти
                            </Typography>}  
                    </Box>
                </Toolbar>
            </AppBar>
      
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Toolbar />
                    <Divider />

                    {user?.user_type !== 3 && user !== undefined ? (
                        <>
                        <List>
                        <ListItem button onClick={createAdOpen}>
                            <ListItemIcon>
                                <AddCircleIcon></AddCircleIcon>
                            </ListItemIcon>
                            <ListItemText primary='Создать рекламу' />
                        </ListItem>
                    </List>
                    <Divider />
                    {createMarkerStatus && (
                        <CreateAd></CreateAd>
                    )}
                    </>
                    ) : ''}  
                    
                </Drawer>

            <Main open={open}>
                 <DrawerHeader /> 
                {children}
            </Main>

        </Box>
    );
}

export default MainLayout;