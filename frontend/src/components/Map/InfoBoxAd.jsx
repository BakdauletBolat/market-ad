import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function InfoBoxBodyAd() {

    const activeMarker = useSelector(state => state.advertising.activeMarker);
    const user = useSelector(state => state.auth.user);
    const baseUrl = 'http://127.0.0.1:8000';

    let color = '';

    let options = {year: 'numeric', month: 'long', day: 'numeric' };



    useEffect(() => {
        console.log(activeMarker)
    }, [])
    return (
        user?.user_type.id == 2 ? (
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
            <Box
                sx={{
                    position: 'relative'
                }}>
                <Swiper
                   
                    slidesPerView={1}
                    navigation
                style={{
                    width:400
                }}
                pagination
                parallax
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {activeMarker.images.map(image => (
                        <SwiperSlide>
                            <Avatar
                                sx={{
                                    width: '100%',
                                    height: 200
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
                        zIndex:10,
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
                <Typography marginTop={1} variant='subtitle1'>Имя: {activeMarker.name}</Typography>
                <Typography variant='body2'>Описание: {activeMarker.desription}</Typography>
                <Typography variant='body2'>Размеры: {activeMarker.size}</Typography>
                <Typography variant='body2'>Адрес: {activeMarker.address}</Typography>
                {activeMarker.rent != null ?
                    activeMarker.rent.map(rent => {
                        let end_time = new Date(rent.end_time);
                        let now = new Date();
                          

                        let Difference_In_Time = end_time.getTime() - now.getTime();

                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        return <Box marginTop={1} key={rent.id} sx={{ width: '100%',
                            background:'#efefef',padding:2,borderRadius:2 }}>
                            <Typography variant='body2'>Аренда действует</Typography>
                            <Typography variant='body2'>Имя организаций: {rent.organization_name}</Typography>
                            <Typography variant='body2'>Время начало: {new Date(rent.start_time).toLocaleDateString("ru-RU",options)}</Typography>
                            <Typography variant='body2'>Время окончание: {new Date(rent.end_time).toLocaleDateString("ru-RU",options)}</Typography>
                            <Typography variant='body2'>Осталось {parseInt( Difference_In_Days)} дней</Typography>
                        </Box>
                    })

                    : ''}
            </Box>
        )


    );
}

export default InfoBoxBodyAd;