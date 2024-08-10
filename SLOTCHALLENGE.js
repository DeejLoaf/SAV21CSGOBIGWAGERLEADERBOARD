const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://script.google.com/macros/library/d/1DsH_HyH5b8OGaHVC3VjXms-9Oq7xDPim0hlRZunAIUUDKOTRAic1m3kh/10';

async function fetchData() {
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

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

        const tbody = document.querySelector('#leaderboardTable tbody');

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${usernames[i]}</td>
                <td>${multi[i]}</td>
                <td><a href="${betIds[i]}" target="_blank">${betIds[i]}</a></td>
                <td>${(multi[i] * 0.1).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

