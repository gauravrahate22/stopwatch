/* script.js */
let startStopButton = document.getElementById("startStop");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let display = document.getElementById("display");
let lapsContainer = document.getElementById("laps");

let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

startStopButton.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(intervalId);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
        startStopButton.textContent = "Pause";
    }
    isRunning = !isRunning;
});

resetButton.addEventListener("click", function() {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    isRunning = false;
    lapsContainer.innerHTML = "";
});

lapButton.addEventListener("click", function() {
    if (isRunning) {
        let lapTime = document.createElement("div");
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}
