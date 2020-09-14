import React, { useContext } from 'react';
import firebaseConfig from './firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
       
      if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
      }
        firebase.auth().signInWithPopup(provider).then(function(result) {
         const {displayName, email} = result.user
         const signedInUser = {name: displayName, email}   
           setLoggedInUser(signedInUser);
           history.replace(from);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
           
            var email = error.email;
        
            var credential = error.credential;
            // ...
          });  
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}> Google Sign in</button>
        </div>
    );
};

export default Login;