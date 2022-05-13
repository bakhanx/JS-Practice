const clock = document.querySelector("h2#clock");


// padStrat(나타낼길이,채울문자)
let GetClock = ()=>{
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');
    clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// Time Awake
GetClock();
setInterval(GetClock, 1000);