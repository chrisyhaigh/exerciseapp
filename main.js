/* 
    Author: Chrisy
    A web page about Exercises
*/

// Variables
const url = "https://api.api-ninjas.com/v1/exercises?muscle=";
const apiKey = "vuBevPOXeFlv3cskmWVHRg==7OPJqwjHIsXDJmA9";
const exerciseList = document.getElementById('muscle-group-list'); 
const searchButton = document.getElementById('search-button');
const exerciseResults = document.getElementById('exercise-results'); // Ensure this ID matches your HTML

// Created object for list of muscle groups to use as query in the API request
const muscleGroups = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
];

// Populate the drop-down menu with the muscle groups
function populateDropdown() {
    muscleGroups.forEach(muscle => {
        let option = document.createElement('option');
        option.textContent = muscle;
        option.value = muscle;
        exerciseList.appendChild(option);
    });
}

// Get exercises from API request 
function getExercises() {
    const selectedMuscle = exerciseList.value;

    fetch(url + selectedMuscle, {
        headers: {
            "X-Api-Key": apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return response.json();
    })
    .then(exercises => {
        displayExercises(exercises);
    })
    .catch(error => {
        console.error(error);
    });
}

// Populating the HTML with the exercises 
function displayExercises(exercises) {
    exerciseResults.innerHTML = '';

    exercises.forEach(exercise => {
        const muscleElement = document.createElement('div');
        muscleElement.classList.add('muscle');
        muscleElement.innerHTML = `
            <h2 class="exercise-name">${exercise.name}</h2>`;

        muscleElement.addEventListener('click', () => { // Fixed syntax error here
            displayInstructions(exercise);
        });

        exerciseResults.appendChild(muscleElement);
    });
}

// Displaying the instructions for a clicked exercise
function displayInstructions(exercise) { 
    const instructionElement = document.createElement('div');
    instructionElement.classList.add('instructions');
    instructionElement.innerHTML = `
        <h2>${exercise.name}</h2>
        <p class="instruction-description">${exercise.instructions}</p>`; 

    exerciseResults.innerHTML = ''; // Clear previous exercises
    exerciseResults.appendChild(instructionElement); // Show instructions
}

// Event listener for search button click
searchButton.addEventListener('click', function() {
    getExercises();
});

// Call populateDropdown when the window has fully loaded
window.onload = populateDropdown;
