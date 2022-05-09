import ViewAPet from "../components/ViewAPet";
import Navigation from "../components/Navigation";
import axios from 'axios';
import {useState, useContext, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";

function ViewAPetPage() {
    const [checkedUserLoggedIn, setCheckedLogin] = useState(false);
    const [userIsAuthenticated, setAuthenticated] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [petData, setPetData] = useState(null);
    const [errorOccured, setError] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        console.log('on load useeffect');
        async function fetchData() {
            if(currentUserID){
                try {
                    let {data} = await axios.get(`http://localhost:3001/GetUserPet/${currentUserID}/${id}`);
                    let petData = data;
                    data = await axios.get(`http://localhost:3001/GetPetImage/${currentUserID}/${id}`);
                    setPetData({petData, img: data.data.image});
                  } catch (e) {
                    setError(true);
                  }
            }
        }
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
    }
    else if (!petData ){
        return <div>
            <h2>Loading...</h2>
        </div>
    }
    else if(errorOccured){
        return (
            <div>
                <Navigate to="/" />
            </div>
            );
    }
    else
    {
        let pageData = {petData, currentUserID}
        return <>
            <Navigation/>
            <h1 style={{textAlign: 'center'}}>Care For Your Pet!</h1>
            <ViewAPet data={pageData}/>
        </>
    }
}

export default ViewAPetPage;