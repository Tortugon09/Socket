import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import {Context, ContextProvider} from "./Context.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Mensajes} from "./Mensajes.jsx";
import {SingIn} from "./SingIn.jsx";
import Chat from "./Chat.jsx";
import Chat2 from "./Chat2.jsx";
import {CreateGroup} from "./CreateGroup";
import {JoinGroup} from "./JoinGroup";
import Chat3 from "./Chat3.jsx";

function App() {
  return (
      <div>
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path={"/socket/mensajes"} element={<Mensajes/>} />
                    <Route path={"/socket"} element={<SingIn/>} />
                    <Route path={"/socket/chat"} element={<Chat/>} />
                    <Route path={"/socket/HacerGrupo"} element={<CreateGroup></CreateGroup>} />
                    <Route path={'/socket/JoinGrupo'} element={<JoinGroup/>}/>
                    <Route path={'/socket/ChatGrupo'} element={<Chat3/>}/>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
      </div>
  )
}

export default App
