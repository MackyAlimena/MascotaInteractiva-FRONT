import React, {useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import axios to make HTTP requests
function Login() {

    const [isExistingUser, setIsExistingUser] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const serverUrl = "http://54.163.210.212:3001"

    const navigate = useNavigate(); // Get the navigate function

    const handleExistingUserClick = () => {
        setIsExistingUser(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Make a POST request to your backend API
        try {
            const response = await axios.post(`${serverUrl}/login`, { username, password });
            console.log(response.data);
            navigate('/data'); // Navigate to Data page after successful login
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className={isExistingUser ? "signin-active" : "signup-inactive"}
                            onClick={handleExistingUserClick}>
                            <button>Sign in</button>
                        </li>
                    </ul>
                </div>
                <div>
                    <label htmlFor="fullname">Shelter's name</label>
                    <input className="form-styling" type="text" name="username" placeholder="" value={username}
                           onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input className="form-styling" type="text" name="password" placeholder="" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="button" className="btn-signin" onClick={handleSubmit}>Login to your account</button>

                    <button type="button" className="btn-animate">
                        <Link to="/data">Test</Link>
                    </button>
                    <div className="success">
                        <p> New User registered, Kindly check your email for confirmation.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;