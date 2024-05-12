import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/login.css';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const values = { email, password };

        try {
            const res = await axios.post('http://localhost:8080/api/', values);
            const role = res.data[0].role;
            const type = res.data[0].type;
            const user_id = res.data[0].user_id;
            if (role === "admin") {
                navigate(`/admindashboard`);
            } else if (role === "competitor") {
                navigate(`/profile/${type}/${user_id}`);
            } else {
                setError('email or password is wrong');
            }
        } catch (error) {
            setError('email or password is wrong');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container">
            <div className='form-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <div className="alert">{error}</div>}
                    <div className='input-box'>
                        <input
                            type="email"
                            required
                            placeholder='Enter Email'
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-box'>
                        <input
                            type="password"
                            required
                            placeholder='Enter Password'
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input type='submit' value={'Login'} />
                    </div>
                    <p>create account ? <Link to='/signup' className="signup-link">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
