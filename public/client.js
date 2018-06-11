const witURL = 'https://api.wit.ai/message';
const accessToken = 'Z2JF7K3KMJYQZKKWPQPH22N4OPRSZCCN';

// send the message to server
function sendToServer(){
		var message = $('#message').val();
		$("#message").val(" ");
		appendUserMsgToBox(message);
		$.ajax({
			url: witURL,
			data: {
				'q': message,
				'access_token' : accessToken
			},
			dataType: 'jsonp',
			method: 'GET',
			success: function(response) {
				console.log("success!", response);
				var result = response;		
				var entities = JSON.stringify(result);
				var object = result.entities
				var objectVal = Object.values(object)[0];
				var responseToClient = "";
				if (Object.values(object).length == 0){
					responseToClient = "Auf diese Frage kann keine Antwort gefunden werden";
				}else{
					if (objectVal[0].confidence <= 0.6) {
						responseToClient = "Bitte spezifiere deine Frage.Es konnte keine richtige Antwort gefunden werden!";
				}else{
					var responseWitAI = objectVal[0].value
					responseToClient = responseWitAI;
					}
				}
				appendBotMsgToBox(responseToClient);
				scrollToBotMsg();
			}
		});
}

//Append the user message to the chatbox
function appendUserMsgToBox(message){
	$(".chatlogs").append("<div class=\'chat user\' >"+
		"<div class=\'user-photo\' ><img alt=\'BodoLogo\' src=\'assets/img/UserLogo.png\'/></div>"+
			"<p class=\'chat-message\' >" + message + "</p>"+
		"</div>");
}

//Append the bot message to the chatbox
function appendBotMsgToBox(message){
	$(".chatlogs").append("<div class=\'chat bot\' ><div class=\'user-photo\'><img alt=\'BodoLogo\' src=\'assets/img/BodoLogo.png\'/></div>"+
	"<p class=\'chat-message\' >" + message +"</p></div>");
}

// scroll to the last message of the bot
function scrollToBotMsg(){
	var scrollToThisElement = $(".chatlogs div:last-child");
	var position = scrollToThisElement.offset().top;
	$('.chatlogs').animate({scrollTop: position-20});
}


