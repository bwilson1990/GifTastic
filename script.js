var animalButtons = ["chinchilla", "hamster", "bunny", "mouse", "rat"];
var newButton;
var animalImage;

// button generator
function generateButton(title) {
    newButton = $('<button class="animal-button" data-animal="' + title + '">').text(title);
    $("#button-holder").append(newButton);
};

for (var i = 0; i < animalButtons.length; i++) {
    generateButton(animalButtons[i]);
};


// listening for clicks on add-button id
$("#add-button").on("click", function() {
    var title = $("#button-text").val();
    generateButton(title);
});

// This .on("click") function will trigger the AJAX Call
$("#button-holder").on("click", ".animal-button", function(event) {
    $(".gifs-appear-here").html("");
    var animal = $(this).attr("data-animal");
    
    // API URL to Giphy.com with API Key
    var queryURL = "api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=tOotoZZfy7LUygoZTqmja2tWOg5Q1qlu&limit=10";

    //AJAX
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var animalDiv = $('<div class="animal-gif-class">');
            // animalDiv = $("<hr>")
            var p = $("<p>").text("Rating: " + results[i].rating);
            animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr("alt", results[i].title);

                animalDiv.append(p);
                animalDiv.append(animalImage);
            
            $("#gifs-appear-here").prepend(animalDiv);
            
        };

    }); // end of AJAX function

}); // end of button-holder function
