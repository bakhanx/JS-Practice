const Calculator = {
    Plus: (a, b) => {
        console.log(a + b);
    },
    Minus: (a, b) => {
        console.log(a - b);
    },
    MultiPly: (a, b) => {
        console.log(a * b);
    },
}

Calculator.Plus(3, 4);
const title = document.getElementById('title');
console.dir(title);
const title2 = document.querySelector('.hello #title')
// title2.innerText = "fuck";
const title3 = document.querySelectorAll('.hello #title')




// Function ================

let handleClick = () => {
    const clickedClass = "clicked";
    // title2.style.color = "red";
    title2.classList.toggle(clickedClass); // 클래스 on-off
}
let handleMouseEnter = () => {
    title2.innerHTML = "Mouse Enter";
}
let handleMouseLeave = () =>{
    title2.innerHTML = "Mouse Leave";
}

let handleWindowResize = ()=>{
    document.body.style.backgroundColor = "tomato";
}
let handleWindowCopy = ()=>{
    alert("copier!");
}
let handleWindowOffline = ()=>{
    alert("no Wifi!");
}
let handleWindowOnline = ()=>{
    alert("on Wifi!");
}


title2.addEventListener("click", handleClick);
title2.addEventListener("mouseenter", handleMouseEnter);
title2.addEventListener("mouseleave", handleMouseLeave);

window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);

let username = "mark";
let fullname = `hello ${username}`;
localStorage.setItem('username', username);

// handleTitleClick();

// title.innerText = "fuck"