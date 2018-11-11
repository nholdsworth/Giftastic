// Initial empty array to hold gifs
let gifs = [];
let buttonArea = $("#button-area");
let gifArea = $("#gif-area");
let addGifButton = $("#add-gif");

// This function renders a button based on user input
function renderButtons() {

    // clears the button area not sure I need this
    buttonArea.empty();

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
            // add a data attribute equal to the user input from the most recent push into the array variable named gifs  
            btn.attr("data-name", gifs[i]);
            // add text to the button based on user input
            btn.text(gifs[i]);
            // add the button to the #button-area
            buttonArea.append(btn);
        };

    };

};

// This function handles the event where the Gif-a-fy button is clicked
$(document).on("click", "#add-gif", function (event) {
    // prevents page from refreshing when the submit #gif-a-fy button is clicked
    event.preventDefault();
    // grab the input from the #gif-input
    let gifInput = $("#gif-input").val().trim();
    // the string from the input (gifInput) box is pushed into the empty array named gifs
    gifs.push(gifInput);
    // This calls the render buttons function 
    renderButtons();

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

        // this variable holds the entire JSON data object that we GET from the Giphy API
        let results = response.data;

        // for each time the button #get-gif button is clicked this loop will dynamically create...   
        for (var i = 0; i < results.length; i++) {

            // a new <div>
            let gifDiv = $("<div>");
            //  and a new <img>.
            let gifImg = $("<img>");

            // The <img> tag is given the src attribute set to the the unique url that matches the user input which, is stored in the QueryURL variable since this is the url of the image that we want.  
            gifImg.attr("src", results[i].images.fixed_height.url);

            // The image tag is then appended to the new div. 
            gifDiv.append(gifImg);

            // Finally the new div containing the <img> is prepended to the <div>. 
            gifArea.prepend(gifDiv);

            // Now we have a dynamically updating container for a gif to be displayed based on user input!
        };
    });
});

