
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
                                <div class="card-custom">
                                    <div class="overflow-hidden img-card-container">
                                        <img class="img-card-custom" src="https://picsum.photos/20${i}" alt="">
                                        <i class="bi bi-suit-heart icon-card fs-4 color-a"></i>
                                    </div>
                                    <h5 class="title mt-5 fw-bold">${game.modello}</h5>
                                    <p>Prezzo: <span class="pressStart2P color-s">${game.prezzo}$</span></p>
                                    <p>Console: ${game.produttore}</p>
                                    <div class="d-flex justify-content-center">
                                        <button class="btn-card mb-5">Compra</button>
                                    </div>
                                </div>
                                `
            cardsWrapper.appendChild(div)
        })
    }
    
    createCards(data)
    
    // CREAZIONE PULSANTI FILTRO PER CATEGORIA
    let btnsCategory = document.querySelector("#btnsCategory")
    
    let dataCategories = data.map( (game)=> game.produttore )
    let uniqueCategories = Array.from( new Set(dataCategories) )
    uniqueCategories.sort().forEach( (category)=>{
        let div = document.createElement("div")
        div.classList.add("form-check")
        div.innerHTML  = `
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                        <label class="form-check-label color-a" for="${category}">
                        ${category}
                        </label>
                        `
        btnsCategory.appendChild(div)
    } )
    
    
    // FILTRO PER CATEGORIA 
    let radioBTNS = document.querySelectorAll(".form-check-input")
    
    function filterByCategory(array){
        let nodeToArray = Array.from( radioBTNS )
        let radioChecked = nodeToArray.find( (radioBtn)=> radioBtn.checked == true )
        if(radioChecked.id == "All"){
            return array
        } else {
            let filtered = array.filter( (game)=> game.produttore == radioChecked.id  )
            return filtered
        }
    }
    
    radioBTNS.forEach( (radioBtn)=>{
        radioBtn.addEventListener( "input", ()=>{
            globalFilter()
        } )
    } )
    
    
    // RANGE RANGEBAR 
    let inputPrice = document.querySelector("#inputPrice")
    let labelPrice = document.querySelector("#labelPrice")
    
    let prices = data.map( (game)=> game.prezzo )
    let max = Math.max(...prices)
    let min = Math.min(...prices)
    inputPrice.max = max
    inputPrice.min = min
    inputPrice.value = max
    labelPrice.innerText = `${max}$`
    
    
    
    // FILTRO PER PREZZO 
    function filterByPrice(array){
        let filtered = array.sort((a, b)=> b.prezzo - a.prezzo).filter( (game)=> game.prezzo <= inputPrice.value )
        return filtered
    }
    
    inputPrice.addEventListener( "input", ()=>{
        labelPrice.innerText = `${inputPrice.value}$`
        globalFilter()
    } )
    
    
    // FILTRO PER PAROLA
    let inputWord = document.querySelector("#inputWord")
    
    function filterByWord(array){
        let filtered = array.filter( (game)=> game.modello.toLowerCase().includes(inputWord.value.toLowerCase()) )
        return filtered
    }
    
    inputWord.addEventListener("input", ()=>{
        globalFilter()
    })
    
    function globalFilter(){
        let filteredForCategory = filterByCategory(data)
        let filteredForPrice = filterByPrice(filteredForCategory)
        let filteredForWord = filterByWord(filteredForPrice)
        createCards(filteredForWord)
    }
    
    
    // FINE FETCH 
})