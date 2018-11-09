// Initial empty array to hold gifs
let gifs = [];
let buttonArea = $("#button-area");
let gifArea = $("#gif-area");
let addGifButton = $("#add-gif");

// This function re-renders the HTML to display the gifs the user wants to see
function displayGifs() {
    
    // TODO:I don't really understand this I need some 'splanation!
    let gifInput = $(this).attr("data-name");
    // This is a variable to reference the GIPHY search endpoint
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "api_key=x5YoKZ6izoDbGHgqjlmMUcaN8nf31oaa";

    console.log("queryURL", queryURL);
    console.log($.ajax);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // let text = JSON.stringify(response);
        console.log(response);

    });
};
// This click event handler function displays the users desired gifs on the page
$(document).on("click", ".get-gif", function(event){
        // TODO:I don't really understand this I need some 'splanation!
        let gifInput = $(this).attr("data-name");
        // This is a variable to reference the GIPHY search endpoint
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&api_key=x5YoKZ6izoDbGHgqjlmMUcaN8nf31oaa";
    
        console.log("queryURL", queryURL);
        console.log($.ajax);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // let text = JSON.stringify(response);
            console.log(response);
    
        });
});


// This function renders a button based on user input
function renderButtons() {

    buttonArea.empty();

    for (let i = 0; i < gifs.length;i++) {
        // Dynamically create a button for each gif in the array
        let btn = $("<button>");
        // add a class of get-gif to buttons TODO:reference this class for event handler
        btn.addClass("get-gif");
        // add a data attribute TODO:I think this is related to line 11 that I don't get...
        btn.attr("data-name", gifs[i]);
        // add text to the button based on user input
        btn.text(gifs[i]);
        // add the button to the #button-area
        buttonArea.append(btn);

    }

}

// This function handles the event where the Gif-a-fy button is clicked
$(document).on("click", "#add-gif", function(event){
    // prevents page from refreshing when the submit #gif-a-fy button is clicked
    event.preventDefault();
    // grab the input from the #gif-input
    let gifInput = $("#gif-input").val().trim();
    // the string from the input (gifInput) box is pushed into the empty array named gifs
    gifs.push(gifInput);
    // This calls the render buttons function 
    renderButtons();

});