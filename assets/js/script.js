
//Recipe fetch the 479101 in the url below is the recipe id number
// API URL: https://rapidapi.com/spoonacular/api/recipe-food-nutrition/
var getRecipe = function () {
    
fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information", {
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

// getRecipe();



//User enteres movie name and getMovie poster image. Search example Avengers Endgame
//API URL: https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative/
var getMovie = function () {
fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		"x-rapidapi-key": "1bcdcffaf7msh8ee39bd8bb2df59p1dd6e0jsn113cf6355a62"
	}
})
.then(response => {

    if (response.ok) {
        response.json().then(function(data) {
            console.log("Movie data", data);
            checkIfOnNetflix(data);
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

// getMovie();

