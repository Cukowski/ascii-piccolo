// Select elements
const piccolo = document.getElementById('piccolo');
const clock = document.getElementById('clock');
const timer = document.getElementById('timer');
const timerButton = document.getElementById('timer-button');
const resetButton = document.getElementById('reset-button');

// Set initial position and speed for piccolo within the viewport
// let posX = window.innerWidth / 2;
// let posY = window.innerHeight / 2;
let posX = window.innerWidth;
let posY = window.innerHeight;
let speedX = 2 + Math.random() * 2; // Random horizontal speed
let speedY = 2 + Math.random() * 2; // Random vertical speed

// Move piccolo across the viewport and bounce on edges
function movePiccolo() {
    posX += speedX;
    posY += speedY;

    // Boundary checks for viewport
    if (posX + piccolo.offsetWidth >= window.innerWidth || posX <= 0) {
        speedX *= -1;
    }
    if (posY + piccolo.offsetHeight >= window.innerHeight || posY <= 0) {
        speedY *= -1;
    }

    // Apply new position within the viewport
    piccolo.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(movePiccolo);
}

// Function to update the clock every second
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    setTimeout(updateClock, 1000); // Update every second
}

// Timer logic
let timerActive = false;
let timerStart;
let elapsed = 0;
let timerInterval;

function toggleTimer() {
    if (timerActive) {
        // Stop the timer
        clearInterval(timerInterval);
        timerActive = false;
        timerButton.textContent = 'Start Timer';
    } else {
        // Start the timer
        timerActive = true;
        timerStart = Date.now() - elapsed; // Adjust start time based on elapsed time
        timerButton.textContent = 'Stop Timer';

        timerInterval = setInterval(() => {
            elapsed = Date.now() - timerStart;
            const milliseconds = elapsed % 1000;
            const seconds = Math.floor(elapsed / 1000) % 60;
            const minutes = Math.floor(elapsed / (1000 * 60)) % 60;
            const hours = Math.floor(elapsed / (1000 * 60 * 60));
            timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
        }, 10); // Update every 10 milliseconds for precision
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerActive = false;
    timer.textContent = '00:00:00.000';
    timerButton.textContent = 'Start Timer';
}

// Add event listeners
piccolo.addEventListener('click', () => {
    piccolo.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
});
timerButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize functions
movePiccolo();
updateClock();
