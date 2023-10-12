document.addEventListener("DOMContentLoaded", function() {
  
  fetch("ACTIVITY 1\assets\Recipes.xml") 
      .then(response => response.text())
      .then(data => {
          
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
          const dishElements = xmlDoc.querySelectorAll("Dish");

          
          const recipesContainer = document.getElementById("recipes-container");

         
          dishElements.forEach(dish => {
              const dishName = dish.querySelector("Name").textContent;

              
              const dishElement = document.createElement("p");
              dishElement.textContent = dishName;
              recipesContainer.appendChild(dishElement);
          });
      })
      .catch(error => console.error("Error fetching or parsing XML:", error));
});
