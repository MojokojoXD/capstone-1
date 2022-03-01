const button_div = document.querySelector('#tagline-button')
const button = button_div.querySelectorAll('*')



button_div.addEventListener('mouseover', () => {
    if(window.innerWidth > 600){
        button.forEach(element => {
            element.style.color = 'white';
            element.style.letterSpacing = '2.5px'
        })
        button[1].style.fontSize = '2.55vw'
        button_div.style.border = "3px solid #CC99CC"
        button_div.style.borderRadius = "8px"
        button_div.style.backgroundColor = '#660066'
    }
})

button_div.addEventListener('mouseout', () => {

    if (window.innerWidth > 600){
    button.forEach(element => {
        element.style.color = 'black';
        element.style.letterSpacing = '0px'
    })
    button[1].style.fontSize = '2.5vw'
    button_div.style.border = "3px solid black"
    button_div.style.backgroundColor = 'transparent'
    }
})