// Define the API URL
const apiUrl = 'https://script.google.com/macros/s/AKfycbxlJ3ITJ-EIHzrBi3v9lE5rfRSV_4sxvMbCLxBlJIYr9cZG4fk2_8cl0Wasbxa7S74/exec';

// Function to fetch data from the API and populate the START and END boxes
async function fetchData() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract E2 and F2 values for the START box
        const e2Value = data['E2'];
        const f2Value = data['F2'];

        // Extract E4 and F4 values for the END box
        const e4Value = data['E4'];
        const f4Value = data['F4'];

        // Populate the START box with START label, E2, and F2 values
        document.getElementById('startBox').innerHTML = `
            <div><strong>START</strong></div>
            <div>${e2Value}</div>
            <div>${f2Value}</div>
        `;

        // Populate the END box with END label, E4, and F4 values
        document.getElementById('endBox').innerHTML = `
            <div><strong>END</strong></div>
            <div>${e4Value}</div>
            <div>${f4Value}</div>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data and populate the boxes
fetchData();
