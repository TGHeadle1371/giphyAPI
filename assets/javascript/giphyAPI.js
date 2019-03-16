require("dotenv").config();

// On ready
$(document).ready(function() {
    // Global Variables
    var topics = [
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
    var addBtn = function(search) {
        // Define searchBTN as a button element with set class and attr
        var searchBtn = $("<button>")
            .addClass("search btn btn-primary")
            .attr("data-search", search)
            .text(search);
        // on button click, run function
        searchBtn.on("click", function() {
            //Play audiotag2
            var audio2 = document.getElementById("audiotag2");
            audio2.volume = 0.6;
            audio2.play();

            // Build Giphy API search by defining topic, api key, and chaining URL
            var topic = $(this).attr("data-search");
            var apiKey = process.env.GIF_KEY;
            //Api search + topic + limit of 10 + api key
            var queryURL =
                "https://api.giphy.com/v1/gifs/search?q=" +
                topic +
                "&limit=10&api_key=" +
                apiKey;

            //Ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
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
                    gif.attr(
                        "data-still",
                        data[i].images.fixed_height_still.url
                    );
                    gif.attr("data-animate", data[i].images.fixed_height.url);

                    //Create gif on click play
                    gif.on("click", function() {
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

                    $("#gifs").append(gifDiv);
                }
                // When users click "save-name"
                $("#favoritesBtn").on("click", function(event) {
                    // This line prevents the page from refreshing when a user hits "enter".
                    event.preventDefault();

                    // Clear the HTML from the greeting header
                    $("#favorites").html("");

                    // Grab the user input
                    var favorites = "";
                    favorites = $("#topic-input")
                        .val()
                        .trim();
                    console.log(favorites);
                    // Clear absolutely everything stored in localStorage using localStorage.clear()
                    localStorage.clear();

                    // Store the username into localStorage using "localStorage.setItem"
                    localStorage.setItem("favorites", favorites);

                    // And display that name for the user using "localStorage.getItem"
                    $("#favorites").append(localStorage.getItem("favorites"));
                });

                // By default (upon load) show the name stored in localStorage using "localStorage.getItem"
                $("#greeting").text(localStorage.getItem("name"));
            });
        });
        //Append topics
        $("#topics").append(searchBtn);
    };
    //Added topics to buttons
    var addAllTopics = function() {
        for (var i = 0; i < topics.length; i++) {
            addBtn(topics[i]);
        }
    };

    //Event listener
    //Add gif On click function
    $("#add").on("click", function(event) {
        //Play audiotag2
        var audio5 = document.getElementById("audiotag5");
        audio5.volume = 0.6;
        audio5.play();
        //No refresh
        event.preventDefault();
        var topic = $("#topic-input")
            .val()
            .trim();

        if (topic.length > 0) {
            topics.push(topic);
            addBtn(topic);
        }
    });

    //Add the topics
    addAllTopics();
});
