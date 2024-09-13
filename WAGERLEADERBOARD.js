
// Define the API URL
const apiUrl = 'https://bc.game/api/agent/open-api/kol/invitees/';

async function fetchAndDisplayLeaderboard() {
    try {
        // Fetch the data from the new API
        const response = await fetch(apiUrl, {
            method: 'POST', // API requires POST method
            headers: {
                'Origin': 'https://bc.game/',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "invitationCode": "sav",
                "accessKey": "a1uY00IAM6surRWE",
                "beginTimestamp": 0, // Replace with your required timestamp
                "endTimestamp": 0    // Replace with your required timestamp
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data); // Log the entire API response for debugging

        // Check if 'data' exists and is an array (adjust this part based on the actual API response structure)
        if (!data.data || !Array.isArray(data.data)) {
            console.error('Invalid data structure:', data);
            throw new Error('Invalid data structure: "data" is undefined or not an array');
        }

        // Map the data to extract the necessary fields
        const users = data.data.map(user => ({
            username: user.username,
            totalWager: user.multi // Assuming 'multi' is the wager field in your new API
        }));

        // Sort users by their total wager in descending order
        users.sort((a, b) => b.totalWager - a.totalWager);

        // Get the top 10 users
        const top10Users = users.slice(0, 10);

        // Define the prize values
        const prizes = ['$1500', '$700', '$400', '$200', '$50', '$50', '$25', '$25', '$10', '$10'];

        // Get the table body element
        const tbody = document.querySelector('#leaderboardTable tbody');

        // Clear any existing rows
        tbody.innerHTML = '';

        // Populate the table with the top 10 users and their prizes
        top10Users.forEach((user, index) => {
            const row = document.createElement('tr');

            const rankCell = document.createElement('td');
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);

            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            row.appendChild(usernameCell);

            const wagerCell = document.createElement('td');
            wagerCell.textContent = user.totalWager.toFixed(2);
            row.appendChild(wagerCell);

            const prizeCell = document.createElement('td');
            prizeCell.textContent = prizes[index]; // Add the prize value
            row.appendChild(prizeCell);

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching or displaying leaderboard:', error);
        document.querySelector('.leaderboard').innerHTML = '<p>Failed to load leaderboard data. Please try again later.</p>';
    }
}

// Call the function to fetch and display leaderboard on page load
fetchAndDisplayLeaderboard();
