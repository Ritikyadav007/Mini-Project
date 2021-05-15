import React ,{useState} from 'react';
import './App.css';
import Friendlist from './Friendlist';
import Chat from './Chat'; 
import {BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from "./StateProvider";


function App() {
  const [{ user }, dispatch] =  useStateValue();

  return (

    <div className="app">
      {!user ? (
      <Login/>
      ):(
        <div className="app_body">
        <Router>
        {/* friends list/ Sidebar */}
        <Friendlist />
        <Switch>
        <Route path="/chats/:chatId">
        {/* chat window */}
        <Chat />
        </Route>
        <Route path="/">
         <Chat /> 
        </Route>
        </Switch>
        </Router>
     
        </div>
      )}
      
    </div>

    

  );
}

export default App;
