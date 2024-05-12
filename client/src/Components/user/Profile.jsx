import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/profile.css';

function Profile() {
    const [competitions, setCompetitions] = useState([]);
    const [competitorName, setCompetitorName] = useState('');
    const { type, user_id } = useParams();

    const getTeamData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/viewteam/${user_id}`);
            setCompetitions(res.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const getPlayerData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/viewplayer/${user_id}`);
            setCompetitions(res.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (type === 'team') {
            getTeamData();
        } else if (type === 'solo') {
            getPlayerData();
        }
    }, []);
    console.log(competitions.length)
    return (
        <div className='data'>
            <div className='container'>
                <div className='table'>
                    <div className='thead'>
                        {type === 'team' && (
                            <div className='row'>
                                <div className='cell'>
                                    <h3>Competition</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Team_Name</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Team_Leader</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Team_Rank</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Team_Stage</h3>
                                </div>
                            </div>
                        )}
                        {type === 'solo' && (
                            <div className='row'>
                                <div className='cell'>
                                    <h3>Competition</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Player_name</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Player_Rank</h3>
                                </div>
                                <div className='cell'>
                                    <h3>Player_Stage</h3>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='tbody'>
                        
                        {competitions.length > 0 ? (
                            competitions.map((competition) => (
                                <div className='row' key={competition.competition_id}>
                                    <div className='cell'>
                                        <h3>{competition.competition_name}</h3>
                                    </div>
                                    <div className='cell'>
                                        <h3>{type === 'team' ? competition.team_name : competition.competitor_name}</h3>
                                    </div>
                                    <div className='cell'>
                                        <h3>{competition.rank}</h3>
                                    </div>
                                    <div className='cell'>
                                        <h3>{competition.stage}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='row'>
                                <div className='cell' colSpan='4'>
                                    <h3>No competitions available</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {type === 'team' && (
                    <div className='tback'>
                        <Link to={`/createteam/${user_id}`} className='link'>
                            Join new Competition
                        </Link>
                    </div>
                )}
                {type === 'solo' && (
                    <div className='tback'>
                        <Link to={`/newplayer/${user_id}`} className='link'>
                            Join new Competition
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
