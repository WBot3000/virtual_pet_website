import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import ShopsList from "../components/ShopsList";
import React, {useEffect, useState, useContext, Component} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import user from "../data_access_layer/user";

function ShopListPage() {
    const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
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