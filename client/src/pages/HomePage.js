import {useState, useContext} from "react";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { Navigate } from 'react-router-dom';
function HomePage() {
    const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);

    const onFinishedChecking = (finished) => {
        setCheckedLogin(true);
    };

    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated)
    }

    const onSetCurrentUserID = (id) => {
        setCurrentUserID(id)
    }

    if (!checkedUserLoggedIn){
        return <CheckUserLoggedIn onFinished={onFinishedChecking} userIsAuthenticated={onSetAuthenticated} setUserId={onSetCurrentUserID}></CheckUserLoggedIn>
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