const loan_buttons = document.querySelectorAll('.button-style');
const personal_buttons = document.querySelector('#personal')
const info_bar = document.querySelector(".get-info-bar");
const close_info = document.querySelector('.get-info-bar > button');
const form = document.querySelector('.user-info');
const info_div = document.createElement('div')

//User input form creation
const first_name = document.createElement(`input`);
const last_name = document.createElement('input');
const email = document.createElement('input');
const zipcode = document.createElement('input');
const submit = document.createElement('input');

//labels for form
const fname_label = document.createElement('label');
const lname_label = document.createElement('label');
const email_label = document.createElement('label');
const zipcode_label = document.createElement('label');




let userInfo = {
    first_name: "",
    last_name: "",
    loan_type: "",
    email: "",
    zipcode: ""
}

function init_form(event){
    const section_div = document.createElement('div');
    event.preventDefault()

    
    //first name input element and label
    first_name.type = 'text';
    first_name.id = 'fname'
    first_name.name = 'fname';
    first_name.required = true;
    fname_label.for = "fname";
    fname_label.textContent = 'First name:';

    //last name input element and label
    last_name.type = 'text';
    last_name.id = 'lname';
    last_name.name ='lname';
    last_name.required = true;
    lname_label.for = 'lname';
    lname_label.textContent = 'Last name:'


    //Email input and label
    email.type =
    
    submit.type = 'submit';
    submit.name = 'submit';
    

    //added form onto main html elements
    form.appendChild(fname_label);
    form.appendChild(first_name);
    form.appendChild(lname_label);
    form.appendChild(last_name);
    form.appendChild(submit);
    form.appendChild(section_div);
    info_bar.appendChild(form);
    if(event.target.localName === "i" || event.target.localName ==='p'){
        userInfo.loan_type = event.target.parentElement.id;
    }
    else{
        userInfo.loan_type = event.target.id;
    }
}



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
    
    button.addEventListener('click', (event) => {
        first_name.value = '';
        button.style.backgroundColor = "#D9A23D";

        setTimeout(() => {
            button.style.backgroundColor = "transparent";
        }, 500)
        
        info_bar.style.left = "30vw";
    })
})

personal_buttons.addEventListener('click',init_form)

form.addEventListener('submit', (event) => {
    event.preventDefault()
            userInfo.first_name = first_name.value;
            userInfo.last_name = last_name.value;
            axios.post('/api/firstname',userInfo).then(res => {
                console.log(res.data);
            }).catch(err => console.log('This error is: '));
        
            form.innerHTML = '';
})

close_info.addEventListener('click', () => {

    info_bar.style.left = '-300vw'
    form.innerHTML = "";
})
