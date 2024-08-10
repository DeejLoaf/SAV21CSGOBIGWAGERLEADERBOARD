// Define the API URL
const apiUrl = 'https://script.google.com/macros/library/d/1DsH_HyH5b8OGaHVC3VjXms-9Oq7xDPim0hlRZunAIUUDKOTRAic1m3kh/10';

async function fetchAndDisplayLeaderboard() {
    try {
        // Fetch the data from the API using the proxy
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Transform the data
        const data = responseData; // No need for JSON.parse since the data is already an object

        // Initialize arrays to hold the data
        const usernames = [];
        const wagers = [];
        const betIds = [];
        const prizes = [];

        // Extract data from the response
        for (let i = 2; i <= 11; i++) {
            usernames.push(data[`A${i}`]);
            wagers.push(data[`B${i}`]);
            betIds.push(data[`C${i}`]);
            prizes.push(data[`D${i}`]);
        }

        // Create a list of user objects
        const users = usernames.map((username, index) => ({
            username: username,
            wager: wagers[index],
            betId: betIds[index],
            prize: prizes[index]
        }));

        // Get the table body element
        const tbody = document.querySelector('#leaderboardTable tbody');

        // Clear any existing rows
        tbody.innerHTML = '';

        // Populate the table with the data
        users.forEach((user, index) => {
            const row = document.createElement('tr');

            const rankCell = document.createElement('td');
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);

            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            row.appendChild(usernameCell);

            const wagerCell = document.createElement('td');
            wagerCell.textContent = user.wager.toFixed(2);
            row.appendChild(wagerCell);

            const betIdCell = document.createElement('td');
            betIdCell.textContent = user.betId;
            row.appendChild(betIdCell);

            const prizeCell = document.createElement('td');
            prizeCell.textContent = user.prize;
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
