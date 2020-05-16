// Topics Variable
var topics = ["adventure", "yoga pose", "forrest", "northern lights", "tattoos", "crystals", "guitars", "aliens", "game of thrones", "landscape", "moon", "space", "tarot", "meditation", "astronomy", "zodiac signs", "kristen wiig", "photography", "autumn", "fail", "ghost"];

//Functions

    // Function for adding a new topic button
	function renderButtons () {
		$(".buttons-view").empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("topic btn btn-default");
			newButton.attr("data-name", topics[i]);
			newButton.text(topics[i]);
			$(".buttons-view").append(newButton);
		}
	};

    // When a button is linked, the topic joins the variable topic array, which, when clicked, will pull ten images from giphy.com relating to that topic.
	$("#add-topic").on("click", function (event) {
		event.preventDefault();
		var topic = $("#topic-input").val().toLowerCase().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

	        if (response.data.length == 0) {
	        	alert("No Gifs found for topic");
	        }
			else if (topics.indexOf(topic) != -1) {
				alert("Topic already exists");
			}
			else {
				topics.push(topic);
				renderButtons();
			}

        });    
    });
    
    // When a button is clicked, and the ten giphy images are retrieved, they wil be displayed here in a div we create called "gifs-view"
    function displayGifs () {
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          //Clears the container for new content
          $(".gifs-view").empty();
          for (var i = 0; i < response.data.length; i++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

            //Pulls in the image rating information
          	var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

            //Pulls in the image Gif information
          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
          	imageDiv.attr("data-state", "still");
          	imageDiv.attr("data-name", topic);
          	imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
              
            //Adds the Rating and the images on the page
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
          }

        });
    };

    //When the Gif is clicked once, the image plays, and when it is clicked again, the image stops playing
    function playGif () {

        if ($(this).attr("data-state") == "still") {
            $(this).html("<img src'" + $(this).attr("data-animate") + "'>");
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).html("<img src='" + $(this).attr("data-still") + "'>");
            $(this).attr("data-state", "still");
        }
    };
    
    // When any of the topic buttons are clicked, they are going to run the displayGifs function
    $(document).on("click", ".topic", displayGifs);

    // Whem any of the Gifs are cicked, they are going to run the playGif function
    $(document).on("click", ".play", playGif);