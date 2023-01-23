import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function App() {
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [socket] = useState(socketIOClient('http://192.168.137.1:1234'));

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
      <div>
          <div>
              {mensajes.map((mensaje, index) => (
                  <p key={index}>{mensaje}</p>
              ))}
          </div>
          <div>
              <input
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
              />
              <button onClick={enviarMensaje}>Enviar</button>
          </div>
      </div>
  )
}

export default App
