const images = ["bg01.jpg", "bg02.jpg", "bg03.jpg", "bg04.jpg"];

const chosenImg = images[Math.floor(Math.random()*images.length)];
const bgImg = document.createElement("img");
bgImg.id = 'bg';
bgImg.src = `img/${chosenImg}`;

//append 맨 뒤에 추가


document.body.appendChild(bgImg);

