import {useState, useContext} from "react";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { Navigate } from 'react-router-dom';
import {Typography,Grid} from '@mui/material';
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
            <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
            <img style={{height:500}} src={require("../assets/FrontScreenPet.png")} alt={"Pet on Front Screen"}/>
            <Typography variant="h2"><a href="/login">Click here to login!</a></Typography>
            </Grid>
        </div>
    }
}

export default HomePage;