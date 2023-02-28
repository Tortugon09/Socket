import React, {useContext, useEffect, useState} from "react";
import {Context} from "./Context.jsx";
import {Link} from "react-router-dom";


export const Mensajes = () => {


    return (
        <div>
            <div>
            </div>
            <div>
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
            <Link to={"/Socket/"}>PAGINA ANTERIROR</Link>
        </div>
    )

}