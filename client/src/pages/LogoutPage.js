import {useState, useContext} from "react";
import { Navigate } from 'react-router-dom';
import CheckUserLoggedIn from "../components/CheckUserLoggedIn";
import Logout from '../components/Logout';

function LogoutPage() {
    const [loading, setLoading] = useState(true);
    const onFinishedLoading = (loading) => {
        setLoading(loading);
    };

    if (loading){
        return <div>
        <Logout onChange={onFinishedLoading}></Logout>
    </div>
    }
    else{
        return <Navigate to="/"></Navigate>
    }
}

export default LogoutPage;