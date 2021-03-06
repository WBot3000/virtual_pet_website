import axios from "axios";
import {useState, useContext, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import Login from '../components/Login';

function LoginPage() {
    const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [userExistsInMongo, setUserInMongo] = useState(false);

    useEffect(() => {
        console.log('on load useeffect');
        async function fetchData() {
          if(currentUserID && displayName){
              console.log(currentUserID);
              console.log(displayName);
              await axios.post(`http://localhost:3001/OnGoogleLogin/${currentUserID}/${displayName}`);
              setUserInMongo(true);
          }
        }
        fetchData();
      }, [currentUserID, displayName]);

    const onFinishedChecking = (finished) => {
        setCheckedLogin(true);
    };

    const onSetAuthenticated = (authenticated) => {
        setAuthenticated(authenticated);
    }

    const onSetCurrentUserID = (id) => {
        setCurrentUserID(id);
    }

    const onSetDisplayName = (id) => {
        setDisplayName(id);
    }

    if (!checkedUserLoggedIn){
        return <CheckUserLoggedIn onFinished={onFinishedChecking} userIsAuthenticated={onSetAuthenticated} setUserId={onSetCurrentUserID}></CheckUserLoggedIn>
    }
    else if (!userIsAuthenticated){
        return <div>
            <h2>Login to Virtual Pet</h2>
            <Login userIsAuthenticated={onSetAuthenticated} setUserId={onSetCurrentUserID} setUserDisplayName={onSetDisplayName}></Login>
        </div>
    }
    else if (!userExistsInMongo){
        return <div>
        <h2>Loading...</h2>
        </div>
    }
    else if (userIsAuthenticated){
        return <Navigate to="/shops"></Navigate>
    }
    else
    {
        return <div>
        <h2>Loading...</h2>
        </div>
    }

}

export default LoginPage;