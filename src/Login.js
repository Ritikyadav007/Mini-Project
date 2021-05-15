import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider";

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
               type: actionTypes.SET_USER,
               user:result.user, 
            });
        }
        )
        .catch(error=>alert(error.message));
    };
    return (
        <div className="login">
           <div className="login_container">
             <img src="https://i.pinimg.com/originals/a6/06/25/a60625748a61e88e4ae17d53bc286910.png"
             alt=""/>
             <div className="login_text">
                 <h1>Sign in to WeChat</h1>
             </div>

             <Button onClick={signIn}>
                 Sign In With Google
             </Button>

           </div>
        </div>
    )
}

export default Login
