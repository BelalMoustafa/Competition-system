const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'competition_system',
});

db.connect((err) => {
	if (err) {
		console.error('Database connection error:', err);
	} else {
		console.log('Connected to the database');
	}
});

app.post('/api', (req, res) => {
	const { email, password } = req.body
	db.execute(
		`select role, type, user_id from users where email='${email}' and password='${password}'`,
		(err, data) => {
			if (err) {
				res.json({ error: "error", err })
			}
			if (data.length > 0) {
				res.json(data)
			} else {
				res.json({ message: "faile" })
			}
		}
	)
});

app.get('/api/competitions', (req, res) => {
	db.execute(`select competition_name, competition_id, type, no_players from competitions`,
		(err, data) => {
			if (err) {
				res.json({ error: "error", err })
			} else if (data.length > 0) {
				res.json(data)
			} else {
				res.json({ message: "no competitions yet" })
			}
		})
});

app.get('/api/competition/:competition_id', (req, res) => {
	const { competition_id } = req.params
	db.execute(`
	select * from competitions where competition_id = ${competition_id}
	`, (err, data) => {
		if (err) {
			res.json({ err });
		} else {
			if (data[0].type == "team") {
				db.execute(`
				SELECT  c.competition_id,c.competition_name, c.type, 
				c.win_points, c.lose_points, c.draw_points,
				t.user_id, t.stage, t.team_name as name, t.rank
				FROM competitions c
        		LEFT JOIN teams t ON c.competition_id = t.competition_id
				WHERE c.competition_id = ${competition_id} 
				order by rank desc
				`, (error, team_data) => {
					if (err) {
						res.json({ errors: "error", error });
					} else if (data.length > 0) {
						res.json(team_data);
					} else {
						res.json({ message: "No competitions yet" });
					}
				});
			} else {
				db.execute(`
				SELECT  c.competition_id,c.competition_name, c.type, 
				c.win_points, c.lose_points, c.draw_points,
				s.user_id, s.competitor_name as name, s.rank, s.stage 
				FROM competitions c
        		LEFT JOIN solo s ON c.competition_id = s.competition_id
				WHERE c.competition_id = ${competition_id} 
				order by rank desc 
				`, (error, player_data) => {
					if (err) {
						res.json({ errors: "error", error });
					} else if (data.length > 0) {
						res.json(player_data);
					} else {
						res.json({ message: "No competitions yet" });
					}
				});
			}
		}
	})
});

app.post('/api/addcompetition', (req, res) => {
	const {
		competition_name, type, win_points,
		lose_points, draw_points, no_players
	} = req.body;

	db.execute(`
		insert into competitions 
		(competition_name, type, win_points, lose_points, draw_points, no_players) 
		values(
		'${competition_name}','${type}',
		'${win_points}',' ${lose_points}',
		'${draw_points}', '${no_players}'
		)`,
		(err, data) => {
			if (err) {
				res.json({ error: "error", err })
			} else {
				res.json({ message: "Success" })
			}
		})
});

app.put('/api/updaterankandstage/:user_id/:competition_id', (req, res) => {
	const { user_id, competition_id } = req.params;
	const { type, rank, stage } = req.body;
	if (type == "team") {
		db.execute(`
		UPDATE teams SET rank='${rank}', stage='${stage}' 
		WHERE user_id = ${user_id} AND competition_id = ${competition_id}
		`, (err) => {
			if (err) {
				res.json({ message: "error", err })
			} else {
				res.json({ message: "Update Successfully" })
			}
		})
	} else {
		db.execute(`
		UPDATE solo SET rank='${rank}', stage='${stage}' 
		WHERE user_id = ${user_id} AND competition_id = ${competition_id}
		`, (err) => {
			if (err) {
				res.json({ message: "error", err })
			} else {
				res.json({ message: "Update Successfully" })
			}
		})
	}
})

