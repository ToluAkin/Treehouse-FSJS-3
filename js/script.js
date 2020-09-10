//PROJECT IS BUILT FOR EXCEEDS EXPECTATION GRADING
//Job role section
const otherJobTitle = document.querySelector('#other-title');
const userTitle = document.querySelector('#title');
const name = document.querySelector('#name');
const mail = document.querySelector('#mail');
//Set focus on the first text field
name.placeholder = "John Doe";
name.focus();
//Hiding the other Job Title on page load
otherJobTitle.classList.add('is-hidden');
//Hiding and showing the job title
userTitle.addEventListener('change', () => {
    userTitle.value === 'other' ?
        otherJobTitle.classList.remove('is-hidden') :
        otherJobTitle.classList.add('is-hidden');
})

//T-shirt section
const theme = document.querySelector('#design');
const colors = document.querySelector('#color');
const colorsDiv = document.querySelector('#colors-js-puns');
//Creating a default option
const colorText = document.createElement('option');
colorText.text = 'Please select a T-shirt theme';
colors.appendChild(colorText);
//selecting default section and hiding colors Div
colorText.selected = true;
colorsDiv.classList.add('is-hidden');
//Hiding all colors 
let options = colors.options;
for (let option in options) {
    option.hidden = true
}
//updating the colors based on design
theme.addEventListener('change', () => {
    theme.options[0].disabled = true
    colorsDiv.classList.remove('is-hidden');
    colorText.selected = false;
    for (let i = 0; i < colors.length; i++) {
        if (theme.value === 'js puns') {
            if (i < 3) {
                options[0].selected = true;
                options[i].hidden = false;
            } else {
                options[i].hidden = true;
            }
        } else {
            options[3].selected = true;
            if (i >= 3) {
                options[i].hidden = false;
                options[6].hidden = true;
            } else {
                options[i].hidden = true;
            }
        }
    }
});

// Register for activities section
const activitiesSection = document.querySelector('.activities');
const allActivities = document.querySelectorAll('input[type=checkbox]');

//creating input field for the total cost of activity
const activitiesTotal = document.createElement('input');
activitiesTotal.disabled = true;
activitiesSection.appendChild(activitiesTotal);
//setting the value of the total cost of activity
let activitiesTotalCost = 0;
activitiesTotal.value = `Total: $${activitiesTotalCost}`;

activitiesSection.addEventListener('change', (e) => {
    let selectedActivity = e.target;
    let selectedActivityDate = selectedActivity.getAttribute('data-day-and-time');
    let activityCost = parseInt(selectedActivity.getAttribute('data-cost'));
    //Updating the cost of activity based on events picked
    selectedActivity.checked ?
        activitiesTotalCost += activityCost :
        activitiesTotalCost -= activityCost;
    activitiesTotal.value = `Total: $${activitiesTotalCost}`;
    //Disabling events with matching date
    allActivities.forEach(activity => {
        let activityDate = activity.getAttribute('data-day-and-time');
        if (selectedActivityDate === activityDate && selectedActivity !== activity) {
            selectedActivity.checked ?
                activity.disabled = true :
                activity.disabled = false;
        }
    });
});

//Payment Section
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
//Selecting credit card option by default and hiding other payment methods
payment.options[1].selected = true
payPal.classList.add('is-hidden');
bitcoin.classList.add('is-hidden');
//Displaying one payment method per time
payment.addEventListener('change', () => {
    payment.options[0].disabled = true
    if (payment.value === 'credit card') {
        creditCard.classList.remove('is-hidden');
        payPal.classList.add('is-hidden');
        bitcoin.classList.add('is-hidden');
    } else if (payment.value === 'paypal') {
        payPal.classList.remove('is-hidden');
        bitcoin.classList.add('is-hidden');
        creditCard.classList.add('is-hidden');
    } else {
        bitcoin.classList.remove('is-hidden');
        payPal.classList.add('is-hidden');
        creditCard.classList.add('is-hidden');
    }
});

//Form Validation
//Function to add error message to input field or section
const addErrorMessage = (section, message) => {
    let newElement = document.createElement('p');
    newElement.textContent = message;
    newElement.style.color = 'red';
    newElement.classList.add('is-hidden');
    section.parentNode.insertBefore(newElement, section.nextElementSibling);
}

//function hide and display based on argument
const validator = (hasValue, errorMessage) => {
    if (hasValue) {
        errorMessage.classList.add('is-hidden');
        return true;
    } else {
        errorMessage.classList.remove('is-hidden');
        return false;
    }
}

