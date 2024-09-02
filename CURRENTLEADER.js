(function() {
    // Define the API URL within the IIFE to avoid conflicts
    const apiUrl = 'https://script.google.com/macros/s/AKfycbxlJ3ITJ-EIHzrBi3v9lE5rfRSV_4sxvMbCLxBlJIYr9cZG4fk2_8cl0Wasbxa7S74/exec';

    // Function to fetch data from the API and update the top user box
    async function fetchTopUser() {
        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // Log the fetched data to the console for debugging
            console.log('Fetched data:', data);

            // Extract values from the API response
            const topUser = data['A2'] || 'Unknown';
            const topMulti = data['B2'] || 'N/A';
            
            // Log the top user and top multi for debugging
            console.log('Top user:', topUser);
            console.log('Top multi:', topMulti);

            // Update the top user box with the formatted value
            document.getElementById('topUserInfo').textContent = `${topUser} - ${topMulti}`;
        } catch (error) {
            console.error('Error fetching top user data:', error);
        }
    }

    // Call the function to fetch data and update the top user box
    fetchTopUser();

})();
