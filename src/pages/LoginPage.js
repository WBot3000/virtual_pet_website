import {useState, useContext} from "react";
import Login from '../components/Login';
import Logout from '../components/Logout';
import { Navigate } from 'react-router-dom';
import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LoginPage() {
    const [loading, setLoading] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    if(loading){
        getAuth().onAuthStateChanged(function(user) {
            setLoading(false);
            if (user) {
                setLoggedin(true);
            } else {
                // No user is signed in.
                //TODO: return false. returning true for now to avoid having to sign in during development
                setLoggedin(true);
            }
        });
    }

    if(loading)
        return <div>
            <h2>Loading...</h2>
        </div>
    else if(!loggedin){
        return <div>
            <h2>Login to Virtual Pet</h2>
            <Login/>
            <Logout/>
        </div>
    }
    else {
        return <div>
          <Navigate to="/shops" />
        </div>
    }
}

export default LoginPage;