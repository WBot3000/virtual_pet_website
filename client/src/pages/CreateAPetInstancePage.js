import CreateAPet from "../components/CreateAPet";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function CreateAPetInstancePage() {
  const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
  const [userIsAuthenticated, setAuthenticated] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [petData, setPetData] = useState(null);
  const [errorOccured, setError] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    console.log("on load useeffect");
    async function fetchData() {
      try {
        let { data } = await axios.get(
          `http://localhost:3001/GetAllData/${id}`
        );
        setPetData(data.allData);
      } catch (e) {
        setError(true);
      }
    }
    fetchData();
  }, []);

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
  } else if (!petData) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else if (errorOccured) {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  } else {
    let pageData = { petData, currentUserID };
    return (
      <>
        <Navigation />
        <h1 style={{ textAlign: "center" }}>Customize Your New Pet!</h1>
        <CreateAPet data={pageData} />
      </>
    );
  }
}

export default CreateAPetInstancePage;
