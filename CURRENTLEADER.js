// Define the API URL
const apiUrl = 'https://script.google.com/macros/s/AKfycbxlJ3ITJ-EIHzrBi3v9lE5rfRSV_4sxvMbCLxBlJIYr9cZG4fk2_8cl0Wasbxa7S74/exec';

// Function to fetch data from the API and update the top user box
async function fetchTopUser() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Log the fetched data to the console for debugging
        console.log('Fetched data:', data);

        // Extract usernames from the API response
        const usernames = [
            data['A2'], data['A3'], data['A4'], data['A5'], data['A6'],
            data['A7'], data['A8'], data['A9'], data['A10'], data['A11']
        ];

        // Get the top user's name (assuming the first item is the top user)
        const topUser = usernames[0] || 'Unknown';
        
        console.log('Top user:', topUser); // Log the top user for debugging

        // Update the top user box
        document.getElementById('topUserBox').innerHTML = `
            <div><strong>TOP USER:</strong></div>
            <div style="font-size: 24px;">${topUser}</div>
        `;
    } catch (error) {
        console.error('Error fetching top user data:', error);
    }
}

// Call the function to fetch data and update the top user box
fetchTopUser();
