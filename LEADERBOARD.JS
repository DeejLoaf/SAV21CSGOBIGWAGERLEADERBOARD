// Define the API URL
const apiUrl = "https://csgobig.com/api/partners/getRefDetails/Sav21faqfaslkhafsa?from=1672534861000&to=1702383132000";

// Initial storage for the total wagers at the start of each month
let initialWagers = {};

// Function to initialize initial wagers
function initializeInitialWagers(data) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const storedMonth = localStorage.getItem('storedMonth');

    // Retrieve initial wagers from localStorage if they exist
    const savedInitialWagers = localStorage.getItem('initialWagers');
    if (savedInitialWagers) {
        initialWagers = JSON.parse(savedInitialWagers);
    }

    // If it's a new month, reset initial wagers
    if (!storedMonth || parseInt(storedMonth) !== currentMonth) {
        initialWagers = {};
        data.forEach(user => {
            initialWagers[user.id] = user.wagerTotal; // Store the total wager at the start of the month
        });
        localStorage.setItem('initialWagers', JSON.stringify(initialWagers));
        localStorage.setItem('storedMonth', currentMonth.toString());
    }
}

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.success && result.results.length > 0) {
            const data = result.results;
            initializeInitialWagers(data); // Initialize initial wagers
            populateTable(data); // Populate table with data
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Populate the HTML table
function populateTable(data) {
    const tableBody = document.getElementById('wagerTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    // Sort data by monthly wager in descending order
    const sortedData = data.map(user => {
        const initialWager = initialWagers[user.id] || 0;
        return {
            username: user.name,
            monthlyWager: user.wagerTotal - initialWager // Calculate monthly wager
        };
    }).sort((a, b) => b.monthlyWager - a.monthlyWager);

    // Display top 10 wagerers
    sortedData.slice(0, 10).forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.monthlyWager.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch data when the page loads
fetchData();
