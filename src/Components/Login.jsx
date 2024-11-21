import React, { useState } from 'react';
import '/src/CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../Client';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', email, password);

    const { data } = await supabase
        .from('users')
        .select('email, password')
        .eq('email', email)

      
        if(data.length === 0) {
            alert('User not found! Please sign up.');
            return;
        }else if(data[0].password !== password) {
            alert('Incorrect password!');
            return;
        }else{
            alert('Login successful!');
            window.location.href = '/home';
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input type="submit" className="login-button" value="Log In" onClick={handleSubmit}/>
        </form>
        <div className="signup-footer">
          {/* <a href="#forgot-password">Forgot Password?</a> */}
          <Link to={`/signUp`}>Not a member? Sign Up!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
