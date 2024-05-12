import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './css/New_Player.css';

function New_Player() {
    const [competitor_name, setName] = useState('');
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
        const values = { competitor_name, competition_id };
        event.preventDefault();
        try {
            const data = await axios.post(`http://localhost:8080/api/player/${user_id}`, values);
            const res = data.data.message;
            if (res === 'success') {
                navigate(`/profile/solo/${user_id}`);
            } else {
                setLimit(res);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='data'>
            <div className='container'>
                {limit && (
                    <div className="alert">
                        {limit}
                    </div>
                )}
                <h2>New Player</h2>
                {competitions.length > 0 ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="inputBox">
                            <select
                                required
                                onChange={e => setCompetition_id(e.target.value)}
                            >
                                <option value="">Select a Competition</option>
                                {competitions.map((competition) => (
                                    competition.type === 'solo' && (
                                        <option key={competition.competition_id} value={competition.competition_id}>
                                            {competition.competition_name}
                                        </option>
                                    )
                                ))}
                            </select>
                        </div>
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
                            <input type='submit' value={'Finish'} />
                        </div>
                    </form>
                ) : (
                    <p>No competitions available</p>
                )}
            </div>
        </div>
    );
}

export default New_Player;
