
/*
Declare variables
*/
const form = document.querySelector('form');
const jobRoles = document.querySelector('#title');
const nameElement = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJob = document.querySelector('.basic-info .other-job-role');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const colors = document.querySelectorAll('#color option'); //OR colors = color.children()
const registerForActivities = document.querySelector('#activities-box');
const payment = document.querySelector('#payment');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const creditCard = document.querySelector('#credit-card');
//const creditCardBox = document.querySelector('.credit-card-box');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const checkboxInputs = document.querySelectorAll('#activities input');

//Have the focus state by defualt to prompt the user
nameElement.focus();

//Hide the other job role input text field when the page loads. It will only show if the user choses 'other' on the dropdown menu
otherJob.setAttribute('type', 'hidden');

jobRoles.addEventListener('change', (e) => {
    const jobChange = e.target;
    if (jobChange.value === "other") {
        otherJob.removeAttribute('type');
    } else {
        otherJob.setAttribute('type', 'hidden');
    }
});

//Disable the color <select> element until user chooses a design
//color.setAttribute('disabled', true);
color.disabled = true;

design.addEventListener ('change', (e) => {
    const change = e.target;
    if(change) {
        color.disabled = false;
    }
    //look through the color dropdown menu

    for (let i = 0; i < colors.length; i++) {
        const theme = colors[i].getAttribute('data-theme');
        if(change.value === theme) {
            colors[i].hidden = false;
            //colors[i].selected = true;
            colors[i].disabled = false;
        } else {
            colors[i].hidden = true;
            //colors[i].selected = false; 
            colors[i].disabled = true;
        }
    }
    if (theme.value !== '') {
        theme.value = 'reselect';
    }
});

// Total the cost of all selected activities
let totalCost = 0;
registerForActivities.addEventListener ('change', (e) => {
    const currentOption = e.target;
    const cost = parseInt(currentOption.getAttribute('data-cost'));
    if(currentOption.checked) {
        totalCost += cost;
    } else {
        totalCost -= cost;
    }

    const dayTime = currentOption.getAttribute("data-day-and-time");
    
    const isChecked = currentOption.checked;

    for (let i = 0; i < checkboxInputs.length; i ++) {
        if (isChecked && checkboxInputs[i].getAttribute("data-day-and-time") === dayTime) {
            //checkboxInputs[i].disabled = true;
            checkboxInputs[i].parentElement.classList.add('disabled');
            currentOption.parentElement.classList.remove('disabled');
        } else {
            //checkboxInputs[i].disabled = true;
            checkboxInputs[i].parentElement.classList.remove('disabled');
            currentOption.parentElement.classList.add('disabled');
        }
    }

    document.querySelector('#activities-cost').innerHTML = `Total: $${totalCost}`;

});

//set the credit card option as default, when the page loads. The other payment methods are hidden when the page loads
payment[1].selected = true; // can also use the .children property and the setAttribute()
paypal.hidden = true;
bitcoin.hidden = true;

payment.addEventListener('change', (e) => {
    const currentOption = e.target.value;
    
    if(currentOption === 'credit-card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    }
    if(currentOption === 'paypal') {
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    }
    if(currentOption === 'bitcoin') {
        bitcoin.hidden = false;
        creditCard.hidden = true;
        paypal.hidden = true;
    }

    //Q: how to improve my code and avoid redundance
});

//Form Validation

function validationPass (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.hidden = true;
  }

function validationFail (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.hidden = false;
}

//check if name is valid
function nameValidator(){
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);
    if(nameIsValid === true) {
        validationPass(nameElement);
    } else {
        validationFail(nameElement);
    }
    return nameIsValid;
}

//check if email is valid
function emailValidator(){
    const emailIsValid = /^[^@]*@[^@.]+\.[a-z]+$/i.test(email.value);
    if(emailIsValid === true) {
        validationPass(email);
    } else {
        validationFail(email);
    }
    return emailIsValid;
}

