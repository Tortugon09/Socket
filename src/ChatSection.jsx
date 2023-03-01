import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useContext, useEffect, useState} from "react";
import {Context} from "./Context.jsx";
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    form: {
        display: 'flex',
        WebkitJustifyContent: 'center',
        alignItems: 'center'
    },
    space: {
        display: 'flex',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    }
});

export const ChatSection = ({data}) => {
    const [imagenes, setImageData] = useState([]);
    const usuario2 = data.usuario2
    const {socket, User, usuarios, IniciarChat, checador} = useContext(Context)
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState({
        usuario1: data.usuario1,
        usuario2: usuario2,
        mensaje: {
            id:'',
            datos: ''
        }
    });

    useEffect(() => {
        console.log(mensaje)
        console.log(data)
        console.log(usuario2)
    }, [mensaje, socket]);

    useEffect(() => {
        setMensaje({
            usuario1: data.usuario1,
            usuario2: data.usuario2,
            mensaje: {
                id:'',
                datos: ''
            }
        });
    }, [data.usuario1, data.usuario2]);


    useEffect(() => {
        if (socket) {
            console.log(checador)
            socket.on('recuperar_conversasion', (datos) => {
                console.log(datos)
                setMensajes(datos);
                console.log(datos)
                console.log(mensajes)
            });
        }
    }, [checador, socket]);


    useEffect(() => {
        if (socket) {
            socket.on('mensaje_recibido', (datos) => {
                console.log(datos)
                setMensajes([...mensajes, datos]);
                console.log(typeof (datos))
            });
        }
    }, [mensajes, socket]);
    useEffect(() => {
        if (socket) {
            socket.on('new_image', (datos) => {
                handleImageDataReceived(datos)
                console.log(datos)
            });
        }
    }, [socket]);
    function handleImageDataReceived(datos) {
        const arrayBuffer = datos.imagen;
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setImageData([...imagenes, {imageUrl}]);
    }
    const enviarMensaje = e => {
        e.preventDefault()
        socket.emit('enviar_mensaje', mensaje);
        console.log(mensaje)
        setMensaje({...mensaje,['mensaje']: {['id']: User, ['datos']: ''}});
    }

    const classes = useStyles();

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const handleFileUpload = async () => {
        console.log(imagenes)
        try {
            const formData = new FormData();
            formData.append('photo', file);
            await  axios.post('http://localhost:1234/upload', formData);
            console.log('Archivo subido con éxito');
            socket.emit('ola', 'dwd');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                {mensajes.map((mensaje, index) => (
                    console.log(User),
                        console.log(mensaje.datos),
                        User === mensaje.id ?
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={mensaje.datos}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary={mensaje.id}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" primary={mensaje.datos}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" secondary={mensaje.id}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                ))}
                {imagenes.map((imagen, index) => (
                    console.log(User),
                        console.log(imagen.imageUrl),
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {imagen && <img src={imagen.imageUrl} />}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary={User}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                ))}
            </List>
            <Divider />
            <Grid container className={classes.space}>
                <Box component="form" noValidate onSubmit={enviarMensaje} className={classes.form}>
                    <TextField
                        margin="normal"
                        required
                        id="mensaje"
                        label="Escribe aqui"
                        name="mensaje"
                        autoComplete="mensaje"
                        value={mensaje.mensaje.datos}
                        autoFocus
                        onChange={(e) => setMensaje({...mensaje,['mensaje']: {['id']: User, ['datos']: e.target.value}})}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Enviar
                    </Button>
                </Box>
                <div>
                    <input type="file" name="photo" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Cargar archivo</button>
                </div>
            </Grid>
        </Grid>
    )
}