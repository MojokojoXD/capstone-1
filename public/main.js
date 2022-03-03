const loan_buttons = document.querySelectorAll('.button-style')
// const button = button_div.querySelectorAll('*')


loan_buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        if(window.innerWidth > 600){
                button.style.backgroundColor = "#FC9D05";
                button.style.letterSpacing = '2.5px';
                button.style.width = 'calc(65px + 9vw)';
            }
        })
    button.addEventListener('mouseout', () => {
        if(window.innerWidth > 600){
                button.style.backgroundColor = "transparent";
                button.style.letterSpacing = '0px';
                button.style.width = 'calc(65px + 8vw)'
            }
        })
    })


// button_div.addEventListener('mouseout', () => {

//     if (window.innerWidth > 600){
//     button.forEach(element => {
//         element.style.color = 'black';
//         element.style.letterSpacing = '0px';
//     })
//     button[1].style.fontSize = '2.5vw';
//     button_div.style.backgroundColor = 'transparent';
//     button_div.style.boxShadow = '2.5px -2.5px 2.5px #c8c8c8';
//     button_div.style.width = '8vw';
// }
// })

// button_div.addEventListener('click', () => {
//     location.href = './main.html';
// })