app.post('/api/signup', (req, res) => {
	const { name, email, password, type } = req.body
	db.execute(`
    insert into users (name, email, password, type) 
    values ('${name}', '${email}', '${password}', '${type}')
    `, (err) => {
		if (err) {
			res.json({ message: 'error', err })
		} else {
			db.execute(`select user_id from users where email='${email}'`, (error, data) => {
				res.json(data);
			})
		}
	})
});

app.post('/api/create_team/:user_id', (req, res) => {
	const { user_id } = req.params;
	const { team_name, team_leader, competition_id } = req.body;
	db.execute(`select count(${user_id}) as tnum from teams`, (err, data) => {
		if (data[0].tnum >= 4) {
			res.json({ message: 'The max number of Teams is 4' })
		} else {
			db.execute(`select count(${user_id}) as num from teams where user_id=${user_id}`, (error, num) => {
				if (error) {
					res.json({ message: 'error', error })
				} else {
					if (num[0].num >= 5) {
						res.json({ message: 'The max number of event you can join is 5' })
					} else {
						db.execute(`
						insert into teams (user_id, competition_id, team_name, team_leader) 
						values ('${user_id}', '${competition_id}', '${team_name}', '${team_leader}')
						` , (err) => {
							if (err) {
								res.json({ message: 'error', err })
							} else {
								res.json({ message: 'success' })
							}
						}
						)
					}
				}
			})
		}
	})
});

app.post('/api/player/:user_id', (req, res) => {
	const { user_id } = req.params;
	const { competitor_name, competition_id } = req.body;
	db.execute(`select count(*) as existing from solo where user_id='${user_id}' and competition_id='${competition_id}'`, (existingError, existingData) => {
		if (existingError) {
			res.json({ message: 'error', existingError });
		} else {
			if (existingData[0].existing > 0) {
				res.json({ message: 'User is already registered in this competition' });
			} else {
				db.execute(`select count(${user_id}) as snum from teams`, (err, data) => {
					if (data[0].snum >= 20) {
						res.json({ message: 'The max number of individuals is 20' });
					} else {
						db.execute(`select count(${user_id}) as num from solo where user_id=${user_id}`, (error, num) => {
							if (error) {
								res.json({ message: 'error', error });
							} else {
								if (num[0].num >= 5) {
									res.json({ message: 'The max number of events you can join is 5' });
								} else {
									db.execute(`
                                        insert into solo (user_id, competition_id, competitor_name) 
                                        values ('${user_id}', '${competition_id}', '${competitor_name}')
                                    `, (err) => {
										if (err) {
											res.json({ message: 'error', err });
										} else {
											db.execute(`select player_id from solo where user_id='${user_id}'`, (selectError, selectData) => {
												if (selectError) {
													res.json({ message: 'error', selectError });
												} else {
													res.json({ message: 'success', player_id: selectData[0].player_id });
												}
											});
										}
									});
								}
							}
						});
					}
				});
			}
		}
	});
});


app.get('/api/viewteam/:user_id', (req, res) => {
	const { user_id } = req.params;
	db.execute(`
	select t.competition_id, t.team_name, t.team_leader,
	t.rank, t.stage , c.competition_name
	from teams t
	left join competitions c on c.competition_id = t.competition_id
	where user_id= ${user_id}
	`, (err, data) => {
		if (err) {
			res.json({ error: "error", err })
		} else if (data.length > 0) {
			res.json(data)
		} else {
			res.json({ message: "no competitions" })
		}
	})
})

app.get('/api/viewplayer/:user_id', (req, res) => {
	const { user_id } = req.params;
	db.execute(`
        select s.competitor_name, s.rank, s.stage, c.competition_name 
        from solo s
        left join competitions c on c.competition_id = s.competition_id
        where s.user_id = ${user_id}
    `, (err, data) => {
		if (err) {
			res.json({ error: "error", err });
		} else if (data.length > 0) {
			res.json(data);
		} else {
			res.json({ message: "no competitions" });
		}
	});
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});