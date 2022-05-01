import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import ShopsList from "../components/ShopsList";
import React, {useEffect, useState, useContext, Component} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import user from "../data_access_layer/user";

function ShopListPage() {
    const [loading, setLoading] = useState(true);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log(currentUserID)
            if(currentUserID){
                const {data} = await user.GetUser(currentUserID);
                setCurrentUser(data);
            }            
        };
    
        fetchData();
    }, [currentUserID]);

    const onFinishedLoading = (loading) => {
        setLoading(loading);
    };
    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated);
    }
    const onSetCurrentUserID = (user) => {
        setCurrentUserID(user.uid);
    }

    if (loading){
        return <CheckUserLoggedIn onChange={onFinishedLoading} onFinishedAuthentication={onSetAuthenticated} onFinishedUser={onSetCurrentUserID}></CheckUserLoggedIn>
    }

    else if (!userIsAuthenticated){
        return <Navigate to="/"></Navigate>
    }else
    {
        return <>
            <Navigation/>
            <PetBox/>
            <ShopsList/>
        </>
    }
}

export default ShopListPage;