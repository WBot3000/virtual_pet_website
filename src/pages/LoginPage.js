import {useState, useContext} from "react";
import Login from '../components/Login';
import Logout from '../components/Logout';
import { Navigate } from 'react-router-dom';
import firebase from '../Firebase';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LoginPage() {
    const [loading, setLoading] = useState(true);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const onFinishedLoading = (loading) => {
        setLoading(loading);
    };

    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated)
    }

    if (loading){
        return <CheckUserLoggedIn onChange={onFinishedLoading} onFinishedAuthentication={onSetAuthenticated}></CheckUserLoggedIn>
    }

    else if (userIsAuthenticated){
        return <Navigate to="/shops"></Navigate>
    }else
    {
        return <div>
            <h2>Login to Virtual Pet</h2>
            <Login onFinishedAuthentication={onSetAuthenticated}></Login>
        </div>
    }

}

export default LoginPage;