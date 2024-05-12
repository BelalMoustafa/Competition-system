const axios = {
  get: jest.fn(), // Mocking Axios get method
};

let competitions = [];
const setCompetitions = (data) => {
  competitions = data;
};

let useEffectHookCallback = () => { }; // Initialize with an empty function
const useEffect = (callback) => {
  useEffectHookCallback = callback;
};

const navigate = (path) => {
  console.log('Navigated to:', path);
};

const useParams = () => ({
  user_id: '456',
});

let navigatePath = '';
const useNavigate = () => {
  const navigate = (path) => {
    navigatePath = path;
  };
  return navigate;
};

// Function to fetch data from API
async function getData() {
  try {
    const res = await axios.get('http://localhost:8080/api/competitions');
    setCompetitions(res.data); // Set competitions data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Test function for getData
async function testGetData() {
  await useEffectHookCallback(); // Call useEffect callback
  if (axios.get.mock.calls.length === 1) {
    const call = axios.get.mock.calls[0];
    const url = call[0];
    if (url === 'http://localhost:8080/api/competitions') {
      console.log('Test passed: Correct URL called');
    } else {
      console.error('Test failed: Incorrect URL');
    }
  } else {
    console.error('Test failed: axios.get not called');
  }
}

// Run the test
testGetData();
