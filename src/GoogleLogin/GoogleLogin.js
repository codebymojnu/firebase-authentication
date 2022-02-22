import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            const loggedInUser = {
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(loggedInUser);
            console.log(loggedInUser);
        })
        .catch(error => {
            alert(error.message);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUser({})
        })
    }

    return (
        <div style={{marginTop: '40px', marginBottom: '40px', border: '1px solid red', padding: '10px'}}>
             <h2>Google Login Practice</h2>
            {
                !user.name ? <button onClick={handleGoogleSignIn}>Google Sign In</button>
                : <button onClick={handleSignOut}>Sign Out</button>
            }
            {
                user.email && <div>
                    <h2>Welcome, {user.name}</h2>
                    <img src={user.photo} alt=""/>
                </div>
            }

        </div>
    )
}

export default GoogleLogin;