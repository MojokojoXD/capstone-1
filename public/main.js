const loan_buttons = document.querySelectorAll('.button-style');
const personal_buttons = document.querySelector('#personal')
const info_bar = document.querySelector(".get-info-bar");
const close_info = document.querySelector('.get-info-bar > button');
const form = document.querySelector('.user-info');
const info_div = document.querySelector('.get-info-bar > div')

//User input form creation
const first_name = document.createElement(`input`);
const last_name = document.createElement('input');
const email = document.createElement('input');
const zipcode = document.createElement('input');
const submit = document.createElement('input');
const br = document.createElement('br');
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
    zipcode: 00000
}

function init_form(event){
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
    email.type = 'email';
    email.id = 'email';
    email.name = 'email';
    email.required = true;
    email_label.for = 'email';
    email_label.textContent = "Email:"

    //Zipcode input and label
    zipcode.type = 'number';
    zipcode.id = 'zipcode';
    zipcode.name = 'zipcode';
    zipcode.min = 501;
    zipcode.max = 99950;
    zipcode.required = true;
    zipcode_label.for = 'zipcode';
    zipcode_label.textContent ="Zipcode: "


    submit.type = 'submit';
    submit.name = 'submit';
    submit.id = 'submit'
    

    //added form onto main html elements
    form.appendChild(fname_label);
    form.appendChild(first_name);
    form.appendChild(lname_label);
    form.appendChild(last_name);
    form.appendChild(email_label)
    form.appendChild(email);
    form.appendChild(zipcode_label);
    form.appendChild(zipcode);
    form.appendChild(br);
    form.appendChild(submit);
    info_div.appendChild(form);
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
        if(window.innerWidth > 600)
        {
            info_bar.style.left = "40vw";
        }
        else{
            info_bar.style.left = "0vw";
            info_bar.style.height = "100vh";
            info_bar.style.top = '10vh'
        }
        
    })
})

personal_buttons.addEventListener('click',init_form)

form.addEventListener('submit', (event) => {
    event.preventDefault()
            userInfo.first_name = first_name.value;
            userInfo.last_name = last_name.value;
            userInfo.email = email.value;
            userInfo.zipcode = zipcode.value;
            try{
                if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode.value)){
                    axios.post('/api/firstname',userInfo).then(res => {
                        console.log(res.data);
                        }).catch(err => console.log('This error is: '));
                }
                else{
                    throw "Zipcode incorrect"
                }
             }catch(error){
                    alert (console.log(error));
             }
           
            email.value = '';
            last_name.value = '';
            zipcode.value = '';
            form.innerHTML = '';
            info_bar.style.left = '-300vw'
})

close_info.addEventListener('click', () => {

    info_bar.style.left = '-300vw'
    form.innerHTML = "";
})
