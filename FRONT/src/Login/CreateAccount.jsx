import React, {useState} from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests

function CreateAccount() {

    const [isExistingUser, setIsExistingUser] = useState(true);
    const [username, setUsername] = useState(''); // Add this line
    const [password, setPassword] = useState(''); // Add this line

    const handleExistingUserClick = () => {
        setIsExistingUser(true);
    };

    const handleNewUserClick = () => {
        console.log('Sign up link clicked');
        setIsExistingUser(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Make a POST request to your backend API
        try {
            const response = await axios.post('/api/register', { username, password });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className={isExistingUser ? "signup-inactive" : "signin-active"} onClick={handleNewUserClick}>
                            <a>Sign up</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {isExistingUser ? (
                        <div>
                            <label htmlFor="fullname">Enter Shelter's name</label>
                            <input className="form-styling" type="text" name="username" placeholder="" value={username}
                                   onChange={e => setUsername(e.target.value)}/>
                            <label htmlFor="password">Create password</label>
                            <input className="form-styling" type="text" name="password" placeholder="" value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                            <div className="btn-animate">
                                <a className="btn-signin" onClick={handleSubmit}>Create your account</a>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="fullname">Enter shelter's name</label>
                            <input className="form-styling" type="text" name="fullname" placeholder="" value={username}
                                   onChange={e => setUsername(e.target.value)}/>
                            <label htmlFor="email">Email</label>
                            <input className="form-styling" type="text" name="email" placeholder="" value={username}
                                   onChange={e => setUsername(e.target.value)}/>
                            <label htmlFor="password">Create password</label>
                            <input className="form-styling" type="text" name="password" placeholder="" value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                            <button type="submit" className="btn-signup" onClick={handleSubmit}>REGISTER</button>
                        </div>
                    )}
                    <button type="button" className="btn-animate">
                        <Link to="/login">Go back</Link>
                    </button>
                    <div className="success">
                        <p> New User registered, Kindly check your email for confirmation.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateAccount;