import React from 'react';
import firebase from '../Firebase';
import { getAuth } from "firebase/auth";

const Logout = (props) => {
    getAuth().signOut().then(function() {
        console.log("Logged out")
        props.onChange(false);
    }, function(error){
        props.onChange(false);
    });

    return <div>
    <h2>Logging out...</h2>
    </div>
}

export default Logout;