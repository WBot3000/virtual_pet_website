import ViewPetList from "../components/ViewPetList";
import Navigation from "../components/Navigation";
import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function ViewPetsPage() {
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

    /*else if (!userIsAuthenticated){
        return <Navigate to="/"></Navigate>
    }*/
    else if (!currentUserID){
        return <div>
            <h2>Loading...</h2>
        </div>
    }
    else
    {
        return <>
            <Navigation/>
            <h1 style={{textAlign: 'center'}}>Your Pets!</h1>
            <ViewPetList user_id={currentUserID}/>
        </>
    }
}

export default ViewPetsPage;