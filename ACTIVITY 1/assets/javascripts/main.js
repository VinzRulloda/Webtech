let xmlDoc; // Declare xmlDoc outside to make it accessible to both event listeners

let xhttp = new XMLHttpRequest();
xhttp.open("GET", "ACTIVITY 1/assets/Recipes.xml", true);
xhttp.send();

xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        xmlDoc = xhttp.responseXML; // Store xmlDoc for later use

        document.getElementById("search-test").addEventListener("input", function () {
            const query = this.value.toLowerCase();
            const resultsContainer = document.getElementById("results-test");
            resultsContainer.innerHTML = "";

            const dishes = xmlDoc.getElementsByTagName("Dish");

            for (let i = 0; i < dishes.length; i++) {
                const name = dishes[i].getElementsByTagName("Name")[0].textContent;
                if (name.toLowerCase().includes(query)) {
                    const imageSrc = dishes[i].getElementsByTagName("image")[0].textContent;

                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item";
                    resultItem.innerHTML = `<img src="${imageSrc}" alt="${name}" data-dish-id="${i}">`;

                    resultItem.addEventListener("click", function () {
                        const dishId = this.getAttribute("data-dish-id");
                        const selectedImage = dishes[dishId].getElementsByTagName("image")[0].textContent;
                        document.getElementById("selected-image").src = selectedImage;
                    });

                    resultsContainer.appendChild(resultItem);
                }
            }
        });

        // Add event listener to the form for form submission
        document.getElementById("search-form").addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from actually submitting
            // You can add search functionality here if needed
        });
    } else {
        console.error('Failed to load XML');
    }
};


/*
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
  */