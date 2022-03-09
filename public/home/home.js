const button_div = document.querySelector('#tagline-button')
const button = button_div.querySelectorAll('*')



button_div.addEventListener('mouseover', () => {
    if(window.innerWidth > 600){
        button.forEach(element => { 
            element.style.letterSpacing = '4px'
        })
        button[1].style.fontSize = '2.55vw';
        button_div.style.borderRadius = "8px";
        button_div.style.width = '10.5vw';
        button_div.style.backgroundColor = '#FC9D05'
    }
})

button_div.addEventListener('mouseout', () => {

    if (window.innerWidth > 600){
    button.forEach(element => {
        element.style.letterSpacing = '0px';
    })
    button[1].style.fontSize = '2.5vw';
    button_div.style.backgroundColor = 'transparent';
    button_div.style.boxShadow = '2.5px -2.5px 2.5px #c8c8c8';
    button_div.style.width = '8vw';
}
})

button_div.addEventListener('click', () => {
    button_div.style.backgroundColor = '#D9A23D'

    setTimeout(() => {
        location.href = 'main.html';
    }, 400);
    
})

document.querySelector('.contact-us').addEventListener('click', () => {
    location.href = '#contacts'
    document.querySelector('#contacts').style.color = 'black';
    document.querySelector('#contacts').style.borderRadius = '5px';
    document.querySelector('#contacts').style.backgroundColor = '#FC9D05';

    setTimeout(() => {
        document.querySelector('#contacts').style.color = 'white';
        document.querySelector('#contacts').style.backgroundColor = 'black';
    }, 200)
})