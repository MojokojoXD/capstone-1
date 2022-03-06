const loan_buttons = document.querySelectorAll('.button-style');
// const personal_buttons = document.querySelector('#personal')
//test
const personal_buttons1 = document.querySelectorAll('.buttons > button')
const bank_bar = document.querySelector('#bank-info');
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
const phone_number = document.createElement('input');

//labels for form
const fname_label = document.createElement('label');
const lname_label = document.createElement('label');
const email_label = document.createElement('label');
const zipcode_label = document.createElement('label');
const phone_label = document.createElement('label');




let userInfo = {
    first_name: "",
    last_name: "",
    loan_type: "",
    email: "",
    phone_number: '',
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

    //Phone number and label
    phone_number.type = 'tel';
    phone_number.id = 'phone';
    phone_number.name = 'phone';
    phone_number.placeholder = '123-456-7890';
    phone_number.pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
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

// personal_buttons.addEventListener('click',init_form)

personal_buttons1.forEach(button => {
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
                    axios.post('/api/testEndpoint',userInfo).then(res => {
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
            form.innerHTML = '';
            info_bar.style.left = '-300vw'
})


function bankCards(bankObj){
    bank_bar.style.left = '0';
    bankObj.forEach(bank => {
        ///Bank card info creation
        const banks_div = document.createElement('div');
        const img_div = document.createElement('div');
        const bank_name = document.createElement('h3');
        const rep_name = document.createElement('p');
        const ranking = document.createElement('p');
        const rep_phone = document.createElement('p');
        const bank_img = document.createElement('img')

        //info addition
        bank_name.textContent = `${bank.bank_name}`;
        rep_name.textContent = `Representative: ${bank.rep_name}`;
        ranking.textContent =  `Ranking: ${bank.ranking}`;
        rep_phone.textContent = `Phone Number: ${bank.rep_num}`;
        bank_img.src = `${bank.img_url}`;
        bank_img.alt = 'Bank Image';
        bank_img.className = 'bank-image'

        //Add card to main page

        banks_div.appendChild(bank_name);
        banks_div.appendChild(rep_name);
        banks_div.appendChild(ranking);
        banks_div.appendChild(rep_phone);
        img_div.appendChild(bank_img);
        banks_div.appendChild(img_div);
        bank_bar.appendChild(banks_div);
    })
}

close_info.addEventListener('click', () => {

    info_bar.style.left = '-300vw'
    form.innerHTML = "";
})
