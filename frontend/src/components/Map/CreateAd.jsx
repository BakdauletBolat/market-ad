import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { setAdForm, setAdvertising, setCreateMarkerStatus } from '../../slicers/advertising';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from './ImagePicker';
import AdvertisingService from '../../services/advertising';
import Snackbar from '@mui/material/Snackbar';
import { useFilePicker } from 'use-file-picker';
import { MenuItem,InputLabel,Select } from '@mui/material';

function CreateAd() {

    const advertisingService = new AdvertisingService();

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState('');

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const dispatch = useDispatch();

    const adForm = useSelector(state => state.advertising.adForm);
    const adList = useSelector(state => state.advertising.advertising);

    const [isLoading, setIsLoading] = React.useState(false);

    const onChange = (e) => {
        const target = e.target;

        dispatch(setAdForm({
            ...adForm,
            [target.name]: target.value
        }))

    }

    // helper function: generate a new file from base64 String
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }




    const onSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        console.log(adForm);

        if (adForm?.name == '' || adForm?.name == undefined) {
            console.log('name null');
            setMessageInfo("?????? ???????????????????? ?????????? ??????????????????????");
            handleSnackbarOpen();
            setIsLoading(false);
            return;
        }

        if (adForm?.address == '' || adForm?.address == undefined) {
            console.log('adress null');
            setMessageInfo("?????????? ???????????????????? ?????????? ??????????????????????");
            handleSnackbarOpen();
            setIsLoading(false);
            return;
        }

        if (adForm?.size == '' || adForm?.size == undefined) {
            console.log('size null');
            setMessageInfo("?????????????? ???????????????????? ?????????? ??????????????????????");
            handleSnackbarOpen();
            setIsLoading(false);
            return;
        }

        if (adForm?.images.length <= 0 || adForm?.size == undefined) {
            console.log('size null');
            setMessageInfo("???????????????? ???????????? ???????? ????????????????");
            handleSnackbarOpen();
            setIsLoading(false);
            return;
        }


        if (adForm?.lat == '' || adForm?.lat == undefined) {
            setMessageInfo("???????????????? ???????????? ??????????");
            handleSnackbarOpen();
            setIsLoading(false);
            return;
        }


        Object.keys(adForm).forEach(key => {

            if (key == 'images') {
                adForm[key].map(image => {
                    formData.append(key, dataURLtoFile(image.content, image.name))
                })
            }
            else {
                formData.append(key, adForm[key])
            }

        })

        advertisingService.createAdvertising(formData)
            .then(async (res) => {
                setMessageInfo("?????????????? ?????????????? ????");
                setIsLoading(false);
                clear();
                handleSnackbarOpen();
                dispatch(
                    setAdvertising([
                        ...adList,
                        res
                    ]),
                );
                dispatch(setAdForm({
                    type_id: 1,
                    size: '',
                    address: '',
                    created_at: '2021-05-24T10:30',
                    name: '',
                    lat: null,
                    lng: null,
                    zoom: 7,
                    desription: '',
                    images: []
                }));

                // await new Promise(resolve => setTimeout(resolve, 1500));


                // dispatch(setCreateMarkerStatus(false));

            })
            .catch(err => {
                setMessageInfo('???? ???? ?????? ???? ???? ??????, ?????????????????? ?????? ????????????');
                handleSnackbarOpen();
                console.log(err.response.data);
                setIsLoading(false);
            }
            );
    }

    const [value, setValue] = React.useState(new Date());

    const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
        accept: 'image/*',
        readAs: 'DataURL',
        multiple: true,
        maxFileSize: 50
    });

    const { name, desription, created_at, size, address,type_id } = adForm;
    return (
        <React.Fragment>
            <Typography paddingLeft={2} paddingTop={2} variant="h6" gutterBottom>
                ???????????????? ??????????????
            </Typography>
            <Grid paddingLeft={2} paddingRight={2} container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        onChange={onChange}
                        required
                        id="name"
                        value={name}
                        name="name"
                        label="?????? ???????????????????? ??????????"
                        fullWidth
                        autoComplete="asdasdas"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={onChange}
                        required
                        id="adress"
                        value={address}
                        name="address"
                        label="?????????? ???????????????????? ??????????"
                        fullWidth
                        autoComplete="asdasdas"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={onChange}
                        required
                        id="size"
                        value={size}
                        name="size"
                        label="?????????????? ???????????????????? ??????????"
                        fullWidth
                        autoComplete="asdasdas"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">??????</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={type_id}
                        name="type_id"
                        fullWidth
                        id="type_id"
                        label="??????"
                        onChange={onChange}
                    >
                        <MenuItem value={1}>????????????????</MenuItem>
                        <MenuItem value={2}>LED</MenuItem>
                        <MenuItem value={3}>??????????????????</MenuItem>
                        <MenuItem value={4}>??????????????</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField

                        multiline={true}
                        id="desription"
                        name="desription"
                        value={desription}
                        onChange={onChange}
                        label="???????????????? ???????????????????? ??????????"
                        fullWidth
                        autoComplete="askmdaksmdkamsdk"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="datetime-local"
                        label="?????????? ????????????????"
                        type="datetime-local"
                        name="created_at"
                        value={created_at}
                        onChange={onChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ImagePicker openFileSelector={openFileSelector}
                        filesContent={filesContent}
                        loading={loading}
                        errors={errors}
                        clear={clear}></ImagePicker>
                </Grid>
                <Grid marginBottom={9} item xs={12}>
                    <button type='button' disabled={isLoading ? true : false} className={isLoading ? 'button button--full-width button--isloading' : 'button button--full-width'} onClick={onSubmit} >
                        {isLoading ? '???????????????? ...' : '??????????????????'}
                    </button>
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={messageInfo}

                />
            </Grid>
        </React.Fragment>
    );
}

export default CreateAd;