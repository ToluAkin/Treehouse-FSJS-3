//Job role section
const otherJobTitle = document.querySelector('#other-title');
otherJobTitle.style.display = 'none';

const userTitle = document.querySelector('#title');
userTitle.addEventListener('change', () => {
    if (userTitle.value == 'other') {
        otherJobTitle.style.display = 'block';
    } else {
        otherJobTitle.style.display = 'none';
    }
})

//T-shirt section

const theme = document.querySelector('#design');
const colors = document.querySelector('#color');
const colorText = document.createElement('option');

colorText.text = 'Please select a T-shirt theme';
colors.appendChild(colorText);
colorText.selected = true;

// console.log(theme.options[0])
for (let i = 0; i < colors.length; i++) {
    colors.options[i].hidden = 'true';  
}
// console.log(colors.options[0]) 
theme.addEventListener('change', () => {
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
        const allActivitiesDate = allActivities[i].getAttribute('data-day-and-time');
        if (activityDate.includes(allActivitiesDate) && activity != allActivities[i]) {
            if (activity.checked) {
                allActivities[i].disabled = true;
            } else {
                allActivities[i].disabled = false;
            }
        }
    }
});