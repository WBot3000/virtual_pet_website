import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import CreateAPet from "../components/CreateAPet";
import Inventory from "../components/Inventory";
import ShopsList from "../components/ShopsList";
import GamesList from "../components/GamesList";
import RPS from "../components/RPS";
import CountingGame from "../components/CountingGame";
import ShopFront from "../components/ShopFront";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function ComponentCollection() {
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
      <div>
        <CreateAPet />
        <PetBox />
        <Inventory />
        <ShopsList />
        <GamesList />
        <RPS />
        <CountingGame />
        <ShopFront
          shopName="The Awesome Shop"
          shopQuotes={[
            "Hello there!",
            "So nice to see you...",
            "Please buy some stuff...",
          ]}
          shopInv={[
            { id: "123", name: "Shop Item A" },
            { id: "456", name: "Shop Item B" },
            { id: "789", name: "Shop Item C" },
          ]}
        />
      </div>
    );
  }
}

export default ComponentCollection;
