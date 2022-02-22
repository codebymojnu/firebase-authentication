import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});

    const auth = getAuth();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    // password validatation


    // handle Registration

    const handleRegistration = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Email Verify
                emailVerify();
                // set user name
                setUserName();

                const user = userCredential.user;
                console.log(user);
                setError('');
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });

    }

    // handle LogIn

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setLoggedInUser(user);
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    // Send Email Verification
    const emailVerify = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result);
            })
    }

    // handle Password Reset Email
    const handlePasswordResetEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {

            })
            .catch((error) => {
                setError(error.message);
            })
    }

    // set user name when success Registration
    const setUserName = () => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(result => { })
    }
    // checkbox handle
    const handleRegisterCheck = (e) => {
        setIsRegistered(e.target.checked)
    }

    return (
        <div className="container w-50">
            <h4>{
                loggedInUser?.displayName ? loggedInUser.displayName : ''}</h4>
            <form onSubmit={isRegistered ? handleLogin : handleRegistration}>
                {
                    !isRegistered ? <div className="form-group">
                        <input type="text" className="form-control" id="name" onBlur={handleNameChange} placeholder="Your Name" required />
                    </div> : ''
                }
                <br />
                <div className="form-group">
                    <input type="email" className="form-control" id="email" onBlur={handleEmailChange} placeholder="Enter email" required />
                </div>
                <br />
                <div className="form-group">
                    <input type="password" className="form-control" id="password" onBlur={handlePasswordChange} placeholder="Password" required />
                </div>

                <p className="text-danger">{error}</p>
                <br />
                <div className="mb-3">
                    <input type="checkbox" name="registration" id="registration" onChange={handleRegisterCheck} />
                    <label htmlFor="registration">
                        Already Registered?
                    </label>
                </div>
                {
                    isRegistered ? <button type="submit" className="btn btn-primary">Sign In</button>
                        : <button type="submit" className="btn btn-primary">Sign Up</button>
                }
                <button className="btn-danger m-2" onClick={handlePasswordResetEmail}>Forget Password</button>
            </form>
        </div>
    );
};

export default SignUp;