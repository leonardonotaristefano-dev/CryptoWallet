let navbar = document.querySelector(".navbar")
let homeLink = document.querySelector("#homeLink")


window.addEventListener("scroll", ()=>{
    console.log( window.scrollY )
    
    if(window.scrollY > 0 ){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
    
})

// SEZIONE NUMERI

let gamesNum = document.querySelector("#gamesNum")
let usersNum = document.querySelector("#usersNum")
let reviewsNum = document.querySelector("#reviewsNum")




function createInterval(finalNumber, elemento, speed){
    let counter = 0
    
    let interval = setInterval( ()=>{
        
        if(counter < finalNumber){
            counter++
            elemento.innerText = counter
        } else {
            clearInterval(interval)
        }
    }, speed )
}


// INTERSECTION OBSERVER

let isStarted = false

const observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isStarted == false){
            createInterval(1000, gamesNum, 6)
            createInterval(500, usersNum, 12)
            createInterval(200, reviewsNum, 30)
            isStarted = true
        }
    } )
});

let numTest = document.querySelector("#numTest")
observer.observe(gamesNum)


// ULTIMI PRODOTTI

const games = [
    {"modello": "Nano X", "produttore": "Ledger", "prezzo": 105},
    {"modello": "Duo", "produttore": "BitBox", "prezzo": 95},
    {"modello": "Smart3", "produttore": "Ellipal", "prezzo": 80},
    {"modello": "Safe5", "produttore": "Trezor", "prezzo": 59},
    {"modello": "Pro4", "produttore": "Tangem", "prezzo": 99},
    {"modello": "Nano S", "produttore": "Ledger", "prezzo": 110}
]

let cardsWrapper = document.querySelector("#cardsWrapper")

games.forEach( (game, i)=> {
    if( i >= games.length - 3){
        let div = document.createElement("div")
        div.classList.add("col-12", "col-md-4", "col-lg-3", "mx-lg-1", "my-1")
        div.innerHTML = `
                        <div class="card-custom text-center">
                            <img class="img-card-custom" src="https://picsum.photos/20${i}" alt="">
                            <h5 class="title mt-5 fw-bold color-s">${game.modello}</h5>
                            <p class="color-a">Prezzo: <span class="pressStart2P color-s">${game.prezzo}$</span></p>
                            <p class="color-a">Produttore: ${game.produttore}</p>
                            <div class="d-flex justify-content-center">
                                <button class="btn-card">ACQUISTA</button>
                            </div>
                        </div>
                        `
        cardsWrapper.appendChild(div)
    }
})

// SWIPER 

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});