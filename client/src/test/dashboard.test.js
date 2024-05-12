const axios = {
  put: jest.fn(),
};

function handleWin(user_id, competition_id, type, rank, stage) {
  rank += 1;
  stage += 1;
  axios.put(`http://localhost:8080/api/updaterankandstage/${user_id}/${competition_id}`, {
    type,
    rank,
    stage,
  });
}

function testHandleWin() {
  const user_id = 146;
  const competition_id = 9;
  const type = 'solo';
  let rank = 3;
  let stage = 2;

  handleWin(user_id, competition_id, type, rank, stage);

  if (axios.put.mock.calls.length === 1) {
    const call = axios.put.mock.calls[0];
    const url = call[0];
    const payload = call[1];
    if (url === `http://localhost:8080/api/updaterankandstage/${user_id}/${competition_id}` &&
      payload.type === type &&
      payload.rank === rank + 1 &&
      payload.stage === stage + 1) {
      console.log('Test passed');
    } else {
      console.error('Test failed');
    }
  } else {
    console.error('Test failed');
  }
}

testHandleWin();
