import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './css/New_Team.css';
function New_Team() {
    const [team_name, setName] = useState('');
    const [team_leader, setLeader] = useState('');
    const [competition_id, setCompetition_id] = useState(0);
    const [competitions, setCompetitions] = useState([]);
    const [limit, setLimit] = useState('');

    const { user_id } = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const data = await axios.get(`http://localhost:8080/api/competitions`);
            setCompetitions(data.data);
        } catch (error) {
            console.error('Error fetching competitions:', error);
        }
    };

    const handleSubmit = async (event) => {
        const values = { team_name, team_leader, competition_id };
        event.preventDefault();
        try {
            const data = await axios.post(`http://localhost:8080/api/create_team/${user_id}`, values);
            const res = data.data.message;
            if (res === 'success') {
                navigate(`/profile/team/${user_id}`);
            } else {
                setLimit(res);
            }
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='data'>
            <div className='container'>
                {limit && <div className="alert">{limit}</div>}
                <h2>New Team</h2>
                {competitions.length > 0 ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div className='inputBox'>
                            <select
                                required
                                onChange={(e) => setCompetition_id(e.target.value)}
                            >
                                <option value="">Select a Competition</option>
                                {competitions.map((competition) =>
                                    competition.type === 'team' && (
                                        <option key={competition.competition_id} value={competition.competition_id}>
                                            {competition.competition_name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="inputBox">
                            <input
                                type="text"
                                required
                                placeholder='Enter Name'
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="text"
                                required
                                placeholder='Enter Leader Name'
                                name="team_leader"
                                onChange={(e) => setLeader(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <input type="submit" value={'Finish'} />
                        </div>
                    </form>
                ) : (
                    <div>No competitions available</div>
                )}
            </div>
        </div>
    );
}

export default New_Team;
