// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 4 * 3600; // 4 hours in seconds

    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        // Update display
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Decrease time
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 4 * 3600; // Reset to 4 hours
        }
    }

    // Start countdown immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000); 
});