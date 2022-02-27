import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Delete from '@mui/icons-material/Delete';
import Crop from '@mui/icons-material/Crop';
import LocationOn from '@mui/icons-material/LocationOn';
import Circle from '@mui/icons-material/Circle';
import Group from '@mui/icons-material/Group';
import DateRange from '@mui/icons-material/DateRange';
import WatchLater from '@mui/icons-material/WatchLater';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setAdvertising, setInfoBoxWindowStatus } from '../../slicers/advertising';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';






// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Advertising from '../../services/advertising';

function InfoBoxBodyAd() {

    const activeMarker = useSelector(state => state.advertising.activeMarker);
    const user = useSelector(state => state.auth.user);
    const baseUrl = `http://${window.location.hostname}:8000`;

    let color = '';

    let options = { month: 'long', day: 'numeric' };


    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const actionSnackbar = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();

    const handleDeleteMarker = async (id) => {
        const adService = new Advertising();

        adService.deleteAdvertising(id).then(response => {
            dispatch(setInfoBoxWindowStatus(false));
            adService.getAdvertisingList()
                .then(data => { dispatch(setAdvertising(data)); console.log(data) })
                .catch(err => console.log(err.response.data));
        });
        console.log('deleted', id);
        setOpenSnackbar(true);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        console.log(activeMarker)
    }, [])
    return (
        // Для редактора infobox ad
        <>
           
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Вы точно хотите удалить обьект?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Удаленный обьект невозможно восстоновить
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Нет оставить</Button>
                    <Button onClick={() => handleDeleteMarker(activeMarker.id)} autoFocus>
                        Да удалить
                    </Button>
                </DialogActions>
            </Dialog>
            {user?.user_type.id == 2 ? (
                <Box>
                    <Avatar
                        sx={{
                            width: '100%',
                            height: 200
                        }}
                        variant='rounded'
                        src={baseUrl + activeMarker.images[0]?.image_url}
                    ></Avatar>
                    <Typography marginTop={1} variant='subtitle1'>{activeMarker.name}</Typography>
                    <Typography variant='body2'>{activeMarker.desription}</Typography>
                    <Typography variant='body2'>{activeMarker.size}</Typography>
                    <Typography variant='body2'>{activeMarker.address}</Typography>


                </Box>
            ) : (
                // Для всех остальных infobox ad
                <Box
                    style={{
                        padding: 16,
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        overflow: 'scroll',
                        borderRadius: 15,
                        width: 250,
                        height: activeMarker.rent != null ? 450 : 310,
                        background: 'white',
                        position: 'relative',
                    }}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={15}

                        style={{
                            width: '100%',
                            height: 120
                        }}

                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {activeMarker.images.map(image => (
                            <SwiperSlide key={image.id}>
                                <Avatar
                                    sx={{
                                        width: '100%',
                                        height: 120
                                    }}
                                    variant='rounded'
                                    src={baseUrl + image.image_url}
                                ></Avatar>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 35,
                            height: 35,
                            zIndex: 10,
                            borderRadius: 35,
                            color: 'white',
                            border: '1px solid white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#64dd17'
                        }}
                    >
                        <Typography variant='subtitle1'>{activeMarker.id}</Typography>
                    </Box>
                    <Box
                        style={{
                            paddingTop: 15,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: '56%'
                        }}>
                        <Box
                        >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'

                            }}
                                onClick={handleClickOpen}
                            >
                                <Typography sx={{
                                    color: '#1F271B',
                                    fontSize: 18,
                                    fontWeight: '700'
                                }}>{activeMarker.name}</Typography>
                                {user?.user_type != 3 ? <Delete size={20} sx={{
                                    color: '#EE4266'
                                }}></Delete> : ''}

                            </Box>

                            <Box sx={{
                                paddingTop: 2,
                                display: 'flex',
                                alignItems: 'center',

                            }}>
                                <Crop sx={{
                                    color: '#FFD23F',
                                    fontSize: 20
                                }}></Crop>
                                <Typography sx={{
                                    paddingLeft: 1,
                                    color: '#1F271B',
                                    fontSize: 14,
                                    fontWeight: '500'
                                }}>{activeMarker.size}</Typography>
                            </Box>
                            <Box sx={{
                                paddingTop: 1,
                                display: 'flex',
                                alignItems: 'center',

                            }}>
                                <LocationOn sx={{
                                    color: '#FFD23F',
                                    fontSize: 20
                                }}></LocationOn>
                                <Typography sx={{
                                    paddingLeft: 1,
                                    color: '#1F271B',
                                    fontSize: 14,
                                    fontWeight: '500'
                                }}>{activeMarker.address}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            paddingTop: 1,
                            display: 'flex',
                            alignItems: 'center',

                        }}>
                            <Circle sx={{
                                color: activeMarker.rent != null ? '#EE4266' : '#62DB17',
                                fontSize: 20
                            }}></Circle>
                            <Typography sx={{
                                paddingLeft: 1,
                                color: '#1F271B',
                                fontSize: 12,
                                fontWeight: '400'
                            }}>{activeMarker.rent != null ? 'Занято' : 'Своводно'}</Typography>
                        </Box>
                        <Box style={{
                            paddingTop: 10
                        }}>
                            {activeMarker.rent != null ?
                                activeMarker.rent.map(rent => {
                                    let end_time = new Date(rent.end_time);
                                    let now = new Date();


                                    let Difference_In_Time = end_time.getTime() - now.getTime();

                                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                    return <Box  marginTop={1} key={rent.id} style={{

                                        background: '#EE4266',
                                        color: 'white',
                                        padding: 12,
                                        borderRadius: 12
                                    }}>
                                        <Box sx={{
                                            paddingTop: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <Group sx={{
                                                color: 'white',
                                                fontSize: 15
                                            }}></Group>
                                            <Typography sx={{
                                                paddingLeft: 1,
                                                color: 'white',
                                                fontSize: 12,
                                                fontWeight: '500'
                                            }}>{rent.organization_name}</Typography>
                                        </Box>
                                        <Box sx={{
                                            paddingTop: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <DateRange sx={{
                                                color: 'white',
                                                fontSize: 15
                                            }}></DateRange>
                                            <Typography sx={{
                                                paddingLeft: 1,
                                                color: 'white',
                                                fontSize: 12,
                                                fontWeight: '500'
                                            }}>от {new Date(rent.start_time).toLocaleDateString("ru-RU", options)} до {new Date(rent.end_time).toLocaleDateString("ru-RU", options)}</Typography>
                                        </Box>
                                        <Box sx={{
                                            paddingTop: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <WatchLater sx={{
                                                color: 'white',
                                                fontSize: 15
                                            }}></WatchLater>
                                            <Typography sx={{
                                                paddingLeft: 1,
                                                color: 'white',
                                                fontSize: 12,
                                                fontWeight: '500'
                                            }}>{parseInt(Difference_In_Days)} дней до окончание</Typography>
                                        </Box>

                                    </Box>
                                })

                                : ''}
                        </Box>
                    </Box>
                </Box>
            )}
             <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Успешно удалено!"
                action={actionSnackbar}
            />
        </>
    );
}

export default InfoBoxBodyAd;