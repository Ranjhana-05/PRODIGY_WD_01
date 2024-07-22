let timer; 
let running = false; 
let startTime; 
let laps = []; 

function startPause() {
    if (!running) {
        startTimer();
        document.getElementById("startBtn").textContent = "Pause";
        document.getElementById("lapBtn").disabled = false;
        document.getElementById("resetBtn").disabled = false;
    } else {
        pauseTimer();
        document.getElementById("startBtn").textContent = "Resume";
        document.getElementById("lapBtn").disabled = true;
    }
    running = !running;
}

function startTimer() {
    if (!running) {
        startTime = Date.now();
    }
    timer = setInterval(updateDisplay, 10);
}

function pauseTimer() {
    clearInterval(timer);
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        laps.push({ time: lapTime });
        displayLaps();
    }
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startBtn").textContent = "Start";
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = padTime(date.getMinutes());
    const seconds = padTime(date.getSeconds());
    const milliseconds = padTime(Math.floor(date.getMilliseconds() / 10));
    return `${minutes}:${seconds}:${milliseconds}`;
}

function padTime(val) {
    return val < 10 ? `0${val}` : val;
}

function displayLaps() {
    const lapList = document.getElementById("laps");
    lapList.innerHTML = ""; 
    const reversedLaps = laps.slice().reverse();
    const totalLaps = reversedLaps.length;

    reversedLaps.forEach((lap, index) => {
        const lapTime = formatTime(lap.time);
        const lapBox = document.createElement("div");
        lapBox.classList.add("lap-box"); 

        const lapNumber = document.createElement("div");
        lapNumber.classList.add("lap-number");

        lapNumber.textContent = `${totalLaps - index}`; 

        const lapTimeText = document.createElement("div");
        lapTimeText.classList.add("lap-time");
        lapTimeText.textContent = lapTime;

        lapBox.appendChild(lapNumber);
        lapBox.appendChild(lapTimeText);
        lapList.appendChild(lapBox);
    });
}

