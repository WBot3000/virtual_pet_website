import Navigation from "../components/Navigation";
import ShopFront from "../components/ShopFront";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import user from "../data_access_layer/user"
import { Grid } from "@mui/material";

const ShopPage = () => {
    const [loading, setLoading] = useState(true);
    const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [shopData, setShopData] = useState(null);
    const [errorOccured, setError] = useState(false);
    const [userMoney, setUserMoney] = useState(0);

    let { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            if (currentUserID) {
                try {
                    let { data } = await axios.get(`http://localhost:3001/getShop/${id}`);
                    setShopData(data);
                    let userData = await user.GetUser(currentUserID);
                    setUserMoney(userData.data.money);
                    setLoading(false);
                } catch (e) {
                    setError(true);
                }
            }
        }
        fetchData();
    }, [id, currentUserID]);

    const onFinishedChecking = (finished) => {
        setCheckedLogin(true);
    };

    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated)
    }

    const onSetCurrentUserID = (id) => {
        setCurrentUserID(id)
    }

    if (!checkedUserLoggedIn) {
        return <CheckUserLoggedIn onFinished={onFinishedChecking} userIsAuthenticated={onSetAuthenticated} setUserId={onSetCurrentUserID}></CheckUserLoggedIn>
    }
    else if (!userIsAuthenticated) {
        return <Navigate to="/"></Navigate>
    } else if (errorOccured) {
        return (
            <div>
                <Navigate to="/" />
            </div>
        );
    }
    else if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <>
                <Navigation />
                <Grid>
                    <ShopFront data={shopData} userId={currentUserID} money={userMoney} />
                </Grid>
            </>
        );
    }
}

export default ShopPage;