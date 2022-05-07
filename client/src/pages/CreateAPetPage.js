import CreateAPet from "../components/CreateAPet";
import CreateAPetList from "../components/CreateAPetList";
import Navigation from "../components/Navigation";
import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function CreateAPetPage() {
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

    //else if (!userIsAuthenticated){
        //return <Navigate to="/"></Navigate>
    //}
    else
    {
        return <>
            <Navigation/>
            <h1 style={{textAlign: 'center'}}>Create A Pet!</h1>
            <CreateAPetList/>
        </>
    }
}

export default CreateAPetPage;