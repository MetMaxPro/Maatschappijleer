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
        feedback += `<li style="color: red;"><strong>Onderwijs, Cultuur en Wetenschap</strong> zijn ondergefinancierd. Dit kan de kwaliteit van het onderwijs be&#xefnvloeden.</li><br>`;
        break;
      case 'Zorg':
        feedback += `<li style="color: red;"><strong>Zorg</strong> krijgt te weinig. Dit kan leiden tot langere wachttijden en verminderde zorg.</li><br>`;
        break;
      case 'Sociale Zekerheid':
        feedback += `<li style="color: red;"><strong>Sociale Zekerheid</strong> krijgt te weinig. Dit kan leiden tot lagere uitkeringen en minder ondersteuning voor kwetsbare groepen.</li><br>`;
        break;
      case 'Gemeente- en Provinciefonds':
        feedback += `<li style="color: red;">De <strong>Gemeenten en Provincies</strong> krijgen te weinig. Dit kan leiden tot achterstallig onderhoud en verminderde lokale dienstverlening.</li><br>`;
        break;
      case 'Defensie, Justitie en Veiligheid':
        feedback += `<li style="color: red;"><strong>Defensie, Justitie en Veiligheid</strong> zijn ondergefinancierd. Dit kan nationale veiligheid be&#xefnvloeden.</li><br>`;
        break;
      default:
        feedback += `<li style="color: red;"><strong>${category}</strong> heeft te weinig middelen. Dit kan leiden tot problemen.</li><br>`;
    }
  } else if (amount > 130) {
    color = 'green';
    switch (category) {
     case 'Onderwijs, Cultuur en Wetenschap':
        feedback += `<li style="color: green;"><strong>Onderwijs, Cultuur en Wetenschap</strong> krijgen veel middelen. Dit biedt kansen voor innovatie en betere faciliteiten.</li><br>`;
        break;
      case 'Zorg':
        feedback += `<li style="color: green;"><strong>Zorg</strong> heeft ruim voldoende middelen. Dit verhoogt de kwaliteit van zorg.</li><br>`;
        break;
      case 'Sociale Zekerheid':
        feedback += `<li style="color: green;"><strong>Sociale Zekerheid</strong> krijgt ruim voldoende middelen. Dit versterkt de bestaanszekerheid, maar de hoge uitgaven moeten wel op lange termijn houdbaar blijven.</li><br>`;
        break;
      case 'Gemeente- en Provinciefonds':
        feedback += `<li style="color: green;">De <strong>Gemeenten en Provincies</strong> ontvangen veel middelen. Dit kan zorgen voor verbeterde infrastructuur en extra lokale voorzieningen, maar kan ook leiden tot ineffici&#235nte besteding</li><br>`;
        break;
      case 'Defensie, Justitie en Veiligheid':
        feedback += `<li style="color: green;"><strong>Defensie, Justitie en Veiligheid</strong> krijgen veel. Dit versterkt de nationale veiligheid, maar gaat mogelijk ten koste van andere sectoren.</li><br>`;
        break;
      default:
        feedback += `<li style="color: green;"><strong>${category}</strong> heeft veel middelen gekregen. Dit is positief, maar het kan tekorten veroorzaken in andere sectoren.</li><br>`;
    }
  } else {
    feedback += `<li style="color: black;"><strong>${category}</strong> heeft een gebalanceerd budget.</li><br>`;
  }

});

feedback += '</ul><h3>Nederland - 2025:</h3><ul><li style="color: black;"><strong>Onderwijs, Cultuur en Wetenschap:</strong> 53,4 miljard</li><li style="color: green;"><strong>Zorg:</strong> 114,6 miljard</li><li style="color: green;"><strong>Sociale Zekerheid</strong> 114,9 miljard</li><li style="color: black;"><strong>Gemeente- en Provinciefonds:</strong> 53,4 miljard</li><li style="color: red;"><strong>Defensie, Justitie en Veiligheid:</strong> 43,3 miljard</li>';

  feedbackDiv.innerHTML = feedback;
  feedbackDiv.classList.remove('hidden');
}

submitButton.addEventListener('click', provideFeedback);

updateBudget();
