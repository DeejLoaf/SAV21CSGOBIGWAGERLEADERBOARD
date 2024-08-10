const corsProxy = 'https://api.allorigins.win/get?url='; // Alternative public CORS proxy
const apiUrl = `${corsProxy}${encodeURIComponent('https://csgobig.com/api/partners/getRefDetails/Sav21faqfaslkhafsa?from=1672534861000&to=1702383132000')}`;

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

        // Check if 'wagers' exists and is an array
        if (!data || !Array.isArray(data.wagers)) {
            console.error('Invalid data structure:', data);
            throw new Error('Invalid data structure: "wagers" is undefined or not an array');
        }

        // Map the data to extract the necessary fields
        const users = data.wagers.map(user => ({
            username: user.name,
            totalWager: user.wagerTotal
        }));

        // Sort users by their total wager in descending order
        users.sort((a, b) => b.totalWager - a.totalWager);

        // Get the top 10 users
        const top10Users = users.slice(0, 10);

        // Get the table body element
        const tbody = document.querySelector('#leaderboardTable tbody');

        // Clear any existing rows
        tbody.innerHTML = '';

        // Populate the table with the top 10 users
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

