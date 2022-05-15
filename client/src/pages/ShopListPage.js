import Navigation from "../components/Navigation";
import ShopsList from "../components/ShopsList";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import user from "../data_access_layer/user";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid } from "@mui/material";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShopListPage() {
  const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
  const [userIsAuthenticated, setAuthenticated] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [dailyReward, setDailyReward] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserID) {
        const { data } = await user.GetUser(currentUserID);
        setCurrentUser(data);
      }
    };

    fetchData();
  }, [currentUserID]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const { data } = await axios.get(
          `http://localhost:3001/CheckIfDailyReward/${currentUser.gid}`
        );
        if (data.reward) {
          setDailyReward(data);
        }
      }
    };

    fetchData();
  }, [currentUser]);

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
    let reward = null;
    if (dailyReward) {
      reward = (
        <Alert>
          Thanks for being loyal! ${dailyReward.amount} has been added to your
          account!
        </Alert>
      );
    }
    return (
      <>
        <Navigation />
        {reward}
        <Grid container>
          <ShopsList/>
        </Grid>
      </>
    );
  }
}

export default ShopListPage;
