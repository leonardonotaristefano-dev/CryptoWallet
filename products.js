

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

// FETCH


fetch("./wallet.json").then( (response)=>  response.json() ).then( (data)=> {
    console.log(data)


    let cardsWrapper = document.querySelector("#cardsWrapper")
    
    function createCards(array){
        cardsWrapper.innerHTML = ""
        array.forEach( (game, i)=> {
                let div = document.createElement("div")
                div.classList.add("col-12", "col-md-4", "col-lg-3", "my-3")
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
        )
    }

    createCards(data)


    // CREAZIONE PULSANTI FILTRO PER CATEGORIA

    let btnsCategory = document.querySelector("#btnsCategory")

    let dataCategories = data.map( (game)=> game.produttore )
    let uniqueCategories = Array.from( new Set(dataCategories) )

    uniqueCategories.forEach( (category)=>{
        let div = document.createElement("div")
        div.classList.add("form-check")
        div.innerHTML  = `
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                        <label class="form-check-label" for="${category}">
                        ${category}
                        </label>
                        `
        btnsCategory.appendChild(div)
    } )

    // FILTRO PER CATEGORIA 

    let radioBTNS = document.querySelectorAll(".form-check-input")
    
    function filterByCategory(){
        let nodeToArray = Array.from( radioBTNS )
        let radioChecked = nodeToArray.find( (radioBtn)=> radioBtn.checked == true )
        if(radioChecked.id == "All"){
            createCards(data)
        } else {
            let filtered = data.filter( (game)=> game.produttore == radioChecked.id  )
            createCards(filtered)
        }
    }
    
    radioBTNS.forEach( (radioBtn)=>{
        radioBtn.addEventListener( "input", ()=>{
            filterByCategory()
        } )
    } )


    // CREAZIONE RANGEBAR FILTRO PER PREZZO

    let inputPrice = document.querySelector("#inputPrice")
    let labelPrice = document.querySelector("#labelPrice")

    let prices = data.map( (game)=> game.prezzo )
    let max = Math.max(...prices)
    let min = Math.min(...prices)
    inputPrice.max = max
    inputPrice.min = min
    inputPrice.value = max
    labelPrice.innerText = `${max}$`

    console.log(max, min)


    // FILTRO PER PREZZO

    function filterByPrice(){
        let filtered = data.filter( (game)=> game.prezzo <= inputPrice.value )
        createCards(filtered)
    }

    inputPrice.addEventListener( "input", ()=>{
        labelPrice.innerText = `${inputPrice.value}$`
        filterByPrice()
    } )


    // FILTRO PER PAROLA

    let inputWord = document.querySelector("#inputWord")

    function filterByWord(){
        let filtered = data.filter( (game)=> game.modello.toLowerCase().includes(inputWord.value.toLowerCase()) )
        createCards(filtered)
    }

    inputWord.addEventListener("input", ()=>{
        console.log(inputWord.value)
        filterByWord()
    })

    



   // FINE FETCH 
})