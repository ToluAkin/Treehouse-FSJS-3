//Variables
const form = document.querySelector('form');
const otherJobTitle = document.querySelector('#other-title');
const userTitle = document.querySelector('#title');
const theme = document.querySelector('#design');
const colors = document.querySelector('#color');
const colorsDiv = document.querySelector('#colors-js-puns');
const activities = document.querySelector('.activities');
const allActivities = document.querySelectorAll('input[type=checkbox]');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const name = document.querySelector('#name');
const mail = document.querySelector('#mail');

//Job role section
//Set focus on the first text field
name.focus();
//Hiding the other Job Title on page load
otherJobTitle.className = 'is-hidden';
//Hiding and showing the job title
userTitle.addEventListener('change', () => {
    userTitle.value == 'other' ?
        otherJobTitle.classList.remove('is-hidden') :
        otherJobTitle.className = 'is-hidden';
})

//T-shirt section
//Creating a default option
const colorText = document.createElement('option');
colorText.text = 'Please select a T-shirt theme';
colors.appendChild(colorText);
//selecting default section and hiding colors Div
colorText.selected = true;
colorsDiv.className = 'is-hidden';
//Hiding all colors 
for (let i = 0; i < colors.length; i++) {
    colors.options[i].hidden = 'true';
}
//updating the colors based on design
theme.addEventListener('change', () => {
    theme.options[0].disabled = true
    colorsDiv.classList.remove('is-hidden');

    if (theme.value == 'js puns') {
        colorText.selected = false;
        for (let i = 0; i < colors.length; i++) {
            if (i < 3) {
                colors.options[0].selected = true;
                colors.options[i].hidden = ''
            } else {
                colors.options[i].className = 'is-hidden';
            }
        }
    } else {
        for (let i = 0; i < colors.length; i++) {
            colorText.selected = false;
            colors.options[3].selected = true;
            if (i >= 3) {
                colors.options[i].hidden = '';
                colors.options[6].hidden = true;
            } else {
                colors.options[i].className = 'is-hidden';
            }
        }
    }
});

// Register for activities section
//creating input field for the total cost of activity
const activitiesTotal = document.createElement('input');
activitiesTotal.disabled = true;
activities.appendChild(activitiesTotal);
//setting the value of the total cost of activity
let activitiesTotalCost = 0;
activitiesTotal.value = `Total: $${activitiesTotalCost}`;

activities.addEventListener('change', (e) => {
    const activity = e.target;
    const activityDate = activity.getAttribute('data-day-and-time');
    const activityCost = parseInt(activity.getAttribute('data-cost'));
    //Updating the cost of activity based on events picked
    activity.checked ?
        activitiesTotalCost += activityCost :
        activitiesTotalCost -= activityCost;
    activitiesTotal.value = `Total: $${activitiesTotalCost}`;
    //Disabling events with matching date
    for (let i = 0; i < allActivities.length; i++) {
        const allActivitiesDate = allActivities[i].getAttribute('data-day-and-time');
        if (activityDate.includes(allActivitiesDate) && activity != allActivities[i]) {
            activity.checked ?
                allActivities[i].disabled = true :
                allActivities[i].disabled = false;
        }
    }
});

//Payment Section
//Selecting credit card option by default and hiding other payment methods
payment.options[1].selected = true
payPal.className = 'is-hidden';
bitcoin.className = 'is-hidden';
//Displaying one payment method per time
payment.addEventListener('change', () => {
    payment.options[0].disabled = true
    if (payment.value == 'credit card') {
        creditCard.classList.remove('is-hidden');
        payPal.className = 'is-hidden';
        bitcoin.className = 'is-hidden';
    } else if (payment.value == 'paypal') {
        payPal.classList.remove('is-hidden');
        bitcoin.className = 'is-hidden';
        creditCard.className = 'is-hidden';
    } else {
        bitcoin.classList.remove('is-hidden');
        payPal.className = 'is-hidden';
        creditCard.className = 'is-hidden';
    }
});

