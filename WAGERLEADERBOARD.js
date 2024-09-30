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

        // Sort users by their wager difference in descending order
        data.sort((a, b) => b.wagerDifference - a.wagerDifference); // Adjust based on your API response fields

        // Get the top 10 users (instead of top 15)
        const top10Users = data.slice(0, 10);

        // Define the updated prize values for the top 10 users
        const prizes = [
            '$5000', '$3750', '$2500', '$1250', '$1000', 
            '$625', '$375', '$250', '$125', '$125'
        ];

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

            const nameCell = document.createElement('td');
            nameCell.textContent = user.name; // Change to the appropriate field for the name
            row.appendChild(nameCell);

            const wagerCell = document.createElement('td');
            let wagerDifference = user.wagerDifference; // Get the wagerDifference

            // Log the wagerDifference for debugging
            console.log(`User: ${user.name}, wagerDifference:`, wagerDifference, typeof wagerDifference);

            // Check if wagerDifference is a number or can be converted to a number
            wagerDifference = Number(wagerDifference); // Convert to number

            // Check if it's a valid number
            if (!isNaN(wagerDifference)) {
                wagerCell.textContent = `$${wagerDifference.toFixed(2)}`; // Add dollar sign and use toFixed if it's a valid number
            } else {
                wagerCell.textContent = 'N/A'; // Display 'N/A' if it's not a valid number
            }
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

