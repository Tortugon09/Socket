import {createContext, useState, useEffect, useReducer} from "react";
import socketIOClient from "socket.io-client";


export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [User, setUser] = useState('');
    const [Grupo, SetGrupo] = useState('')

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:1234');
        setSocket(newSocket);
        return () => newSocket.disconnect(); // desconectar el socket cuando el componente se desmonta
    }, [1]);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on('lista_usuarios', (usuarios) => {
                setUsuarios(usuarios);
                console.log(usuarios)
            });
        }
    }, [usuarios, socket]);

    const [checador, setChecador] = useState(0)




    return (
        <Context.Provider
            value={{
                socket,
                User,
                setUser,
                usuarios,
                checador,
                setChecador,
                Grupo,
                SetGrupo
            }}>
            {children}
        </Context.Provider>
    );

}