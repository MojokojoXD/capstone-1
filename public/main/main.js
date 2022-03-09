const loan_buttons = document.querySelectorAll('.button-style');
const loan_options = document.querySelectorAll('.buttons > button')
const bank_bar = document.querySelector('#bank-info');
const info_bar = document.querySelector(".get-info-bar");
const close_info = document.querySelector('.get-info-bar > button');
const form = document.querySelector('.user-info');
const info_div = document.querySelector('#form');



//User input form creation
const first_name = document.createElement(`input`);
const last_name = document.createElement('input');
const email = document.createElement('input');
const zipcode = document.createElement('input');
const submit = document.createElement('input');
const br = document.createElement('br');
const phone_number = document.createElement('input');

//labels for form
const fname_label = document.createElement('label');
const lname_label = document.createElement('label');
const email_label = document.createElement('label');
const zipcode_label = document.createElement('label');
const phone_label = document.createElement('label');



//Body to be sent to server
let userInfo = {
    first_name: "",
    last_name: "",
    loan_type: "",
    email: "",
    phone_number: '',
    zipcode: 00000
}

//blur everything except-----------Parameter(boolean, element to leave out)
const blur = (toggle,element_except) => {
    let blur_elements = document.querySelectorAll(`${element_except}`)
    if(toggle){
        for(let i = 0; i < blur_elements.length; i++){
             blur_elements[i].style.filter = 'blur(5px)'
        }
    }
    else{
        for(let i = 0; i < blur_elements.length; i++){
            blur_elements[i].style.filter = 'blur(0px)'
       }
    }
}


// Initialize each loan option with the necessary form.(A this stage in the project each form in not unique)
function init_form(event){
    event.preventDefault()
    blur(true,'body > *:not(.get-info-bar)');
    document.body.style.overflowY = 'hidden';
    info_div.style.display = 'none';
    document.querySelector('.begin-button').addEventListener('click', () => {
       document.querySelector('#instructions').style.display = 'none';
       info_div.style.display = 'block';
    })
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

    //Phone number and label
    phone_number.type = 'tel';
    phone_number.id = 'phone';
    phone_number.name = 'phone';
    phone_number.placeholder = '1234567890';
    phone_number.pattern = '[0-9]{3}[0-9]{3}[0-9]{4}';
    phone_number.required = true;
    phone_label.for = 'phone';
    phone_label.textContent = "Phone number:"


    //Zipcode input and label
    zipcode.type = 'number';
    zipcode.id = 'zipcode';
    zipcode.name = 'zipcode';
    zipcode.min = 501;
    zipcode.max = 99950;
    zipcode.required = true;
    zipcode_label.for = 'zipcode';
    zipcode_label.textContent ="Zipcode: ";

    //Submit input and label
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
    form.appendChild(phone_label);
    form.appendChild(phone_number);
    form.appendChild(zipcode_label);
    form.appendChild(zipcode);
    form.appendChild(br);
    form.appendChild(submit);
    info_div.appendChild(form);
    
    //Send div id irrespective of click location in button div
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
            info_bar.style.left = "36vw";
        }
        else{
            info_bar.style.left = "0px";
        }
})

})


// Initiaize form on click on loan type

loan_options.forEach(button => {
    button.addEventListener('click',init_form);
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
            
            userInfo.first_name = first_name.value;
            userInfo.last_name = last_name.value;
            userInfo.email = email.value;
            userInfo.zipcode = zipcode.value;
            userInfo.phone_number = phone_number.value;
            try{
                if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode.value)){
                    axios.post('/api/client',userInfo).then(res => {

                        blur();
                        bankCards(res.data);
                        }).catch(err => console.log('This error is:', err));
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
            phone_number.value = '';
            form.innerHTML = '';
            info_bar.style.left = '-300vw'
})

function bank_checkbox(event){

    if(event.target.checked){
        axios.put(`/api/client_rep/${userInfo.email}`,{bank_name: event.target.value}).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));
    }
    else{
        axios.delete(`/api/bank_trace?bank=${event.target.value}&email=${userInfo.email}`).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));
    }
}
function bankCards(bankObj){
    bank_bar.style.left = '0';
    blur(false,'body > *')
    blur(true,'body > *:not(#bank-info)')
    document.body.style.overflowY = 'hidden'
    bankObj.forEach(bank => {
        ///Bank card info creation
        const banks_div = document.createElement('div');
        const img_div = document.createElement('div');
        const bank_name = document.createElement('h3');
        const rep_name = document.createElement('p');
        const ranking = document.createElement('p');
        const rep_phone = document.createElement('p');
        const bank_img = document.createElement('img');
        const card_close = document.createElement('button');
        const check_box = document.createElement('input');
        const checkbox_label = document.createElement('label');

        //info addition
        bank_name.textContent = `${bank.bank_name}`;
        rep_name.textContent = `Representative: ${bank.rep_name}`;
        ranking.textContent =  `Ranking: ${bank.ranking}`;
        rep_phone.textContent = `Phone Number: ${bank.rep_num}`;
        bank_img.src = `${bank.img_url}`;
        bank_img.alt = 'Bank Image';
        bank_img.className = 'bank-image';
        card_close.innerHTML = '&times;';
        card_close.className = 'card-close';

        //Checkbox configuration
        check_box.type = 'checkbox';
        check_box.id = 'bank-select';
        check_box.name = 'bank-select';
        check_box.value = `${bank.bank_name}`;
        checkbox_label.for = 'bank-select';
        checkbox_label.textContent = 'Select';

        //Add card to main page
        banks_div.appendChild(card_close);
        banks_div.appendChild(bank_name);
        banks_div.appendChild(rep_name);
        banks_div.appendChild(ranking);
        banks_div.appendChild(rep_phone);
        img_div.appendChild(bank_img);
        img_div.appendChild(checkbox_label);
        img_div.appendChild(check_box);
        banks_div.appendChild(img_div);
        bank_bar.appendChild(banks_div);
    })
    
    document.querySelectorAll('.card-close').forEach(close => {
        close.addEventListener('click', (event) => {
            document.querySelector('#bank-info').removeChild(event.target.parentNode)
            if(document.querySelectorAll('#bank-info > div').length === 0){
                document.querySelector('#bank-info').style.left = '-10000px'
                blur(false,'body > *');
                document.body.style.overflowY = 'scroll';
                document.querySelector('#instructions').style.display = 'flex'
            }
            
        })
    })

    document.querySelectorAll('#bank-select').forEach(checkbox => {
       checkbox.addEventListener('click', bank_checkbox)
    })
}

close_info.addEventListener('click', () => {
    blur(false,'body > *:not(.get-info-bar)');
    document.body.style.overflowY = 'scroll';
    info_bar.style.left = '-300vw'
    form.innerHTML = "";
    phone_number.value = '';
    document.querySelector('#instructions').style.display = 'flex'
})


document.addEventListener('backbutton', () => {
    blur(false,'body > *:not(.get-info-bar)');
    document.body.style.overflowY = 'scroll';
    info_bar.style.left = '-300vw'
    form.innerHTML = "";
    phone_number.value = '';
    document.querySelector('#instructions').style.display = 'flex'
})

