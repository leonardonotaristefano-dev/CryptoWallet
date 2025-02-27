
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

// ULTIMI PRODOTTI

const games = [
    {"modello": "Nano X", "produttore": "Ledger", "prezzo": 105},
    {"modello": "Duo", "produttore": "BitBox", "prezzo": 95},
    {"modello": "Smart3", "produttore": "Ellipal", "prezzo": 80},
    {"modello": "Safe5", "produttore": "Trezor", "prezzo": 59},
    {"modello": "Pro4", "produttore": "Tangem", "prezzo": 99},
    {"modello": "Nano S", "produttore": "Ledger", "prezzo": 110},
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