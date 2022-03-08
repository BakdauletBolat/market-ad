import { Typography, Box, Button, Modal } from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function CreateMarker() {

    const dispatch = useDispatch();

    const adForm = useSelector(state => state.advertising.adForm);

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return (
        <>
            <div className="absolute-black-screen">
                {adForm.lat == undefined || adForm.lat == null ? (
                    <Box sx={{
                        position: 'absolute',
                        top: 20,
                        right: 10,
                        padding: 2,
                        
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 20,
                        
                    }} className='button'>
                        <PushPinIcon color='inherit' fontSize="inherit"></PushPinIcon>
                        <Typography marginLeft={2} color="white" variant="h5">Выберите точку чтобы создать</Typography>
                    </Box>
                ): (
                    <Box sx={{
                        position: 'absolute',
                        top: 20,
                        right: 10,
                        padding: 2,
                
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 20,
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }} className='button'>
                        <PushPinIcon color='inherit' fontSize="inherit"></PushPinIcon>
                        <Typography marginLeft={2} color="white" variant="h5">Выбрано место</Typography>
                    </Box>
                )}
                
            </div>

    
            {adForm.lat && (
                <>
                    <Marker
                        label={{
                            text: 'push_pin',
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "15px",
                        }}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            strokeColor: '#bb002f',
                            fillColor: '#bb002f',
                            fillOpacity: 1,
                            scale: 10,
                        }}
                        zIndex={1005}
                        position={{
                            lat: adForm.lat,
                            lng: adForm.lng
                        }}
                    ></Marker>
                </>
            )}

        </>
    );
}

export default CreateMarker;