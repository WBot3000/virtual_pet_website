import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const CheckUserLoggedIn = (props) => {
    const [loading, setLoading] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    if(loading){
        getAuth().onAuthStateChanged(function(user) {
            try {
                if (user) {
                    console.log(user);
                    props.userIsAuthenticated(true);
                    props.onFinished(true);
                    props.setUserId(user.uid);
                } else {
                    // No user is signed in.
                    props.userIsAuthenticated(false);
                    props.onFinished(true);
                }    
            } catch (error) {
                console.log(error);
            }
        });
    }

    return <div>
        <h2>Loading...</h2>
    </div>

}

export default CheckUserLoggedIn;