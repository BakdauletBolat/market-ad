import { useFilePicker } from 'use-file-picker';
import React, { useState } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import DoneIcon from '@mui/icons-material/Done';
import { setAdForm } from '../../slicers/advertising';
import { useDispatch, useSelector } from 'react-redux';

export default function ImagePicker() {
    const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
        accept: 'image/*',
        readAs: 'DataURL',
        multiple: true,
        maxFileSize: 50
    });

    

    const adForm = useSelector(state => state.advertising.adForm)

    const dispatch = useDispatch();

    const [isSelect, setIsSelect] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        return <div>Error...</div>;
    }

    const selectFiles = () => {
        setIsSelect(true)
        dispatch(setAdForm({
            ...adForm,
            images: filesContent
        }))
    }

    return (
        <div>
            <Stack direction='row' flexWrap={'wrap'} justifyContent='flex-start' gap={2} >
                <Avatar
                    onClick={() => { openFileSelector(); setIsSelect(false) }}
                    variant="rounded"
                    sx={{
                        width: '100%',
                        height: 125,
                        background: 'grey',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <PhotoSizeSelectActualIcon fontSize='large' />
                    <Typography variant="caption" textAlign={'center'}>Выберите фотографий</Typography>
                </Avatar>
                {filesContent.map((file, index) => (
                    <Avatar
                        variant="rounded"
                        key={index}
                        sx={{
                            width: '45%',
                            height: 125
                        }}
                        src={file.content}
                    >
                    </Avatar>
                ))}
                {(filesContent.length > 0 && !isSelect) && (
                    <Stack>
                        <Button
                            onClick={selectFiles}
                            startIcon={<DoneIcon></DoneIcon>}
                        >
                            Выбрать эти фотографий?
                        </Button>
                        <Button
                            onClick={clear}
                            color="error"
                            startIcon={<DoneIcon></DoneIcon>}
                        >
                            Нет очистить
                        </Button>
                    </Stack>
                )}


            </Stack>
        </div>
    );
}