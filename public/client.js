var socket = io.connect('http://192.168.80.1:5301');

socket.on('connect', function(data) {
      socket.emit('join', 'Hello server from client');
});

socket.on('thread', function(data) {
    $('.chatlogs').append(data);
	$(".bot:last-child .user-photo").append("<img alt='BodoLogo' src='assets/img/BodoLogo.png'/>");
	var scrollToThisElement = $(".chatlogs div:last-child");
	var position = scrollToThisElement.offset().top;
	$('.chatlogs').animate({scrollTop: position-20});
  });

// send the message to server
function sendToServer(){
			var message = $('#message').val();
			$("#message").val(" ");
			appendToBox(message);
			socket.emit('messages', message);
}

//Append the user message to the chatbox
function appendToBox(message){
	$(".chatlogs").append("<div class=\'chat user\' >"+
		"<div class=\'user-photo\' ><img alt=\'BodoLogo\' src=\'assets/img/UserLogo.png\'/></div>"+
			"<p class=\'chat-message\' >" + message + "</p>"+
		"</div>");
}