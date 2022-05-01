import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const CheckUserLoggedIn = (props) => {
    const [loading, setLoading] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    if(loading){
        getAuth().onAuthStateChanged(function(user) {
            //setLoading(false);
            //props.onChange(false);
            if (user) {
                console.log(user);
                props.onFinishedAuthentication(true);
                props.onChange(false);
            } else {
                // No user is signed in.
                //TODO: return false. returning true for now to avoid having to sign in during development
                props.onFinishedAuthentication(false);
                props.onChange(false);
            }
        });
    }

    return <div>
        <h2>Loading...</h2>
    </div>

}

export default CheckUserLoggedIn;