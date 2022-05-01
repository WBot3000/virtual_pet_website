import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const CheckUserLoggedIn = (props) => {
    const [loading, setLoading] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    if(loading){
        getAuth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
                props.onFinishedAuthentication(true);
                props.onChange(false);
                props.onFinishedUser(user);
            } else {
                // No user is signed in.
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