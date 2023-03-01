import {useContext, useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import {Context} from "./Context.jsx";
import {Button} from "@material-ui/core";
import * as React from "react";
import {ChatSection} from "./ChatSection.jsx";
import {useNavigate} from "react-router-dom";

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
    }
});



const Chat = () => {
    const {socket, User, usuarios, setChecador, checador} = useContext(Context)
    const [IniciarChat, SetIniciarChat] = useState({
        'usuario1': User,
        'usuario2': ''
    })


    useEffect(() => {
        if (socket) {
            socket.emit('obtener_conversaciones', IniciarChat);
        }
    }, [IniciarChat, socket]);


    const handleSubmmit = (userd) => {
        SetIniciarChat({...IniciarChat,['usuario2']: userd})
        setChecador(!checador)
        console.log(IniciarChat)
    }
    const navigate = useNavigate();

    const classes = useStyles();

    return (
        <div style={{height: '100vh'}}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={User}></ListItemText>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button key="RemySharp">
                            <Button
                                onClick={() => navigate('/Socket/HacerGrupo')}
                            >Crear Grupo
                            </Button>
                            <Button
                                onClick={() => SetIniciarChat({usuario1: User, usuario2: ''})}
                            >CHAT GENERAL
                            </Button>
                            <Button
                                onClick={() => navigate('/Socket/JoinGrupo')}
                            >Unirse a un Grupo
                            </Button>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {usuarios.map((username, index) => (
                            username === User ?
                                <></>
                                :
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/147/147142.png" />
                                </ListItemIcon>
                                <ListItemText primary={username}>{username}</ListItemText>
                                <ListItemText secondary="online" align="right"></ListItemText>
                                <Button
                                    onClick={() => handleSubmmit(username)}
                                ><SendIcon/></Button>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <ChatSection data={IniciarChat} />
            </Grid>
        </div>
    );
}

export default Chat;