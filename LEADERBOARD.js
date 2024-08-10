// URL of the API
const apiUrl = 'https://csgobig.com/api/partners/getRefDetails/Sav21faqfaslkhafsa?from=1672534861000&to=1702383132000';

// Function to fetch data from the API and process it
async function fetchAndDisplayLeaderboard() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming data.wagers contains an array of user objects with 'username' and 'totalWager' properties
        const users = data.wagers;

        // Sort users by their total wager in descending order
        users.sort((a, b) => b.totalWager - a.totalWager);

        // Get the top 10 users
        const top10Users = users.slice(0, 10);

        // Get the table body element
        const tbody = document.querySelector('#leaderboardTable tbody');

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
            wagerCell.textContent = user.totalWager.toFixed(2); // Assuming totalWager is a number
            row.appendChild(wagerCell);

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching or displaying leaderboard:', error);
    }
}

// Call the function to fetch and display leaderboard on page load
fetchAndDisplayLeaderboard();
