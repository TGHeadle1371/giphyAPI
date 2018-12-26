// On ready
$(document).ready(function () {

    // Global Variables
    var terms = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];
    //Functions
    //Create variable that is a function
    var addBtn = function (search) {
        // Define searchBTN as a button element with set class and attr
        var searchBtn = $('<button>').addClass("search btn btn-primary").attr("data-search", search).text(search);
        // on button click, run function
        searchBtn.on("click", function () {
            // Build api search by defining term, api key, and chaining URL
            var term = $(this).attr("data-search");
            var apiKey = "WSY305l72MwB3JpnUG74hV5Fp85piPgx";
            //Api search + term + limit of 10 + api key
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&limit=10&api_key=" + apiKey;

            //Ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                //Log response
                console.log(response);

                //Empty gif div
                $("#gifs").empty();

                //Define data variable
                var data = response.data;

                //For loop through data
                for (var i = 0; i < data.length; i++) {
                    // Create div for gifs
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    //Create title
                    var title = $("<p>");
                    title.text("Title: " + data[i].title);

                    // Create rating paragraph
                    var rating = $("<p>");
                    //Set rating text
                    rating.text("Rating: " + data[i].rating);
                    
                    // Create gifs and set attr
                    var gif = $("<img>").addClass("gif");
                    gif.attr("src", data[i].images.fixed_height_still.url);
                    gif.attr("data-gifImg", "still");
                    gif.attr("data-still", data[i].images.fixed_height_still.url);
                    gif.attr("data-animate", data[i].images.fixed_height.url);

                    //Create gif on click play 
                    gif.on("click", function() {
                        //Create state variable for the playing state of the gif
                        var gifImg = $(this).attr("data-gifImg");

                        if (gifImg === "still") {
                            //If still, animate
                            $(this).attr("data-gifImg", "animate");
                            $(this).attr("src", $(this).attr("data-animate"));
                        } else if (gifImg === "animate") {
                            //Make gif still
                            $(this).attr("data-gifImg", "still");
                            $(this).attr("src", $(this).attr("data-still"));
                        }

                    });
                    

                    //Append title rating and gif 
                    title.appendTo(gifDiv);
                    rating.appendTo(gifDiv);
                    gif.appendTo(gifDiv);
                    
                    $("#gifs").append(gifDiv);
                }
            });

        });
        //Append terms
        $("#terms").append(searchBtn);

    };

    var addAllTerms = function () {
        for (var i = 0; i < terms.length; i++) {
            addBtn(terms[i]);
        }
    };

    //Event listener
    //Add gif On click function
    $("#add").on("click", function (event) {
        //No refresh
        event.preventDefault();
        var term = $("#term-input").val().trim();

        if (term.length > 0) {
            terms.push(term);
            addBtn(term);
        }
    });
    
    //Add the terms
    addAllTerms();
});