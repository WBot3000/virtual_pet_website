import {useState, useContext} from "react";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { Navigate } from 'react-router-dom';
function HomePage() {
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
            <h2>Welcome to Virtual Pet!</h2>
            <img src={require("../assets/FrontScreenPet.png")} alt={"Pet on Front Screen"}/>
            <p>Click <a href="/login">here</a> to login!</p>
        </div>
    }
}

export default HomePage;