//adding error message and validating the name input while typing
addErrorMessage(name, 'This is a required field');
const nameErrorMessage = name.nextElementSibling;
const nameValidation = () => {
    return validator(!!(name.value), nameErrorMessage);
}
name.addEventListener('input', () => nameValidation());

//adding error message and validating the email input while typing
mail.placeholder = 'dave@teamtreehouse.com';
addErrorMessage(mail, '');
const mailError = document.querySelectorAll('p')[1];

const mailErrorMessage = mail.nextElementSibling;
const emailValidation = () => {
    let emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!mail.value) { //validating the email input field if it is empty
        mailErrorMessage.classList.remove('is-hidden');
        mailError.textContent = 'Please enter your email address';
        return false;
    } else if (!emailFormat.test(mail.value)) { // validating the email input value if it is not correct
        mailErrorMessage.classList.remove('is-hidden');
        mailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        mailErrorMessage.classList.add('is-hidden');
        return true;
    }
}
mail.addEventListener('input', () => emailValidation());

//adding error message and validating the activities section while making choices on activity to choose from
addErrorMessage(activitiesSection, 'You are required to pick an activity for the Full Stack Conf');
const activityErrorMessage = activitiesSection.nextElementSibling;
const activityValidation = () => {
    let checkedActivity = 0;
    allActivities.forEach(activity => {
        if (activity.checked) checkedActivity++
    });
    return validator(checkedActivity > 0, activityErrorMessage);
}
activitiesSection.addEventListener('change', () => activityValidation());

//validating the card number input field while typing
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
addErrorMessage(cardNumber, '');
const cardNumberErrorMessage = cardNumber.nextElementSibling;
const cardNumberError = document.querySelector('.col-6 p');
cardNumber.placeholder = '01234567890123';
zip.placeholder = '12345';
cvv.placeholder = '123';
const cardNumberValidation = () => {
    let cardNumberFormat = /^[0-9]{13,16}$/;
    //checking if the card number input field is empty
    if (cardNumber.value === '') {
        cardNumberErrorMessage.classList.remove('is-hidden');
        cardNumberError.textContent = 'Please enter your credit card number.';
        return false;
    } else if (/^[0-9]{0,12}$/.test(cardNumber.value)) { //checking if the value of the card number input field is between 0 & 12
        cardNumberError.textContent = 'Please enter a credit card number between 13 and 16 digits';
        cardNumberErrorMessage.classList.remove('is-hidden');
        return false;
    } else if (!cardNumberFormat.test(cardNumber.value)) { //checking if the value of card number input field is between 13 and 16
        cardNumberErrorMessage.classList.remove('is-hidden');
        cardNumberError.textContent = 'Please enter a valid credit card number.';
    } else { //hiding error messages if all criteria are met
        cardNumberErrorMessage.classList.add('is-hidden');
        return true;
    }
}
cardNumber.addEventListener('input', () => cardNumberValidation());

//validating the zipCode while typing
addErrorMessage(zip, 'Please enter a 5 digits zip code');
const zipErrorMessage = zip.nextElementSibling;
const zipValidation = () => {
    const zipFormat = /^[0-9]{5}$/;
    return validator(zipFormat.test(zip.value), zipErrorMessage);
}
zip.addEventListener('input', () => zipValidation());

//validating the cvv while typing
addErrorMessage(cvv, 'Please enter a 3 digits CVV');
const cvvErrorMessage = cvv.nextElementSibling;
const cvvValidation = () => {
    let cvvFormat = /^[0-9]{3}$/;
    return validator(cvvFormat.test(cvv.value), cvvErrorMessage);
}
cvv.addEventListener('input', () => cvvValidation());

//PROJECT IS BUILT FOR EXCEEDS EXPECTATION GRADING
//validating the form when submitted
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    let validators = [nameValidation(), emailValidation(), activityValidation()]
    let paymentValidator = [cardNumberValidation(), zipValidation(), cvvValidation()]
    validators.forEach(validator => {
        if (!validator) e.preventDefault();
    });
    //validating the form when the credit card payment is picked
    if (payment.value === 'credit card') {
        paymentValidator.forEach(creditCard => {
            if (!creditCard) e.preventDefault();
        });
    }
});
//PROJECT IS BUILT FOR EXCEEDS EXPECTATION GRADING