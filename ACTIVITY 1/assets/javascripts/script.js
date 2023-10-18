// JavaScript code
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const topSearchesList = document.getElementById('top-searches');

const searchCounts = JSON.parse(localStorage.getItem('searchCounts')) || {}; // Load search counts from local storage

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

let mealsData = []; // Initialize an empty array for meals data.

fetch('data.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        mealsData = Array.from(xml.querySelectorAll('meal'));
    })
    .catch(error => {
        console.error("Error fetching or parsing XML data:", error);
    });

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    
    const isMatch = mealsData.some(meal => {
        const mealName = meal.querySelector('name').textContent.toLowerCase();
        return mealName.includes(searchInputTxt.toLowerCase());
    });
    
    if (isMatch) {
        incrementSearchCount(searchInputTxt); // Increment search count
        updateTopSearches();
    }

    let filteredMeals = mealsData.filter(meal => {
        const mealName = meal.querySelector('name').textContent.toLowerCase();
        return mealName.includes(searchInputTxt.toLowerCase());
    });

    let html = "";
    if (filteredMeals.length > 0) {
        // Display matched meals
        filteredMeals.forEach(meal => {
            const id = meal.querySelector('id').textContent;
            const name = meal.querySelector('name').textContent;
            const image = meal.querySelector('image').textContent;

            html += `
                <div class="meal-item" data-id="${id}">
                    <div class="meal-img">
                        <img src="foodimages/${image}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${name}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
}

// Increment search count
function incrementSearchCount(searchText) {
    searchCounts[searchText] = (searchCounts[searchText] || 0) + 1;
    localStorage.setItem('searchCounts', JSON.stringify(searchCounts)); // Save search counts to local storage
}

// Update the top searches list
function updateTopSearches() {
    // Sort searchCounts to get the top 3 searches
    const sortedSearches = Object.entries(searchCounts).sort((a, b) => b[1] - a[1]);
    const top3Searches = sortedSearches.slice(0, 3);

    // Render the top searches list
    topSearchesList.innerHTML = top3Searches.map(([searchText, count]) => {
        return `<li>${searchText} - ${count} searches</li>`;
    }).join('');
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        let meal = Array.from(mealsData).find(item => item.querySelector('id').textContent === mealItem.dataset.id);
        mealRecipeModal(meal);
    }
}

function mealRecipeModal(meal) {
    const id = meal.querySelector('id').textContent;
    const name = meal.querySelector('name').textContent;
    const ingredients = meal.querySelector('ingredients').textContent;

    let html = `
        <h2 class="recipe-title">${name}</h2>
        <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <p>${ingredients}</p>
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

/* uncomment to clear local storage */
// localStorage.clear();