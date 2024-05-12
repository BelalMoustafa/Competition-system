import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './css/signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        const values = { name, email, password, type };
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/signup', values);
            const user_id = res.data[0].user_id
            if (type === 'team' && user_id) {
                navigate(`/createteam/${user_id}`)
            } else if (type === 'solo' && user_id) {
                navigate(`/newplayer/${user_id}`)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div className="signup-container">
            <div className='form-container'>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className="inputBox">
                        <input
                            type="text"
                            required
                            placeholder='Enter Name'
                            name="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="inputBox">
                        <input
                            type="email"
                            required
                            placeholder='Enter Email'
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="inputBox">
                        <input
                            type="password"
                            required
                            placeholder='Enter Password'
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <div className="radio">
                            <input
                                type="radio"
                                value='team'
                                name="type"
                                onChange={e => setType(e.target.value)}
                            />
                            <label>Team</label>
                        </div>
                        <div className="radio">
                            <input
                                type="radio"
                                value='solo'
                                name="type"
                                onChange={e => setType(e.target.value)}
                            />
                            <label>Solo</label>
                        </div>
                    </div>
                    <div className="inputBox">
                        <input type="submit" value={'Create Account'} className="submit-btn" />
                    </div>
                    <p>Already have an account? <Link to='/' className="login-link">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
