const button_div = document.querySelector('#tagline-button')
const button = button_div.querySelectorAll('*')



button_div.addEventListener('mouseover', () => {
    if(window.innerWidth > 600){
        button.forEach(element => {
            element.style.color = 'white';
            element.style.letterSpacing = '4px'
        })
        button[1].style.fontSize = '2.55vw';
        button_div.style.borderRadius = "8px";
        button_div.style.width = '10.5vw';
        button_div.style.backgroundColor = '#660066'
    }
})

button_div.addEventListener('mouseout', () => {

    if (window.innerWidth > 600){
    button.forEach(element => {
        element.style.color = 'black';
        element.style.letterSpacing = '0px';
    })
    button[1].style.fontSize = '2.5vw';
    button_div.style.backgroundColor = 'transparent';
    button_div.style.boxShadow = '2.5px -2.5px 2.5px #c8c8c8';
    button_div.style.width = '8vw';
}
})

button_div.addEventListener('click', () => {
    location.href = './main.html';
})