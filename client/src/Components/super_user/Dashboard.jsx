import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/dashboard.css';

function Dashboard() {
    const [competitions, setCompetitions] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/competitions');
            if (res) {
                setCompetitions(res.data)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleCompetition = (competition_id) => {
        navigate(`/competition/${competition_id}`)
    }

    useEffect(() => {
        getData();
        console.log(competitions.length)
    }, [])

    return (
        <div className='dcontainer'>
            <h1>Admin DashBoard</h1>
            <div className="competitions">
                {competitions.length > 0 && competitions.map((competition, index) => (
                        <div className="col" key={index}>
                            <input
                                className='item'
                                type="button"
                                value={competition.competition_name}
                                onClick={() => handleCompetition(competition.competition_id)}
                            />
                        </div>
                    ))}
            </div>
            <Link to={'/addcompetition'} className='dlink'>Add new Competition</Link>
        </div>
    );
}

export default Dashboard;
