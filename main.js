
let navbar = document.querySelector(".navbar")
let homeLink = document.querySelector("#homeLink")


window.addEventListener("scroll", ()=>{
    console.log( window.scrollY )
    // homeLink.style.transform = `rotateZ(${window.scrollY / 2}deg)`

    if(window.scrollY > 0 ){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }


})