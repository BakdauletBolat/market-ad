import {useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

function InfoBoxBodyAd() {

    const activeMarker = useSelector(state=>state.advertising.activeMarker);

    const baseUrl = 'http://127.0.0.1:8001';
    useEffect(()=>{
        console.log(activeMarker)
    },[])
    return ( 
        <Box>
            <Avatar 
            sx={{
                width:'100%',
                height:150
            }}
            variant='rounded'
            src={baseUrl+activeMarker.images[0].image_url}
            ></Avatar>
            <Typography marginTop={1} variant='subtitle1'>{activeMarker.name}</Typography>
            <Typography variant='body2'>{activeMarker.desription}</Typography>
        </Box>
       
     );
}

export default InfoBoxBodyAd;