$(document).ready(function(){

    var tvShows = ["Jane the Virgin", "Breaking Bad", "Stranger Things", "Mindhunter", "White Collar", "Friends", "Justified", "Seinfeld", "Firefly", "Curb Your Enthusiasm"];
    console.log(tvShows);

    function displayTvShow(){

        $("#gifs-appear-here").empty();
        
        var x = $(this).data("search");
	    console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results=response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var newImg = $("<img>");
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;

                newImg.addClass("tvGiphy");
                newImg.attr("src", staticSrc);
                newImg.attr("data-name", tvShows[i]);
                newImg.attr("data-state", "still");
        	    newImg.attr("data-still", staticSrc);
        	    newImg.attr("data-animate", defaultAnimatedSrc);
                gifDiv.append(p);
                gifDiv.append(newImg);
                $("#gifs-appear-here").prepend(gifDiv);
            }
        })

    }
    $("#add-show").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var tvShow = $("#tv-input").val().trim();
    
        // Adding the movie from the textbox to our array
        tvShows.push(tvShow);
        console.log(tvShows);
        $("#tv-input").val('');
        renderButtons();
    
    });

    function renderButtons() {

        $("#tv-view").empty();
    
        // Looping through the array of shows
        for (var i = 0; i < tvShows.length; i++) {
    
            var a = $('<button class="btn btn-primary">');//generate button for each array item
    
            a.addClass("tv-show");// Adding a class
            a.attr("id", "show");
            a.attr("data-search", tvShows[i]);// Adding a data-attribute with value of movie at index i
            // Providing the button's text with a value of the movie at index i
            a.text(tvShows[i]);
            // Adding the button to the HTML
            $("#tv-view").append(a);
    
            
    
        }
    }
    renderButtons();

    $(document).on("click", "#show", displayTvShow);

    $(document).on("click", ".tvGiphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

})