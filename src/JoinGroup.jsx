import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "./Context.jsx";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export const JoinGroup = () => {
    const navigate = useNavigate();
    const {socket, User, usuarios, SetGrupo, Grupo,setChecador, checador} = useContext(Context)
    const [creategrupo, setCreateGrupo] = useState({
        nombre: Grupo,
        usuario: User
    })

    useEffect(() => {
        console.log(Grupo)
        console.log(User)
        console.log(creategrupo)
    }, [Grupo, socket]);

    useEffect(() => {
        setCreateGrupo(
            {
                nombre: Grupo,
                usuario: User
            }
        )
    }, [Grupo]);


    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit('unirse_a_grupo', creategrupo);
        console.log(creategrupo)
        navigate('/socket/ChatGrupo')
        setChecador(checador+1)

    };

    return (
        <>
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
                            Unirse a un Grupo
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="grupoName"
                                label="grupoName"
                                name="grupoName"
                                autoComplete="grupoName"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Unirse a un Grupo
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}