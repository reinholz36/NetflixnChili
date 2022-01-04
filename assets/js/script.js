var formEntry = document.querySelector("#search");
var submitButton = document.querySelector("#submit-button")
var searchedMovie = document.querySelector("#searched-movie")
var movieTitle = document.querySelector("#movie-title")
var movieParent = document.querySelector("#movie-parent")
var moviePoster = document.querySelector("#movie-poster")
var image = document.querySelector("#image")
var recipeParent = document.querySelector("#recipe-parent")
var recipeImage = document.querySelector("#recipe-image")
var recipeTitle = document.querySelector("#recipe-title")
var recipeTitleParent = document.querySelector("#recipe-title-parent")
var recipeLink = document.querySelector("#recipe-link")
var recipeDirections = document.querySelector("#recipe-directions")
var linkList = document.querySelector("#link-list")
var recipeList = document.querySelector("#recipe-list")
var pastRecipe = document.querySelector("#past-recipe")
var recipeAnchor = document.querySelector("#recipe-anchor")
var pastRecipe1 = document.querySelector("#past-recipe-1")

// var randomizeRecipe = function() {
//     var randomNumber = (Math.floor(Math.random() *400000) +1)
//     console.log("Random Number", randomNumber)
//     return randomNumber
// }

var formSubmitHandler = function(event) {
    // prevent page from reloading
    event.preventDefault();

    var search = formEntry.value.trim();
    var randomNumber = (Math.floor(Math.random() *20) +5000)
    console.log(randomNumber)
    if(search) {
        //randomizeRecipe()
        getRecipe(randomNumber);
        getMovie(search);
        formEntry.value = "";
    } else {
        alert("Movie not valid")
        //!TO REPLACE: This alert will need to be replaced with a modal
        formEntry.value = "";
    }
}

function historySelectHandler(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        var historicalRecipe = event.target.id;
        console.log("recipeId", historicalRecipe);
        getRecipeHistory(historicalRecipe);
    }
}
pastRecipe.addEventListener("click", historySelectHandler)

//Recipe fetch the 479101 in the url below is the recipe id number
// API URL: https://rapidapi.com/spoonacular/api/recipe-food-nutrition/
var getRecipe = function (randomNumber) {
    
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ randomNumber +"/information", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Recipe data", data);
                displayRecipe(data);
                pastRecipeBox(data);
            });
        } else {
            //!TO REPLACE: This alert will need to be replaced with a modal
            alert('Error: Recipe Not Found')
        }
    })
    .catch(err => {
        console.error(err);
    });
}

// get recipe based on past recipe button click
var getRecipeHistory = function (historicalRecipe) {
    
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ historicalRecipe +"/information", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Recipe data", data);
                displayRecipe(data);
                
            });
        } else {
            //!TO REPLACE: This alert will need to be replaced with a modal
            alert('Error: Recipe Not Found')
        }
    })
    .catch(err => {
        console.error(err);
    });
}    
    
//User enteres movie name and getMovie poster image. Search example Avengers Endgame
//API URL: https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative/
var getMovie = function (search) {
fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?s="+ search +"&r=json&page=1", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
    }
})
.then(response => {

    //check for movie
    
    
    if (response.ok) {
        response.json().then(function(data) {
            console.log("Movie data", data);
            displayMovieTitle(data);
            //checkIfOnNetflix(data);
            
        });
    } else {
        //!TO REPLACE: This alert will need to be replaced with a modal
        alert('Error: Movie Not Found')
    }
        
})
.catch(err => {
    console.error(err);
});
}

var displayMovieTitle = function(data) {
    
    movieTitle.textContent = data.Search[0].Title;
    movieParent.appendChild(movieTitle);

    moviePoster.setAttribute("src", data.Search[0].Poster);
    movieParent.appendChild(moviePoster);
};

var displayRecipe = function(data) {
    console.log("displayRecipe", data);
    
    recipeTitle.textContent = data.title;
    recipeTitleParent.appendChild(recipeTitle);

    recipeImage.setAttribute("src", data.image);
    image.appendChild(recipeImage);

    recipeLink.setAttribute("href", data.sourceUrl);
    recipeLink.setAttribute("target", "_blank");
    recipeLink.className = "show";
    linkList.appendChild(recipeLink);

    recipeDirections.textContent = data.instructions;
    recipeList.appendChild(recipeDirections);
    
}

var pastRecipeBox = function(data) {
    var combineHistory = JSON.parse(localStorage.getItem("pastHistoryArray"));
    if (combineHistory == null) combineHistory = [];
    var recipeObject = {
        key: "recipeTitle",
        value: data.title,
        id: data.id,
    }
    // localStorage.setItem("recipeObject", JSON.stringify(recipeObject));
    combineHistory.push(recipeObject);
    localStorage.setItem("pastHistoryArray", JSON.stringify(combineHistory));

    var recipeButton = document.createElement("button");
    recipeButton.textContent = data.title;
    recipeButton.className = "recipeH";
    recipeButton.id = data.id;
    pastRecipe.appendChild(recipeButton);
}



// This function displays admin's choice and historical recipe buttons
window.onload = () => {
    var loadRecipe = JSON.parse(localStorage.getItem("pastHistoryArray")) ?? [];
    for(var i=0; i<loadRecipe.length; i++) {
        var pullRecipeName = loadRecipe[i].value
        var pullRecipeButton = loadRecipe[i].id

        var recipeButton = document.createElement("button");
        recipeButton.textContent = pullRecipeName;
        recipeButton.className = "recipeH";
        recipeButton.id = pullRecipeButton;
        pastRecipe.appendChild(recipeButton);
    }
    fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?s=A Whisker Away&r=json&page=1", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
    }
})
.then(response => {

    //check for movie
    
    
    if (response.ok) {
        response.json().then(function(data) {
            console.log("Movie data", data);
            displayMovieTitle(data);
            //checkIfOnNetflix(data);
            
        });
    } else {
        //!TO REPLACE: This alert will need to be replaced with a modal
        alert('Error: Movie Not Found')
    }
        
})
.catch(err => {
    console.error(err);
});


fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ 5010 +"/information", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
    }
})
.then(response => {
    if (response.ok) {
        response.json().then(function(data) {
            console.log("Recipe data", data);
            displayRecipe(data);
            
        });
    } else {
        //!TO REPLACE: This alert will need to be replaced with a modal
        alert('Error: Recipe Not Found')
    }
})
.catch(err => {
    console.error(err);
});
}




submitButton.addEventListener("click", formSubmitHandler);
