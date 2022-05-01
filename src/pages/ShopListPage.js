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
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!loading && currentUser){
                const result = await user.GetUser(currentUser.uid);
                console.log(result);
                setCurrentUser(result);
            }            
        };
    
        fetchData();
    }, [loading]);

    const onFinishedLoading = (loading) => {
        setLoading(loading);
    };
    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated);
    }
    const onSetCurrentUser = (user) => {
        setCurrentUser(user);
    }

    if (loading){
        return <CheckUserLoggedIn onChange={onFinishedLoading} onFinishedAuthentication={onSetAuthenticated} onFinishedUser={onSetCurrentUser}></CheckUserLoggedIn>
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