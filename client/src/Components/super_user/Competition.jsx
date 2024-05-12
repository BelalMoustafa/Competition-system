import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/comp.css';

function Dashboard() {
    const [teams, setTeams] = useState([]);
    const [type, setType] = useState('')
    const [cName, setCName] = useState('')
    const { competition_id } = useParams()
    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/competition/${competition_id}`);
            setTeams(res.data)
            setType(res.data[0].type)
            setCName(res.data[0].competition_name)
        } catch (error) {
            console.error('Error logging in:', error)
        };
    }

    const handleWin = async (user_id, competition_id, type, rank, stage) => {
        rank += teams[0].win_points;
        stage += 1;
        try {
            await axios.put(`http://localhost:8080/api/updaterankandstage/${user_id}/${competition_id}`, {
                type,
                rank,
                stage
            })
            getData();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    const handleDraw = async (user_id, competition_id, type, rank, stage) => {
        rank += teams[0].draw_points;
        try {
            await axios.put(`http://localhost:8080/api/updaterankandstage/${user_id}/${competition_id}`, {
                type,
                rank,
                stage
            })
            getData();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    const handleLose = async (user_id, competition_id, type, rank, stage) => {
        if (rank > 0) {
            rank -= teams[0].lose_points;
        }
        if (stage > 0) {
            stage = 0;
        }
        try {
            await axios.put(`http://localhost:8080/api/updaterankandstage/${user_id}/${competition_id}`, {
                type,
                rank,
                stage
            })
            getData();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='data'>
            {teams &&
                <div className='container'>
                    <h2>{cName}</h2>
                    <div className='table'>
                        <div className='thead'>
                            {type === "team" && <div className='row'>
                                <div className='cell'><h3>no.</h3></div>
                                <div className='cell'><h3>Team_name</h3></div>
                                <div className='cell'><h3>Team_Rank</h3></div>
                                <div className='cell'><h3>Team_Stage</h3></div>
                                <div className='cell'><h3>Actions</h3></div>
                            </div>}
                            {type === "solo" && <div className='row'>
                                <div className='cell'><h3>no.</h3></div>
                                <div className='cell'><h3>Player_name</h3></div>
                                <div className='cell'><h3>Player_Rank</h3></div>
                                <div className='cell'><h3>Player_Stage</h3></div>
                                <div className='cell'><h3>Actions</h3></div>
                            </div>}
                        </div>
                        <div className='tbody'>
                            {teams.map((team, index) => (
                                <div className='row'>
                                    <div className='cell'><h3>{index + 1}</h3></div>
                                    <div className='cell'><h3>{team.name}</h3></div>
                                    <div className='cell'><h3>{team.rank}</h3></div>
                                    <div className='cell'><h3>{team.stage}</h3></div>
                                    <div className='cell action-buttons'>
                                        <input type="button" value="win" onClick={() => handleWin(team.user_id, team.competition_id, team.type, team.rank, team.stage)} />
                                        <input type="button" value="lose" onClick={() => handleLose(team.user_id, team.competition_id, team.type, team.rank, team.stage)} />
                                        <input type="button" value="draw" onClick={() => handleDraw(team.user_id, team.competition_id, team.type, team.rank, team.stage)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tback">
                        <Link to={'/admindashboard'} className='link'>Back</Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;
