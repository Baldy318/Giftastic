
var topics = ['Amy Poehler','Amy Schumer','Aziz Ansari','Bernie Mac','Betty White','Bill Marr','Cedric the Entertainer','Chelsea Handler','Chris Rock','Dave Chapelle', 'David Letterman','DL Hughley', 'Eddie Murpy', 'George Carlin','Issa Rae','Jerry Seinfeld','Jim Carrey','Jimmy Fallon','Jon Stewart','Julia Louis-Dreyfus','Kevin Hart','Lena Dunham','Louis C.K.','Martin Lawrence','Mindy Kaling', 'Richard Pryor','Ricky Gervais','Rodney Dangerfield', 'Sarah Silverman', 'Steve Martin','Taraji Henson','Tiffany Haddish','Tracee Ellis Ross', 'Wanda Sykes','Whoopi Goldberg','Will Smith','Yvonne Orji','Zach Galifianakis'];

var button;
var newTopic = ""; 


//To add new buttons from the topics array

var buttonGenerator = function (){

    // the previous div elements are emptied 
	 $("#gifbuttonsArea").empty();

     // loops through the array and creates buttons
	for(i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data",topics[i]);
		$("#gifbuttonsArea").append(button);
	};
}


// The user clicks on a generated button which results in 10 gifs. 
$("#gifbuttons").on("click", ".btn", function(){
  		var thing = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=&api_key=BpZqJnrYUaDiSPQJ35vdmmTTULuETwmX" + comedian + "&limit=10&rating=R&lang=en";

      $("gifButtons").show();
      
  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  		  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
						
							// Here is a div made for any comedian
	          	var topicDiv = $("<div>");
	 			
	      // Under every gif, this is where its rating will be displayed
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// This is used to create a distinction by coloring the borders around the gifs
	 			var topicImage = $("<img>").addClass("blueBorder");

	 			// To change the states of the gif (animate/still) 
	 			topicImage.attr("src", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-animate", results[i].images.fixed_height.url)
	 			topicImage.attr("data-state", "still")
	 			topicImage.addClass("gif");
	 			
	 			// The image is appended to the div
	 			topicDiv.append(topicImage);
	 			// The rating is appended to the div below the gif
	 			topicDiv.append(p); 			
	 			// new images will be placed at the beginning (top) of the containing gif area
	 			$("#gifArea").prepend(topicDiv);        
 			}
  		})
  })


// Upon clicking, the gif animates. Upon clicking again, it pauses.
$("#displayed-images").on("click", ".gif", function(event){
	event.preventDefault();
	
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// according to the current state gifs toggle between animate and still 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
   
//Prevents Default
$(".addGif").on("click", function(event){
	event.preventDefault();


	// sets inputted value to newTopic 
	newTopic = $("#topic-input").val();
	// new topic is added to the topics array 
	topics.push(newTopic);
	console.log(topics);
	// call the function that creates the new button
	buttonGenerator();
});



buttonGenerator();