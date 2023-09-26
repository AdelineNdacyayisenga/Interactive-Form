
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
    for (let i = 0; i < colors.length; i++) {
        let theme = colors[i].getAttribute('data-theme');
        if(change.value === theme) {
            colors[i].hidden = false;
            colors[i].disabled = false;
            //change.selected = false;
        } else {
            colors[i].hidden = true;
            colors[i].disabled = true;
            //colors[i].selected = false;
        }
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
    document.querySelector('#activities-cost').innerHTML = `Total: $${totalCost}`;
    activitiesValidator(); //real-time validation for the activities section
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
});

/*Form Validation */

function validationPass (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
  }

function validationFail (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = "block";
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
// function emailValidator(){
//     //const emailIsValid = /^[^@]*@[^@.]+\.[a-z]+$/i.test(email.value);
//     const regex = /^(^@]*@)([^@.]+\.)([a-z]+)$/i;
//     const emailInput = email.value;
//     if($1.test(emailInput)) {
//         console.log($1);
//         console.log(emailInput);
//     }
//     // if(emailIsValid === true) {
//     //     validationPass(email);
//     // } else {
//     //     validationFail(email);
//     // }
//     // return emailIsValid;
// }

// emailValidator();

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

//real-time validation errors
nameElement.addEventListener('keyup', nameValidator);
email.addEventListener('keyup', emailValidator);
cardNumber.addEventListener('keyup', cardNumberValidator);
zip.addEventListener('keyup', zipValidator);
cvv.addEventListener('keyup', cvvValidator);

form.addEventListener('submit', (e) => {
    if(!nameValidator()){
        e.preventDefault();
    }
    if(!emailValidator()){
        e.preventDefault();
    }
    if(!activitiesValidator()){
        e.preventDefault();
    }
    if(payment[1].selected) { //requires those conditions only when credit card was the selected form of payment
        if(!cardNumberValidator()){
            e.preventDefault();
        }
        if(!zipValidator()){
            e.preventDefault();
        }
        if(!cvvValidator()){
            e.preventDefault();
        }
    }
});

//accessibility in the activities section
//add focus and blur events to easily notice which box is checked
for(let checkbox of checkboxInputs) {
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
document.querySelector('.activities').addEventListener('change', e => {
    const clicked = e.target;
    const clickedDayAndTime = clicked.getAttribute("data-day-and-time");
    
    for(let i = 0; i < checkboxInputs.length; i++) {
        const checkboxDayAndTime = checkboxInputs[i].getAttribute("data-day-and-time");
        if(checkboxDayAndTime === clickedDayAndTime && clicked != checkboxInputs[i]) {
            if(clicked.checked) {
                checkboxInputs[i].disabled = true;
                checkboxInputs[i].parentElement.classList.add('disabled');
            } else {
                checkboxInputs[i].disabled = false;
                checkboxInputs[i].parentElement.classList.remove('disabled');
            }
        }
    }
});