//Form Validation
//Function to add error message to input field or section
const addErrorMessage = (section, message) => {
    const newElement = document.createElement('p');
    const parent = section.parentNode;
    newElement.textContent = message;
    newElement.style.color = 'red';
    newElement.className = 'is-hidden';
    parent.insertBefore(newElement, section.nextElementSibling);
}

//function hide and display based on arguement
const validator = (args, errorPosition) => {
    if (args) {
        errorPosition.className = 'is-hidden';
        return true;
    } else {
        errorPosition.classList.remove('is-hidden');
        return false;
    }
}

//adding error message and validating the name input while typing
addErrorMessage(name, 'This is a required field');
const nameValidation = () => {
    const errorMessage = name.nextElementSibling;
    validator(name.value != '', errorMessage);
}

name.addEventListener('input', () => nameValidation());
//adding error message and validating the email input while typing
addErrorMessage(mail, 'Enter a valid email address');
const emailValidation = () => {
    const errorMessage = mail.nextElementSibling;
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    validator(emailFormat.test(mail.value), errorMessage);
}

mail.addEventListener('input', () => emailValidation());
//adding error message and validating the activities section while making choices on activity to choose from
addErrorMessage(activities, 'You are required to pick an activity for the Full Stack Conf');
const activityValidation = () => {
    const errorMessage = activities.nextElementSibling;
    let checkedActivity = 0;
    for (let i = 0; i < allActivities.length; i++) {
        if (allActivities[i].checked) {
            checkedActivity++;
        }
    }
    validator(checkedActivity > 0, errorMessage);
}

activities.addEventListener('change', () => activityValidation());
//validating the card number input field while typing
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
addErrorMessage(cardNumber, '');
const cardNumberError = document.querySelector('.col-6 p');
const cardNumberValidation = () => {
    const errorMessage = cardNumber.nextElementSibling;
    const cardNumberFormat = /^[0-9]{13,16}$/;
    //checking if the card number input field is empty
    if (cardNumber.value === '') {
        errorMessage.classList.remove('is-hidden');
        cardNumberError.textContent = 'Please enter a credit card number.';
        return false;
    } else if (/^[0-9]{10}$/.test(cardNumber.value)) { //checking if the value of the card number input field is 10
        cardNumberError.textContent = 'Please enter a credit card number between 13 and 16 digits';
        errorMessage.classList.remove('is-hidden');
        return false;
    } else if (!cardNumberFormat.test(cardNumber.value)) { //checking if the value of card number input field is between 13 and 16
        errorMessage.classList.remove('is-hidden');
        cardNumberError.textContent = 'Please enter a credit card number.';
    } else { //hiding error messages if all criterias are met
        errorMessage.className = 'is-hidden';
        return true;
    }
}
cardNumber.addEventListener('input', () => cardNumberValidation());

//validating the zipcode while typing
addErrorMessage(zip, 'Please enter a 5 digits zip code');
const zipValidation = () => {
    const errorMessage = zip.nextElementSibling;
    const zipFormat = /^[0-9]{5}$/;
    validator(zipFormat.test(zip.value), errorMessage);
}
zip.addEventListener('input', () => zipValidation());

//validating the cvv while typing
addErrorMessage(cvv, 'Please enter a 3 digits CVV');
const cvvValidation = () => {
    const errorMessage = cvv.nextElementSibling;
    const cvvFormat = /^[0-9]{3}$/;
    validator(cvvFormat.test(cvv.value), errorMessage);
} 

cvv.addEventListener('input', () => zipValidation());

//adding all payment validation in one function
const paymentValidation = () => {
    cardNumberValidation();
    zipValidation();
    cvvValidation();
}

//validating the form when submitted
form.addEventListener('submit', (e) => {
    const validators = [nameValidation(), emailValidation(), activityValidation()]
    for (let i = 0; i < validators.length; i++) {
        validators[i];
        if (!validators[i]) {
            e.preventDefault();
            window.scrollTo(0, 0);
        }
    }
    //validating the form when the credit card payment is picked
    if (payment.value == 'credit card') {
        paymentValidation();
        if (!paymentValidation()) {
            e.preventDefault();
        }
    }
});