// Select elements
const piccolo = document.getElementById('piccolo');
const flute_player = document.getElementById('flute-player');
const clock = document.getElementById('clock');
const timer = document.getElementById('timer');
const timerButton = document.getElementById('timer-button');
const resetButton = document.getElementById('reset-button');

// Define constants for margin space from the edges
const edgeMargin = 10; // Adjust this value to increase or decrease the margin

// Initial position and speed for the piccolo
let posX, posY;
// let speedX = 1 + Math.random() * 2; // Random horizontal speed
// let speedY = 1 + Math.random() * 2; // Random vertical speed

// Set speeds based on device type
function setPiccoloSpeed() {
    if (window.innerWidth <= 600) {
        // Slower speed for mobile devices
        speedX = 1 + Math.random(); // 1 to 2 units per frame
        speedY = 1 + Math.random();
    } else {
        // Faster speed for larger screens
        speedX = 2 + Math.random() * 2; // 2 to 4 units per frame
        speedY = 2 + Math.random() * 2;
    }
}

// Call the function initially to set the speed based on the current device
setPiccoloSpeed();

// Adjust speed if the screen is resized (optional)
window.addEventListener('resize', setPiccoloSpeed);

// Function to center piccolo initially
function centerPiccolo() {
    // Calculate piccolo dimensions after rendering
    const piccoloWidth = piccolo.offsetWidth;
    const piccoloHeight = piccolo.offsetHeight;

    // Center position with margin
    posX = (window.innerWidth - piccoloWidth) / 2;
    posY = (window.innerHeight - piccoloHeight) / 2;

    piccolo.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Move piccolo across the viewport with boundary checks and margin
function movePiccolo() {
    posX += speedX;
    posY += speedY;

    // Check boundaries with margin
    if (posX + piccolo.offsetWidth + edgeMargin >= window.innerWidth || posX <= edgeMargin) {
        speedX *= -1; // Reverse horizontal direction
    }
    if (posY + piccolo.offsetHeight + edgeMargin >= window.innerHeight || posY <= edgeMargin) {
        speedY *= -1; // Reverse vertical direction
    }

    // Apply new position
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

// Change color every 3.5 seconds
setInterval(() => {
    piccolo.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}, 3500);

// Add event listeners
piccolo.addEventListener('click', () => {
    piccolo.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
});
flute_player.addEventListener('click', () => {
    flute_player.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
});
timerButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize functions
centerPiccolo(); // Center piccolo initially
movePiccolo();   // Start piccolo movement
updateClock();   // Start clock
