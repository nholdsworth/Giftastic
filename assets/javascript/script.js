// Initial empty array to hold gifs
let gifs = ["Rodney Mullin", "Bam Margera", "Dolphin Flip", "Shaun White", "Jamie Thomas", "Chad Muska", "Andrew Reynolds", "Bob Burnquist", "Danny Way", "Eric Koston", "Daewon Song", "Mike Carroll", "Steve Caballero", "Lance Mountain", "Andy Macdonlad", "Nyjah Huston"];
let buttonArea = $("#button-area");
let gifArea = $("#gif-area");
let addGifButton = $("#add-gif");

// This function renders a button based on user input
function renderButtons() {

    // clears the button area not sure I need this
    // buttonArea.empty();

    for (let i = 0; i < gifs.length; i++) {
        // prevents empty buttons from being generated
        if (gifs[i] == "") {
            btn = false;

            // Here I want an else if statement to prevent duplicate buttons from being created.

        } else {
            // Dynamically create a button for each gif in the array
            let btn = $("<button>");
            // add a class of get-gif to buttons for reference in the #get-gif click handler
            btn.addClass("get-gif");
            btn.addClass("btn-light");
            btn.addClass("rounded");
            btn.addClass("shadow-lg");
            btn.addClass("btn-md");
            btn.addClass("m-1");

            // add a data attribute equal to the user input from the most recent push into the array variable named gifs  
            btn.attr("data-name", gifs[i]);
            // add text to the button based on user input
            btn.text(gifs[i]);
            // add the button to the #button-area
            buttonArea.append(btn);
        };

    };

};

renderButtons();

// This function handles the event where the Gif-a-fy button is clicked
$(document).on("click", "#add-gif", function (event) {
    // prevents page from refreshing when the submit #gif-a-fy button is clicked
    event.preventDefault();
    // grab the input from the #gif-input
    let gifInput = $("#gif-input").val().trim();
    // the string from the input (gifInput) box is pushed into the empty array named gifs
    gifs.push(gifInput);
    // This calls the render buttons function FIXME:I am trying to get the buttons to not all re-render on every click but it keeps saying indexOf not defined 
    // if (indexOf(gifs) === indexOf(gifInput)) {
    //     renderButtons();
    // };


});

// This click event handler function displays the users desired gifs on the page
$(document).on("click", ".get-gif", function (event) {

    let gifInput = $(this).attr("data-name");
    // This is a variable to reference the GIPHY search endpoint
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&api_key=x5YoKZ6izoDbGHgqjlmMUcaN8nf31oaa&limit=1";
    // making the using ajax to call the Giphy Image database
    $.ajax({
        // The ajax call always needs two arguments the url and a method (usually the method is GET)
        url: queryURL,
        method: "GET"
        // Giphy sends back a "promise which we then put into a variable named results"
    }).then(function (response) {

        // this results variable holds the entire JSON data object that we GET from the Giphy API
        let results = response.data;
        // console.log(results);

        // for each time the button #get-gif button is clicked this loop will dynamically create...   
        for (var i = 0; i < results.length; i++) {

            // a new <div>
            let gifDiv = $("<div>");
            gifDiv.addClass("m-4");
            //  and a new <img>.
            let gifImg = $("<img>");

            // The <img> tag is given the src attribute set to the the unique url that matches the user input which, is stored in the QueryURL variable since this is the url of the image that we want.  
            gifImg.attr({
                src: results[i].images.fixed_height_still.url,
                dataStill: results[i].images.fixed_height_still.url,
                dataAnimate: results[i].images.fixed_height.url,
                dataState: "still",
                class: "gif"
            });

            // The image tag is then appended to the new div. 
            gifDiv.append(gifImg);

            // Finally the new div containing the <img> is prepended to the <div>. 
            gifArea.prepend(gifDiv);

            // Now we have a dynamically updating container for a gif to be displayed based on user input!
        };
    });
});

// This click event handler is to change the gifs from still to moving
$(".gif").on("click", function () {

    let state = $(this).data("dataState");
    console.log(state);
});

// I could not get the buttons to not repeat yet and I could not get the gifs to change from still to animated when clicked.  I am going to try this tomorrow and resubmit.  I cannot figure out how to pull the dataState  out my my gifImg object in order to switch it on and on.  And I am still trying to figure out how to just add the last string pushed into the array for my render buttons function I think I have to use indexOf() in an if statement like if (indexOf([i])==)




