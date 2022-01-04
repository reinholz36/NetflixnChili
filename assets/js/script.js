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

var formSubmitHandler = function(event) {
    event.preventDefault();
    var search = formEntry.value.trim();
    //admin selected recipes array that have at least a working title, photo, directions, and link
    var randomNumber = _.sample([33600, 33034, 33045, 33047, 33049, 33055, 31250, 24573, 36003, 8001, 5006, 450000, 450443]);

    if(!search || search === "") {
        swal("Movie Not Found", "Try again! Example entry, The Avengers", "error");
    } else {
        getRecipe(randomNumber);
        getMovie(search);
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
            swal("Recipe not found", "Please search for movie again!", "error");
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
            swal("Recipe no longer found in database", "Try a different recipe!", "error");
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
        });
    } else {
        swal("Movie Not Found", "Try again! Example entry, The Avengers", "error");
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
        swal("Movie no longer found in database", "Try searching for a different movie!", "error");
    }
        
})
.catch(err => {
    console.error(err);
});

//admin's default recipe id 4444
fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ 4444 +"/information", {
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
        swal("Recipe no longer found in database", "Try searching for a different movie to pull a different recipe!", "error");
    }
})
.catch(err => {
    console.error(err);
});
}




submitButton.addEventListener("click", formSubmitHandler);
