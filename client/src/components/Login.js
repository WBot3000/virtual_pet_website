import React from 'react';
import firebase from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const Login = (props) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
      });

    let performGoogleLogin = function (){
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(auth)
                props.onFinishedAuthentication(true);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                console.log(error)
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    
    return (
        <div>
        <img
            onClick={() => performGoogleLogin()}
            alt="google signin"
            src="/imgs/btn_google_signin.png"
        />
        </div>
    );
};

export default Login;
