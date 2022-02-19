import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMaterial from '@mui/material/Link';
import { Link, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../services/auth';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../slicers/auth';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <LinkMaterial color="inherit" href="https://youtube.com/">
                Map-Service
            </LinkMaterial>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const authService = new AuthService();

export default function Login() {
    const alert = useAlert();

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    if (user) {
        return <Navigate to="/"></Navigate>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        };


        authService.login(body)
            .then(res => {
                dispatch(login(res));
            })
            .catch(err => {
                if (err.response.data.detail == 'No active account found with the given credentials') {
                    alert.show('Вы неправильно ввели данные')
                }
                if (err.response.data.email) {
                    alert.show('Введите имя пользователя')
                }
                if (err.response.data.password) {
                    alert.show('Введите пароль')
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация {user?.email}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/map" component={LinkMaterial}>
                                    as
                                </Link>
                            </Grid>
                            <Grid item>
                                <LinkMaterial href="#" variant="body2">
                                    {"У вас нет аккаунта?"}
                                </LinkMaterial>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}