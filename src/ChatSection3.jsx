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

export const ChatSection3 = ({data}) => {

    const usuario2 = data.usuario2
    const {socket, User, usuarios, IniciarChat, checador, Grupo} = useContext(Context)
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState({
        usuario1: data.usuario1,
        nombre: Grupo,
        mensaje: {
            id:'',
            datos: ''
        }
    });

    useEffect(() => {
        console.log(mensaje)
        console.log(usuario2)
    }, [mensaje, socket]);

    useEffect(() => {
        setMensaje({
            usuario1: User,
            nombre: Grupo,
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
            socket.on('mensaje_grupal', (datos) => {
                setMensajes([...mensajes,datos]);
                console.log(mensajes)
            });
        }
    }, [mensajes, socket]);

    const enviarMensaje = e => {
        e.preventDefault()
        socket.emit('enviar_mensaje_grupal', mensaje);
        console.log(mensaje)
        setMensaje({...mensaje,['mensaje']: {['id']: User, ['datos']: ''}});
    }

    const classes = useStyles();

    return (
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                {mensajes.map((mensaje, index) => (
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
                <Button>Enviar Archivo</Button>
            </Grid>
        </Grid>
    )
}