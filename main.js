const sliders = document.querySelectorAll('input[type="range"]');
const values = document.querySelectorAll('span[id$="-value"]');
const budgetLeftDisplay = document.getElementById('budget-left');
const feedbackDiv = document.getElementById('feedback');
const submitButton = document.getElementById('submit-button');

let totalBudget = 457;

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
    feedbackDiv.innerHTML = `<p style="color: red;">Je hebt niet precies €457 miljard verdeeld! Je hebt €${totalUsed} miljard gebruikt.</p>`;
    feedbackDiv.classList.remove('hidden');
    return;
  }
  
  let feedback = '<h3>Feedback:</h3><ul>';
  Object.entries(allocations).forEach(([category, amount]) => {
  if (amount < 50) {
    switch (category) {
      case 'Onderwijs, Cultuur en Wetenschap':
        feedback += `<li style="color: red;">Onderwijs, Cultuur en Wetenschap zijn ondergefinancierd. Dit kan de kwaliteit van het onderwijs be&#xefnvloeden.</li>`;
        break;
      case 'Zorg':
        feedback += `<li style="color: red;">Zorg krijgt te weinig. Dit kan leiden tot langere wachttijden en verminderde zorg.</li>`;
        break;
      case 'Sociale Zekerheid':
        feedback += `<li style="color: red;">Sociale Zekerheid krijgt te weinig. Dit kan leiden tot lagere uitkeringen en minder ondersteuning voor kwetsbare groepen.</li>`;
        break;
      case 'Gemeente- en Provinciefonds':
        feedback += `<li style="color: red;">De Gemeenten en Provincies krijgen te weinig. Dit kan leiden tot achterstallig onderhoud en verminderde lokale dienstverlening.</li>`;
        break;
      case 'Defensie, Justitie en Veiligheid':
        feedback += `<li style="color: red;">Defensie, Justitie en Veiligheid zijn ondergefinancierd. Dit kan nationale veiligheid be&#xefnvloeden.</li>`;
        break;
      default:
        feedback += `<li style="color: red;">${category} heeft te weinig middelen. Dit kan leiden tot problemen.</li>`;
    }
  } else if (amount > 130) {
    color = 'green';
    switch (category) {
     case 'Onderwijs, Cultuur en Wetenschap':
        feedback += `<li style="color: green;">Onderwijs, Cultuur en Wetenschap krijgen veel middelen. Dit biedt kansen voor innovatie en betere faciliteiten.</li>`;
        break;
      case 'Zorg':
        feedback += `<li style="color: green;">Zorg heeft ruim voldoende middelen. Dit verhoogt de kwaliteit van zorg.</li>`;
        break;
      case 'Sociale Zekerheid':
        feedback += `<li style="color: green;">Sociale Zekerheid krijgt ruim voldoende middelen. Dit versterkt de bestaanszekerheid, maar de hoge uitgaven moeten wel op lange termijn houdbaar blijven.</li>`;
        break;
      case 'Gemeente- en Provinciefonds':
        feedback += `<li style="color: green;">De Gemeenten en Provincies ontvangen veel middelen. Dit kan zorgen voor verbeterde infrastructuur en extra lokale voorzieningen, maar kan ook leiden tot ineffici&#235nte besteding</li>`;
        break;
      case 'Defensie, Justitie en Veiligheid':
        feedback += `<li style="color: green;">Defensie, Justitie en Veiligheid krijgen veel. Dit versterkt de nationale veiligheid, maar gaat mogelijk ten koste van andere sectoren.</li>`;
        break;
      default:
        feedback += `<li style="color: green;">${category} heeft veel middelen gekregen. Dit is positief, maar het kan tekorten veroorzaken in andere sectoren.</li>`;
    }
  } else {
    feedback += `<li style="color: black;">${category} heeft een gebalanceerd budget.</li>`;
  }

});

feedback += '</ul>';

  feedbackDiv.innerHTML = feedback;
  feedbackDiv.classList.remove('hidden');
}

submitButton.addEventListener('click', provideFeedback);

updateBudget();z
