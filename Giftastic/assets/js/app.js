$(document).ready(function(){

var topicButtons = ['Amy Poehler','Amy Schumer','Aziz Ansari','Bernie Mac','Betty White','Bill Marr','Cedric the Entertainer','Chelsea Handler','Chris Rock','Dave Chapelle', 'David Letterman','DL Hughley', 'Eddie Murpy', 'George Carlin','Issa Rae','Jerry Seinfeld','Jim Carrey','Jimmy Fallon','Jon Stewart','Julia Louis-Dreyfus','Kevin Hart','Lena Dunham','Louis C.K.','Martin Lawrence','Mindy Kaling', 'Richard Pryor','Ricky Gervais','Rodney Dangerfield', 'Sarah Silverman', 'Steve Martin','Taraji Henson','Tiffany Haddish','Tracee Ellis Ross', 'Wanda Sykes','Whoopi Goldberg','Will Smith','Yvonne Orji','Zach Galifianakis'];


//To add new buttons from the topics array

function displayImg(){

	$("#display-images").empty();
	var input = $(this).attr("data-name");
	var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=BpZqJnrYUaDiSPQJ35vdmmTTULuETwmX";

	$.ajax({
  		url: queryURL,
  		method: "GET" 
    	}).done(function(response){
  		  			
			for(var i = 0; i < limit; i++) {    

                var topicDiv = $("<div>");
                topicDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                topicDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                topicDiv.append(pRating)

                $("#display-images").append(topicDiv);
            }
        });
    }

    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var j = 0; j < topicButtons.length; j++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topicButtons[j]); 
            newButton.text(topicButtons[j]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        topicButtons.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);

});