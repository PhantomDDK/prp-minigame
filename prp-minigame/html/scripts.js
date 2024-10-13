let numbers = [];
let currentNumber = 1;
let timerInterval = null;
let difficulty = 'easy';  // Default difficulty is set to easy
let timeLimit = 8000;  // 8 seconds for easy
let circleDelay = 500;  // Delay between circles in milliseconds (now set to 500ms for faster appearance)
let gameFinished = false;  // Track whether the game has already finished

// Function to start the minigame with a specific difficulty
function startMinigame(selectedDifficulty) {
    console.log("Start minigame function called!");

    gameFinished = false;  // Reset game finish status
    // Set difficulty based on input
    setDifficulty(selectedDifficulty);

    // Show the minigame UI
    document.getElementById('minigame-container').style.display = 'flex';
    
    // Remove the line that makes the background darker
    // document.body.style.backgroundColor = "rgba(0, 0, 0, 0.7)";  // Remove or comment this line

    // Generate numbers based on difficulty
    numbers = [...Array(getMaxNumberForDifficulty()).keys()].map(i => i + 1);
    currentNumber = 1;

    // Display numbers one by one with the specified delay, at random positions
    displayNumbersWithDelay();

    // Start timer
    startTimer(timeLimit);
}


// Set difficulty and adjust time limit
function setDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    if (difficulty === 'easy') {
        timeLimit = 8000;  // 8 seconds for easy
    } else if (difficulty === 'medium') {
        timeLimit = 10000;  // 10 seconds for medium
    } else if (difficulty === 'hard') {
        timeLimit = 11000;  // 11 seconds for hard
    }
}

// Get the max number based on difficulty
function getMaxNumberForDifficulty() {
    if (difficulty === 'easy') {
        return 5;  // Numbers 1-5 for easy
    } else if (difficulty === 'medium') {
        return 8;  // Numbers 1-8 for medium
    } else if (difficulty === 'hard') {
        return 10;  // Numbers 1-10 for hard
    }
}

// Function to display numbers with a faster delay at random positions
function displayNumbersWithDelay() {
    const numbersContainer = document.getElementById('numbers-container');
    numbersContainer.innerHTML = '';  // Clear the container

    const circleSizeVW = 6;  // 60px converted to vw
    const circleSizeVH = 6;  // 60px converted to vh

    // Generate random positions for the numbers, primarily on the right side
    for (let i = 0; i < numbers.length; i++) {
        const x = Math.random() * (30 - circleSizeVW) + (60);  // X position: 60% - 90% of screen width
        const y = Math.random() * (30 - circleSizeVH) + (20);  // Y position: 30% - 70% of screen height

        // Delay the display of each number by the updated circleDelay
        setTimeout(() => {
            const numberBox = document.createElement('div');
            numberBox.classList.add('number');
            numberBox.textContent = numbers[i];  // Show numbers in order
            numberBox.style.left = x + 'vw';
            numberBox.style.top = y + 'vh';
            numberBox.onclick = handleClick;

            numbersContainer.appendChild(numberBox);
        }, i * circleDelay);  // Faster delay between each number
    }
}


// Function to handle the click event
// Function to handle the click event
function handleClick() {
    // Get the audio element for the click sound
    const clickSound = document.getElementById('clickSound');

    if (parseInt(this.textContent) === currentNumber) {
        // Play sound when clicking the correct number
        if (clickSound) {
            clickSound.play();  // Play the sound on click
        }

        currentNumber++;
        if (currentNumber > getMaxNumberForDifficulty()) {
            finishMinigame(true); // Player clicked all numbers correctly
        } else {
            this.style.visibility = 'hidden';  // Hide the clicked number
        }
    } else {
        finishMinigame(false); // Player clicked the wrong number
    }
}


// Function to start the timer
function startTimer(timeLimit) {
    const timer = document.getElementById('timer');
    let timeRemaining = timeLimit / 1000;

    timerInterval = setInterval(() => {
        timeRemaining--;
        timer.textContent = `Time Left: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishMinigame(false); // Timer ran out
        }
    }, 1000);
}

// Function to finish the minigame
function finishMinigame(success) {
    // Ensure this function only runs once
    if (gameFinished) return;  // If game is already finished, do nothing
    gameFinished = true;  // Mark the game as finished

    clearInterval(timerInterval);

    // Hide the minigame UI
    document.getElementById('minigame-container').style.display = 'none';
    document.body.style.backgroundColor = "transparent"; // Reset background color

    // Send result back to Lua
    fetch(`https://${GetParentResourceName()}/minigameResult`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success }),
    });
}

// Listen for start event from the client
window.addEventListener('message', (event) => {
    if (event.data.action === 'startMinigame') {
        startMinigame(event.data.difficulty);
    }
});
