import './App.css';
import FacebookLogin from './FacebookLogin/FacebookLogin';
import GoogleLogin from './GoogleLogin/GoogleLogin';
import SignUp from './SignUp.js/SignUp';

function App() {
  return (
    <div className="App">
      <h1>Firebase Auth Practice - 18.02.2022</h1>
      <GoogleLogin/>
      <SignUp/>
      <FacebookLogin/>
    </div>
  );
}

export default App;
