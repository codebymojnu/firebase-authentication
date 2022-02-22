import { FacebookAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';
initializeAuthentication();

const facebookProvider = new FacebookAuthProvider();

const FacebookLogin = () => {
    const auth = getAuth();
    const [ user, setUser ] = useState({});


    const handleFacebookLogin = () => {
        signInWithPopup(auth, facebookProvider)
        .then(result => {
            const {displayName, photoURL, email} = result.user;
            const loggedInUser = {
                displayName: displayName,
                email: email,
                photoURL: photoURL
            };
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    // const handle signout
    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            setUser({});
        })
    }
    return (
        <div style={{border: '2px solid red', margin: '40px', padding: '20px'}}>
            <h2>Facebook Login</h2>
            {
                user?.displayName ? <div>
                    <h4>{user.displayName}</h4>
                    <img src={user.photoURL} alt="user"/>
                    <p>Email: {user.email}</p>
                </div> : ''
            }
            {
                !user?.displayName ? <button onClick={handleFacebookLogin}>Facebook Sign In</button>
                : <button onClick={handleSignOut}>Sign Out</button>
            }
            
        </div>
    );
};

export default FacebookLogin;