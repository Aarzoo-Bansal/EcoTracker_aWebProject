import React, { useState } from 'react';
import '/src/CSS/Login.css';
import { Link } from 'react-router-dom';
import { supabase } from '../../Client';


function SignUp() {
    const [confirmPassword, setPassword] = useState('');

    const [userDetails, setUserDetails] = useState({
        'name': '',
        'password': '',
        'email': ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(userDetails.email)) {
            alert('Please enter a valid email address!');
            return
        }

        else if (userDetails.password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        else {const ans = await supabase
            .from('users')
            .insert(
                { name: userDetails.name, email: userDetails.email, password: userDetails.password })
            .select();

        if (ans.error && ans.error.message == 'duplicate key value violates unique constraint "users_email_key"') {
            alert('User already exists! Please login.');
            return;
        } else {
            alert('User created successfully! 🎉🥳');
            window.location.href = '/';
        }
    }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-header">
                    <img src="src/assets/icon1.png" alt="App Logo" className="app-logo" />
                    <h1 className="app-name">Eco Tracker</h1>
                    <h4>Cultivating a greener tomorrow: Our path to sustainable living begins here.</h4>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input type="submit" className="login-button" value="Sign Up" />
                    </div>
                </form>
                <div className="signup-footer">
                    <Link to={`/`}>Already a member? Login here!</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
