// Get elements
const sliders = document.querySelectorAll('input[type="range"]');
const values = document.querySelectorAll('span[id$="-value"]');
const budgetLeftDisplay = document.getElementById('budget-left');
const feedbackDiv = document.getElementById('feedback');
const submitButton = document.getElementById('submit-button');

let totalBudget = 457;

// Update remaining budget and slider values
function updateBudget() {
  let totalUsed = 0;
  sliders.forEach((slider, index) => {
    const value = parseInt(slider.value);
    values[index].textContent = value;
    totalUsed += value;
  });

  const budgetLeft = totalBudget - totalUsed;
  budgetLeftDisplay.textContent = budgetLeft;

  if (budgetLeft < 0) {
    budgetLeftDisplay.style.color = 'red';
  } else {
    budgetLeftDisplay.style.color = 'black';
  }
}

sliders.forEach(slider => {
  slider.addEventListener('input', updateBudget);
});

// Provide feedback
function provideFeedback() {
  let totalUsed = 0;
  const allocations = {};

  sliders.forEach(slider => {
    const category = slider.name;
    const amount = parseInt(slider.value);
    allocations[category] = amount;
    totalUsed += amount;
  });

  if (totalUsed !== totalBudget) {
    feedbackDiv.innerHTML = `<p style="color: red;">Je hebt niet precies €457 miljard verdeeld! Je hebt €${totalUsed} miljoen gebruikt.</p>`;
    feedbackDiv.classList.remove('hidden');
    return;
  }

  let feedback = '<h3>Feedback:</h3><ul>';
  Object.entries(allocations).forEach(([category, amount]) => {
    if (amount < 50) {
      feedback += `<li style="color: red;">${category} heeft te weinig middelen. Dit kan leiden tot problemen.</li>`;
    } else if (amount > 130) {
      feedback += `<li style="color: green;">${category} heeft veel middelen gekregen. Dit is positief, maar het kan tekorten veroorzaken in andere sectoren.</li>`;
    } else {
      feedback += `<li style="color: black;">${category} heeft een gebalanceerd budget.</li>`;
    }
  });
  feedback += '</ul>';

  feedbackDiv.innerHTML = feedback;
  feedbackDiv.classList.remove('hidden');
}

// Add event listener to the submit button
submitButton.addEventListener('click', provideFeedback);

// Initialize the budget display
updateBudget();z
