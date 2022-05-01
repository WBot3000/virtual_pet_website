import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const CheckUserLoggedIn = (props) => {
    getAuth().onAuthStateChanged(function(user) {
        props.onChange(false);
        if (user) {
            props.onFinishedAuthentication(true);
        } else {
            // No user is signed in.
            props.onFinishedAuthentication(false);
        }
    });

    return <div>
        <h2>Loading...</h2>
    </div>

}

export default CheckUserLoggedIn;