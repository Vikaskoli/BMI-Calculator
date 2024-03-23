const form = document.querySelector('form');

// Event listener for form submission
form.addEventListener("submit", function(e){
  e.preventDefault();  //prevents the default form submission behavior

  // Retrieving input values
  const heightValue = parseFloat(document.querySelector('#height').value);
  const weightValue = parseFloat(document.querySelector('#weight').value);
  const heightUnit = document.querySelector('#heightUnit').value;
  const weightUnit = document.querySelector('#weightUnit').value;

  let heightCM = heightValue;
  let weightKG = weightValue;

  // Unit conversion
  if (heightUnit === 'in') {
    heightCM = heightValue * 2.54; // Convert inches to CM
  }
  if (weightUnit === 'lb') {
    weightKG = weightValue * 0.453592; // Convert pounds to KG
  }

  const results = document.querySelector('#results');

  // Validation and BMI calculation
  if (isNaN(heightCM) || heightCM <= 0 || isNaN(weightKG) || weightKG <= 0) {
    results.innerHTML = 'Please provide valid height and weight.';
  } else {
    const bmi = (weightKG / ((heightCM * heightCM) / 10000)).toFixed(2);
    results.innerHTML = `<span>${bmi}</span>`;

    // Determine BMI category and highlight
    if (bmi < 18.6) {
      results.innerHTML += ` Underweight`;
    } else if (bmi >= 18.6 && bmi <= 24.9) {
      results.innerHTML += ` Normal Range`;
    } else {
      results.innerHTML += ` Overweight`;
    }

    // Highlighting BMI category
    highlightBMICategory(bmi, results.lastChild);
  }
});

// Event listener for reset button
resetButton.addEventListener("click", function(e){
  e.preventDefault();

  // Clear form fields and results
  document.querySelector('#height').value = '';
  document.querySelector('#weight').value = '';
  document.querySelector('#results').innerHTML = '';
});

// Function to highlight BMI category
function highlightBMICategory(bmi, categoryElement) {
  const resultsDiv = categoryElement.parentElement;

  resultsDiv.classList.remove('underweight', 'normal', 'overweight');

  if (bmi < 18.6) {
    resultsDiv.classList.add('underweight');
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    resultsDiv.classList.add('normal');
  } else {
    resultsDiv.classList.add('overweight');
  }
}