//check if there is at least one activity
function activitiesValidator(){
    const activitiesValid = totalCost > 0;
    if(activitiesValid === true) {
        validationPass(registerForActivities);
    } else {
        validationFail(registerForActivities);
    }
    return activitiesValid;
}

//check if card number is valid 13-16 digits; no dashes or spaces
function cardNumberValidator(){
    const validCardNumber = /^\d{13,16}$/.test(cardNumber.value);
    if(validCardNumber === true) {
        validationPass(cardNumber);
    } else {
        validationFail(cardNumber);
    }
    return validCardNumber;
}

//check if the zip value is valid, 5 digits
function zipValidator() {
    const validZip = /^\d{5}$/.test(zip.value);
    if(validZip === true) {
        validationPass(zip);
    } else {
        validationFail(zip);
    }
    return validZip;
}

//check if the cvv is valid, 3 digits
function cvvValidator() {
    const validCvv = /^\d{3}$/.test(cvv.value);
    if(validCvv === true) {
        validationPass(cvv);
    } else {
        validationFail(cvv);
    }
    return validCvv;
}

//Q: Hint doesn't show for the register activities (real time)

//real-time validation errors
nameElement.addEventListener('keyup', nameValidator);
email.addEventListener('keyup', emailValidator);
registerForActivities.addEventListener('keyup', activitiesValidator);
cardNumber.addEventListener('keyup', cardNumberValidator);
zip.addEventListener('keyup', zipValidator);
cvv.addEventListener('keyup', cvvValidator);

form.addEventListener('submit', (e) => {
    if(!nameValidator()){
        e.preventDefault();
        console.log('Name field must be populated');
    }
    if(!emailValidator()){
        e.preventDefault();
        console.log('Email field must be populated');
    }
    if(!activitiesValidator()){
        e.preventDefault();
        console.log('Choose at least 1 activity');
    }
    if(!cardNumberValidator()){
        e.preventDefault();
        console.log('card number must be 13-16 digits, no dashes or spaces');
    }
    if(!zipValidator()){
        e.preventDefault();
        console.log('zip must be a 5 digits number');
    }
    if(!cvvValidator()){
        e.preventDefault();
        console.log('cvv must be a 3 digits number');
    }

});

//accessibility in the activities section
//add focus and blur events to easily notice which box is checked

for(let checkbox of checkboxInputs) {
    //console.log(checkbox);
    //console.log(checkbox.parentElement);
    checkbox.addEventListener('focus', (e) => {
        const focus = e.target.focus;
        if(focus) {
            checkbox.parentElement.classList.add('focus');
        }
    });

    checkbox.addEventListener('blur', (e) => {
        const blur = e.target.blur;
        if(blur) {
            checkbox.parentElement.classList.remove('focus');
        }
    });
}

/** EXTRA CREDIT */
//Conflicting activities

form.addEventListener('change', (e) => {
    const currentOption = e.target;

    //const dayTime = currentOption.dataset.dayAndTime;
    const dayTime = currentOption.getAttribute("data-day-and-time");
    
    const isChecked = currentOption.checked;

    for (let i = 0; i < checkboxInputs.length; i ++) {
        if (isChecked && checkboxInputs[i].getAttribute("data-day-and-time") === dayTime) {
            //checkboxInputs[i].disabled = true;
            checkboxInputs[i].parentElement.classList.add('disabled');
            currentOption.parentElement.classList.remove('disabled');
        } else {
            //checkboxInputs[i].disabled = true;
            checkboxInputs[i].parentElement.classList.remove('disabled');
            currentOption.parentElement.classList.add('disabled');
        }
    }
    
});

// for(let activity of checkboxInputs) {
//     //const dayAndTime = activity.dataset.dayAndTime;
//     console.log(dayAndTime);
//     if(currentOption.getAttribute("data-day-and-time") === dayAndTime) {
//         dayAndTime.disabled = true;
//     } else {
//         dayAndTime.disabled = false;
//     }
// }
//update the Total cost <p> element

