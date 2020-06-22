//Job role section
const form = document.querySelector('form');
const name = document.querySelector('#name');
const mail = document.querySelector('#mail');


const otherJobTitle = document.querySelector('#other-title');
otherJobTitle.className = 'is-hidden';

const userTitle = document.querySelector('#title');
userTitle.addEventListener('change', () => {
    userTitle.value == 'other' ?
        otherJobTitle.classList.remove('is-hidden') :
        otherJobTitle.className = 'is-hidden';
})

//T-shirt section

const theme = document.querySelector('#design');
const colors = document.querySelector('#color');
const colorText = document.createElement('option');

colorText.text = 'Please select a T-shirt theme';
colors.appendChild(colorText);
colorText.selected = true;

for (let i = 0; i < colors.length; i++) {
    colors.options[i].hidden = 'true';  
}

theme.addEventListener('change', () => {
    theme.options[0].disabled = true
    if (theme.value == 'js puns') {
        colorText.selected = false;
        for (let i = 0; i < colors.length; i++) {
            if (i < 3) {
                colors.options[0].selected = true;
                colors.options[i].hidden = ''
            } else {
                colors.options[i].hidden = true;
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
                colors.options[i].hidden = true;
            }
        }
    }
});

// Register for activities section

const activities = document.querySelector('.activities');
const allActivities = document.querySelectorAll('input[type=checkbox]');

let activitiesTotal = document.createElement('input');
activitiesTotal.disabled = true;
activities.appendChild(activitiesTotal);

let activitiesTotalCost = 0;
activitiesTotal.value = `Total: $${activitiesTotalCost}`;

activities.addEventListener('change', (e) => {
    const activity = e.target;
    const activityDate = activity.getAttribute('data-day-and-time');
    const activityCost = activity.getAttribute('data-cost');

    if (activity.checked) {
        activitiesTotalCost += +activityCost;
        activitiesTotal.value = `Total: $${activitiesTotalCost}`;
    } else {
        activitiesTotalCost += -activityCost;
        activitiesTotal.value = `Total: $${activitiesTotalCost}`;
    }

    for (let i = 0; i < allActivities.length; i++) {
        console.log(!allActivities[i].checked);
        const allActivitiesDate = allActivities[i].getAttribute('data-day-and-time');
        if (activityDate.includes(allActivitiesDate) && activity != allActivities[i]) {
            activity.checked ?
                allActivities[i].disabled = true :
                allActivities[i].disabled = false;
        }
    }
});

//Payment Section
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

payment.options[1].selected = true
payPal.className = 'is-hidden';
bitcoin.className = 'is-hidden';

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

const nameValidation = () => {
    if (name.value == 0) {
        name.style.borderColor = 'red';
    } else {
        name.addEventListener('input', () => {
            name.style.borderColor = 'white';
        })
    } 
}
        

const emailValidation = () => {
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    mail.value.match(emailFormat) ? mail.style.borderColor = '' : mail.style.borderColor = 'red';
}

const activityValidation = () => {}
const submitButton = document.querySelector('button');

form.addEventListener('input', () => {
    nameValidation();
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameValidation();
})