import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import Inventory from "../components/Inventory";
import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function InventoryPage() {
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

    else if (!userIsAuthenticated){
        return <Navigate to="/"></Navigate>
    }else
    {
        return <>
            <Navigation/>
            <PetBox/>
            <Inventory/>
        </>
    }
}

export default InventoryPage;