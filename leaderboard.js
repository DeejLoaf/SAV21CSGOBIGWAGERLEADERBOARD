<script>
const apiUrl = "https://csgobig.com/api/partners/getRefDetails/Sav21faqfaslkhafsa?from=1672534861000&to=1702383132000";

// Storage for initial wagers at the start of each month
let initialWagers = {};

// Initialize monthly wager at the start of the month
function initializeMonthlyWagers(data) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const savedInitialWagers = localStorage.getItem('initialWagers');

    if (savedInitialWagers) {
        initialWagers = JSON.parse(savedInitialWagers);
    }

    // Reset initial wagers if it's a new month
    if (!localStorage.getItem('lastUpdatedMonth') || currentDate.getMonth() !== parseInt(localStorage.getItem('lastUpdatedMonth'))) {
        initialWagers = {};

        data.forEach(user => {
            initialWagers[user.username] = user.total_wager;
        });

        localStorage.setItem('initialWagers', JSON.stringify(initialWagers));
        localStorage.setItem('lastUpdatedMonth', currentDate.getMonth().toString());
    }
}

// Fetch the data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Initialize initial wagers
        initializeMonthlyWagers(data);

        // Calculate monthly wagers
        const monthlyWagers = data.map(user => {
            const startingWager = initialWagers[user.username] || 0;
            const monthlyWager = user.total_wager - startingWager;
            return {
                username: user.username,
                monthlyWager: monthlyWager > 0 ? monthlyWager : 0
            };
        });

        // Sort by monthly wagers in descending order
        monthlyWagers.sort((a, b) => b.monthlyWager - a.monthlyWager);

        // Update the leaderboard
        updateLeaderboard(monthlyWagers.slice(0, 5)); // Top 10 users
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update the leaderboard display
function updateLeaderboard(topWagerers) {
    const tableBody = document.getElementById('leaderboardTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table

    topWagerers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.monthlyWager.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch data every 5 minutes
setInterval(fetchData, 5 * 60 * 1000);

// Initial fetch
fetchData();
</script>
