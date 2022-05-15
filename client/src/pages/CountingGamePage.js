import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import CountingGame from "../components/CountingGame";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { Grid } from "@mui/material";

function CountingGamePage() {
  const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
  const [userIsAuthenticated, setAuthenticated] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);

  const onFinishedChecking = (finished) => {
    setCheckedLogin(true);
  };

  const onSetAuthenticated = (authenticated) => {
    setAuthenticated(authenticated);
  };

  const onSetCurrentUserID = (id) => {
    setCurrentUserID(id);
  };

  if (!checkedUserLoggedIn) {
    return (
      <CheckUserLoggedIn
        onFinished={onFinishedChecking}
        userIsAuthenticated={onSetAuthenticated}
        setUserId={onSetCurrentUserID}
      ></CheckUserLoggedIn>
    );
  } else if (!userIsAuthenticated) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
      <>
        <Navigation />
        <Grid container>
          <Grid item xs={5}>
            <PetBox />
          </Grid>
          <Grid item xs={7}>
            <CountingGame userId={currentUserID}/>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CountingGamePage;
