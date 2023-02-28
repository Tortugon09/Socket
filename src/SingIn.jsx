import {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";

export function SingIn() {
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [socket] = useState(socketIOClient('http://localhost:1234'));

    useEffect(() => {
        socket.on('mensaje_recibido', (datos) => {
            setMensajes([...mensajes, datos]);
        });
    }, [mensajes, socket]);

    const enviarMensaje = () => {
        socket.emit('enviar_mensaje', mensaje);
        setMensaje('');
    }
    return (
        <>


        </>
    )
}