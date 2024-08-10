// Define the API URL and proxy
const apiUrl = 'https://script.google.com/macros/library/d/1DsH_HyH5b8OGaHVC3VjXms-9Oq7xDPim0hlRZunAIUUDKOTRAic1m3kh/10';
const proxyUrl = 'https://api.allorigins.win/get?url=';

async function fetchData() {
    try {
        // Fetch the data using the All Origins proxy
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const data = await response.json();

        // Parse the JSON data returned by All Origins
        const parsedData = JSON.parse(data.contents);

        // Extract relevant data
        const usernames = [
            parsedData['A2'], parsedData['A3'], parsedData['A4'], parsedData['A5'], parsedData['A6'],
            parsedData['A7'], parsedData['A8'], parsedData['A9'], parsedData['A10'], parsedData['A11']
        ];
        const multi = [
            parsedData['B2'], parsedData['B3'], parsedData['B4'], parsedData['B5'], parsedData['B6'],
            parsedData['B7'], parsedData['B8'], parsedData['B9'], parsedData['B10'], parsedData['B11']
        ];
        const betIds = [
            parsedData['C2'], parsedData['C3'], parsedData['C4'], parsedData['C5'], parsedData['C6'],
            parsedData['C7'], parsedData['C8'], parsedData['C9'], parsedData['C10'], parsedData['C11']
        ];

        // Populate the table with the fetched data
        const tbody = document.querySelector('#leaderboardTable tbody');

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${usernames[i]}</td>
                <td>${multi[i]}</td>
                <td><button onclick="window.open('${betIds[i]}', '_blank')">View Bet</button></td>
                <td>${(multi[i] * 0.1).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
