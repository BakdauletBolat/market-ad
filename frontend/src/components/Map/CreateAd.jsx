import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { setAdForm } from '../../slicers/advertising';
import { useSelector,useDispatch } from 'react-redux';
import ImagePicker from './ImagePicker';
import { Button } from '@mui/material';
import AdvertisingService from '../../services/advertising';

function CreateAd() {

    const advertisingService = new AdvertisingService();

    const dispatch = useDispatch();

    const adForm = useSelector(state=>state.advertising.adForm)

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
        console.log(adForm);

        const formData = new FormData();

        Object.keys(adForm).forEach(key => {

            if (key == 'images') {
                adForm[key].map(image=>{
                    formData.append(key,dataURLtoFile(image.content,image.name))
                })
            }
            else{
                formData.append(key, adForm[key])
            }
            
        })

        advertisingService.createAdvertising(formData)
        .then(res=>console.log(res))
        .catch(err=>err.response.data)
    }

    const [value, setValue] = React.useState(new Date());

    const {name,desription,created_at} = adForm;
    return (
        <React.Fragment>
            <Typography paddingLeft={2} paddingTop={2} variant="h6" gutterBottom>
                Создание рекламы
            </Typography>
            <Grid paddingLeft={2} paddingRight={2} container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        onChange={onChange}
                        required
                        id="name"
                        value={name}
                        name="name"
                        label="Имя рекламного место"
                        fullWidth
                        autoComplete="asdasdas"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        multiline={true}
                        id="desription"
                        name="desription"
                        value={desription}
                        onChange={onChange}
                        label="Описание рекламного место"
                        fullWidth
                        autoComplete="askmdaksmdkamsdk"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="datetime-local"
                        label="Время создание"
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
                    <ImagePicker></ImagePicker>
                </Grid>
                <Grid marginBottom={9} item xs={12}>
                    <Button onClick={onSubmit} variant='contained' fullWidth>
                        Сохранить
                    </Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default CreateAd;