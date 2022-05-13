const quotes = [
    {
        quote : "Lorem ipsum dolor sit amet",
        author : "James",
    },
    {
        quote : " adipisicing elit. Libero vitae sint voluptatibus",
        author : "Smith",
    },
    {
        quote : "quae nemo nihil dolores quisquam",
        author : "Eidthon",
    },
    {
        quote : "numquam accusantium quis",
        author : "Tors",
    },
    {
        quote : "fuga blanditiis repudiandae molestias",
        author : "Pokra",
    },
    {
        quote : "vitae sint voluptatibus unde",
        author : "samow",
    },   
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

let FooterWord = ()=>{
    const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.innerHTML = todayQuote.quote;0
    author.innerHTML = todayQuote.author;
}


FooterWord();