// Topcs Variable
var topics = ["adventure", "yoga pose", "forrest", "northern lights", "tattoos", "crystals", "guitars", "aliens", "game of thrones", "landscape", "moon", "space", "tarot", "meditation", "astronomy", "zodiac signs", "kristen wiig", "photography", "autumn", "fail", "ghost"];

//Functions

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