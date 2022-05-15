import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import Search from "../components/Search";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import { Grid } from "@mui/material";

function SearchPage() {
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
          <Grid item xs={12}>
            <Search userId={currentUserID}/>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default SearchPage;
