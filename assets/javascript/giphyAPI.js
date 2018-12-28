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
            //Play audiotag2
            var audio2 = document.getElementById("audiotag2");
            audio2.volume = 0.6;
            audio2.play();

            // Build Giphy API search by defining term, api key, and chaining URL
            var term = $(this).attr("data-search");
            var apiKey = "WSY305l72MwB3JpnUG74hV5Fp85piPgx";
            //Api search + term + limit of 10 + api key
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&limit=10&api_key=" + apiKey;

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
                    gif.on("click", function () {
                        //Play audiotag3
                        var audio3 = document.getElementById("audiotag3");
                        var audio4 = document.getElementById("audiotag4");
                        audio3.volume = 0.6;
                        audio4.volume = 0.6;


                        //Create state variable for the playing state of the gif
                        var gifImg = $(this).attr("data-gifImg");

                        if (gifImg === "still") {
                            //If still, animate
                            $(this).attr("data-gifImg", "animate");
                            $(this).attr("src", $(this).attr("data-animate"));
                            audio3.play();
                        } else if (gifImg === "animate") {
                            //Make gif still
                            $(this).attr("data-gifImg", "still");
                            $(this).attr("src", $(this).attr("data-still"));
                            audio4.play();
                        }

                    });


                    //Append title rating and gif 
                    title.appendTo(gifDiv);
                    rating.appendTo(gifDiv);
                    gif.appendTo(gifDiv);

                    //Turn down the volume of the audio, play audiotag1
                    var audio = document.getElementById("audiotag1");
                    audio.volume = 0.4;
                    audio.play();

                    $("#mute").on("click", function (event) {
                        audio.pause();
                    });

                    $("#gifs").append(gifDiv);
                }
            });

        });
        //Append terms
        $("#terms").append(searchBtn);

    };
    //Added terms to buttons
    var addAllTerms = function () {
        for (var i = 0; i < terms.length; i++) {
            addBtn(terms[i]);
        }
    };

    //Event listener
    //Add gif On click function
    $("#add").on("click", function (event) {
        //Play audiotag2
        var audio5 = document.getElementById("audiotag5");
        audio5.volume = 0.6;
        audio5.play();
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