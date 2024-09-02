(function() {
    // Define the API URL within the IIFE to avoid conflicts
    const apiUrl = 'https://script.google.com/macros/s/AKfycbxlJ3ITJ-EIHzrBi3v9lE5rfRSV_4sxvMbCLxBlJIYr9cZG4fk2_8cl0Wasbxa7S74/exec';

    // Function to fetch data from the API and populate the table
    async function fetchData() {
        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract values from the API response
            const usernames = [
                data['A2'], data['A3'], data['A4'], data['A5'], data['A6'],
                data['A7'], data['A8'], data['A9'], data['A10'], data['A11']
            ];
            const multi = [
                data['B2'], data['B3'], data['B4'], data['B5'], data['B6'],
                data['B7'], data['B8'], data['B9'], data['B10'], data['B11']
            ];
            const betIds = [
                data['C2'], data['C3'], data['C4'], data['C5'], data['C6'],
                data['C7'], data['C8'], data['C9'], data['C10'], data['C11']
            ];
            const prizes = [
                data['D2'], data['D3'], data['D4'], data['D5'], data['D6'],
                data['D7'], data['D8'], data['D9'], data['D10'], data['D11']
            ];

            // Get the table body element
            const tbody = document.querySelector('#leaderboardTable tbody');
            
            // Clear existing rows
            tbody.innerHTML = '';

            // Populate the table with the fetched data
            for (let i = 0; i < 10; i++) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${usernames[i]}</td>
                    <td>${multi[i]}</td>
                    <td><a href="${betIds[i]}" target="_blank">View Bet</a></td>
                    <td>$${parseFloat(prizes[i]).toFixed(2)}</td> <!-- Display prize data with dollar sign -->
                `;
                tbody.appendChild(row);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call the function to fetch data and populate the table
    fetchData();

})();

