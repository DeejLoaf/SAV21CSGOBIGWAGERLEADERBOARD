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
        const data = JSON.parse(responseData.contents);

        console.log('API Response:', data); // Log the entire API response for debugging

        // Check if 'results' exists and is an array
        if (!data.results || !Array.isArray(data.results)) {
            console.error('Invalid data structure:', data);
            throw new Error('Invalid data structure: "results" is undefined or not an array');
        }

        // Check the structure of the first item to ensure it has the expected properties
        if (data.results.length > 0) {
            const firstItem = data.results[0];
            if (typeof firstItem.name === 'undefined' || typeof firstItem.wagerTotal === 'undefined' || typeof firstItem.betId === 'undefined') {
                console.error('Unexpected item structure:', firstItem);
                throw new Error('Unexpected item structure in "results" array');
            }
        }

        // Map the data to extract the necessary fields
        const users = data.results.map(user => ({
            username: user.name,
            totalWager: user.wagerTotal,
            betId: user.betId // Add the new field
        }));

        // Sort users by their total wager in descending order
        users.sort((a, b) => b.totalWager - a.totalWager);

        // Get the top 10 users
        const top10Users = users.slice(0, 10);

        // Define the prize values
        const prizes = ['$1500', '$1000', '$700', '$500', '$350', '$250', '$200', '$200', '$150', '$150'];

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

            const betIdCell = document.createElement('td');
            betIdCell.textContent = user.betId; // Add the new field
            row.appendChild(betIdCell);

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

// Call the function to fetch and display leaderboard on page load
fetchAndDisplayLeaderboard();
