
document.addEventListener("DOMContentLoaded", function () {
    
    if (window.location.pathname.endsWith("ACTIVITY 1\recipes.html")) {
        
        fetch("ACTIVITY 1\assets\Recipes.xml")
            .then(response => response.text())
            .then(xmlString => new window.DOMParser().parseFromString(xmlString, "text/xml"))
            .then(xmlDoc => {
              
                const dishNames = xmlDoc.querySelectorAll("Dish Name");
  
               
                const dishListDiv = document.createElement("div");
                dishListDiv.className = "dish-list";
  
                
                dishNames.forEach(name => {
                    const dishName = name.textContent;
                    const dishItem = document.createElement("p");
                    dishItem.textContent = dishName;
                    dishListDiv.appendChild(dishItem);
                });
  
                
                document.getElementById("xml-content").appendChild(dishListDiv);
            })
            .catch(error => {
                console.error("Error loading XML file: ", error);
            });
    }
  });
  