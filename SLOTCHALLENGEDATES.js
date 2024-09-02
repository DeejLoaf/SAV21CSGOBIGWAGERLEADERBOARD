(function() {
    // Define the API URL within the IIFE to avoid conflicts
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzjYUSjy-IJVG30HuvizkJCjrdquTxuqRVf3eUJMP-BhppspOXKUimjLgBj1QcF4Ew/exec';

    // Function to fetch data from the API and populate the START and END boxes with countdowns
    async function fetchData() {
        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract and parse date and time for the START box
            const startDateTime = parseDateTime(data['E2'], data['F2']);
            
            // Extract and parse date and time for the END box
            const endDateTime = parseDateTime(data['E4'], data['F4']);

            // Update the countdown timers
            updateCountdown('startBox', startDateTime);
            updateCountdown('endBox', endDateTime);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to parse date and time strings into a Date object
    function parseDateTime(dateStr, timeStr) {
        // Convert date format from MM/DD to MM/DD/YYYY (assuming current year)
        const [month, day] = dateStr.split('/').map(Number);
        const currentYear = new Date().getFullYear();
        const dateFormatted = `${month}/${day}/${currentYear}`;
        
        // Convert time to 24-hour format and handle timezone
        const time24 = convertTo24HourFormat(timeStr);

        // Combine date and time into a single string
        const dateTimeStr = `${dateFormatted} ${time24}`;
        
        // Parse date-time string into a Date object (assumed to be in EST timezone)
        return new Date(dateTimeStr + ' GMT-0500'); // EST is UTC-5 hours
    }

    // Function to convert 12-hour time format to 24-hour format
    function convertTo24HourFormat(timeStr) {
        // Extract the time and period (AM/PM)
        const [time, period] = timeStr.split(/(AM|PM)/);
        let [hours, minutes] = time.trim().split(':').map(Number);
        
        // Adjust hours based on AM/PM
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes ? minutes.toString().padStart(2, '0') : '00'}`;
    }

    // Function to update the countdown in a given element
    function updateCountdown(elementId, targetTime) {
        const element = document.getElementById(elementId);
        const interval = setInterval(() => {
            const now = new Date();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(interval);
                element.innerHTML = `<div><strong>${elementId === 'startBox' ? 'START' : 'END'}</strong></div><div>Time's up!</div>`;
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.innerHTML = `
                <div><strong>${elementId === 'startBox' ? 'START' : 'END'}</strong></div>
                <div>${days}d ${hours}h ${minutes}m ${seconds}s</div>
            `;
        }, 1000);
    }

    // Call the function to fetch data and start the countdown
    fetchData();

})();
