import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './css/add_competition.css';

function Add_Competition() {

    const [competition_name, setName] = useState('');
    const [type, setType] = useState('');
    const [win_points, setWinPoints] = useState(0);
    const [lose_points, setLosePoints] = useState(0);
    const [draw_points, setDrawPoints] = useState(0);
    const [no_players, setNumberOfPlayers] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const values = {
            competition_name, type, win_points,
            lose_points, draw_points, no_players
        };
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/api/addcompetition', values);
            if (res.data.message == 'Success') {
                navigate('/admindashboard')
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div className='data'>
            <div className='container'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Add New Competition</h2>
                    <div className='inputBox'>
                        <input
                            type="text"
                            required
                            placeholder='Enter Competition_Name'
                            name="name"
                            onChange={e => setName(e.target.value)}
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
                            <h3>Team</h3>
                        </div>
                        <div className="radio">
                            <input
                                type="radio"
                                value='solo'
                                name="type"
                                onChange={e => setType(e.target.value)}
                            />
                            <h3>Solo</h3>
                        </div>
                    </div>
                    {type == "team" &&
                        <div className="inputBox">
                            <input
                                type="hidden"
                                required
                                placeholder='Enter Number Of Competitors'
                                name="Draw_Points"
                                onChange={e => setNumberOfPlayers(e.target.value)}
                                value={5}
                            />
                        </div>
                    }

                    <div className="inputBox">
                        <input
                            type="number"
                            required
                            placeholder='Enter Win_Points'
                            name="Points"
                            onChange={e => setWinPoints(e.target.value)}
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            type="hidden"
                            required
                            placeholder='Enter Lose_Points'
                            name="Points"
                            onChange={e => setLosePoints(e.target.value)}
                            value={0}
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            type="number"
                            required
                            placeholder='Enter Draw_Points'
                            name="Points"
                            onChange={e => setDrawPoints(e.target.value)}
                        />
                    </div>
                    <div className="inputBox">
                        <input type="submit" value={'Add'} />
                    </div>
                    <Link to='/admindashboard' className="back">Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Add_Competition;