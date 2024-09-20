// Define the API URL for your Google Sheets data
const apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=I1yqw0C6Yo21WhD5KGlXs5NR1k3nqfvKmhLxSbCm99XJlP5KrsZGPwWSsMjKox2hSCSm8DKLv00OfNHenXAIjazPJk6ldyc7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKq0DlNu78yxdgb-rrINvyBMTu_DnYPEPdYJUP3rVrBwPegCzs_8FQz22k7ZzEoAl-hvlUidHcLBu8tgrp4KrEcXSLoOc5Duqg&lib=M-oc_ToWrXe3ZGRbqKXnu3wfY0QbVsGWL'; // Replace with your web app URL

async function fetchAndDisplayLeaderboard() {
    try {
        // Fetch the data from the new API
        const response = await fetch(apiUrl, {
            method: 'GET' // Use GET since we're fetching data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data); // Log the entire API response for debugging

        // Check if the response is an array
        if (!Array.isArray(data)) {
            console.error('Invalid data structure:', data);
            throw new Error('Invalid data structure: response is not an array');
        }

        // Sort users by their wager in descending order
        data.sort((a, b) => b.wagerDifference - a.wagerDifference); // Adjust based on your API response fields

        // Get the top 15 users
        const top15Users = data.slice(0, 15);

        // Define the prize values for the top 15 users
        const prizes = [
            '$2100', '$1000', '$650', '$400', '$250', 
            '$175', '$100', '$90', '$75', '$50', 
            '$50', '$20', '$20', '$10', '$10'
        ];

        // Get the table body element
        const tbody = document.querySelector('#leaderboardTable tbody');

        // Clear any existing rows
        tbody.innerHTML = '';

        // Populate the table with the top 15 users and their prizes
        top15Users.forEach((user, index) => {
            const row = document.createElement('tr');

            const rankCell = document.createElement('td');
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);

            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.userId; // Change to the appropriate field
            row.appendChild(usernameCell);

            const wagerCell = document.createElement('td');
            wagerCell.textContent = user.wagerDifference.toFixed(2); // Change to the appropriate field
            row.appendChild(wagerCell);

            const prizeCell = document.createElement('td');
            prizeCell.textContent = prizes[index] || '$0'; // Use default if no prize
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
