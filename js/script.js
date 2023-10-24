
/**
 * @author Adeline Ndacyayisenga
 * Treehouse Full Stack JavaScript Project 3
 */

//Declare variables
const form = document.querySelector('form');
const jobRoles = document.querySelector('#title');
const nameElement = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJob = document.querySelector('.basic-info .other-job-role');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const colors = document.querySelectorAll('#color option'); //ALTERNATIVE: colors = color.children()
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

/*
Listens for changes detected as the user selects a job role
*/
jobRoles.addEventListener('change', (e) => {
    const jobChange = e.target;
    if (jobChange.value === "other") {
        otherJob.removeAttribute('type');
    } else {
        otherJob.setAttribute('type', 'hidden');
    }
});

//Disable the color <select> element until user chooses a design
    //ALTERNATIVE: color.setAttribute('disabled', true);
color.disabled = true;

/*
Listens for changes detected as the user selects a design/theme
*/
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
        } else {
            colors[i].hidden = true;
            colors[i].disabled = true;
        }
    }
});

let totalCost = 0; // Total the cost of all selected activities
/*
Listens for changes detected as the user selects activities and calculates/displays the total cost
*/
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
payment[1].selected = true; //ALTERNATIVE: can also use the .children property and the setAttribute()
paypal.hidden = true;
bitcoin.hidden = true;

/*
Listens for changes detected as the user selects a payment method
*/
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

/**
 * When the user input passes the validation check
 * @param {HTMLInputElement} element The specific element to validate
 */
function validationPass (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
  }

/**
 * When the user input fails the validation check
 * @param {HTMLInputElement} element The specific element to validate
 */
function validationFail (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = "block";
}

/**
 * Checks if the user name is valid
 * @returns boolean value; true if the name is valid and false otherwise
 */
function nameValidator(){
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);
    const label = nameElement.parentElement;
    if(nameElement.value.length === 0) {
        label.classList.add('not-valid');
        label.classList.remove('valid');
        label.lastElementChild.style.display = "block";
    } else if(nameElement.value.length > 0 && nameIsValid === false) {
        label.lastElementChild.innerHTML = label.lastElementChild.innerHTML.replace(/^Name field cannot be blank$/, "The Name must be letter characters");
        label.classList.add('not-valid');
        label.classList.remove('valid');
        label.lastElementChild.style.display = "block";
    } else {
        validationPass(nameElement);
        return nameIsValid; 
     }
}

/**
 * Checks if the user email is valid
 * @returns boolean value; true if the email is valid and false otherwise
 */
function emailValidator(){
    const emailIsValid = /^[^@]*@[^@.]+\.[a-z]+$/i.test(email.value);
    if(emailIsValid === true) {
        validationPass(email);
    } else {
        validationFail(email);
    }
    return emailIsValid;
}

/**
 * Checks if the user selected at least one activity
 * @returns boolean value; true if there is at least one activity and false otherwise
 */
function activitiesValidator(){
    const activitiesValid = totalCost > 0;
    if(activitiesValid === true) {
        validationPass(registerForActivities);
    } else {
        validationFail(registerForActivities);
    }
    return activitiesValid;
}

/**
 * Checks if card number is valid, 13 to 16 digits
 * @returns boolean value; true if the card number is valid and false otherwise
 */

function cardNumberValidator(){
    const validCardNumber = /^\d{13,16}$/.test(cardNumber.value);
    if(validCardNumber === true) {
        validationPass(cardNumber);
    } else {
        validationFail(cardNumber);
    }
    return validCardNumber;
}

/**
* Checks if zip value is valid, 5 digits
* @returns boolean value; true if the zip value is valid and false otherwise
*/
function zipValidator() {
    const validZip = /^\d{5}$/.test(zip.value);
    if(validZip === true) {
        validationPass(zip);
    } else {
        validationFail(zip);
    }
    return validZip;
}

/**
 * Checks if cvv number is valid, 3 digits
 * @returns boolean value; true if the cvv number is valid and false otherwise
 */
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

/*
Listens for form submit event and checks if all required sections are valid before submitting the form
*/
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
//Handle Conflicting activities; the conflicting activity is disabled
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
