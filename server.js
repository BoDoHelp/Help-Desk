var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'public/index.html'));
  res.setHeader('content-type', 'text/html');
});

app.use(express.static('public'));

const hostname = '192.168.80.1';
//const hostname = '127.0.0.1';
const port = 5301;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  	});

  	client.on('messages', function(data){
		console.log("date"+data);
		const clientAPI = new Wit({accessToken});
		interactive(clientAPI);
		clientAPI.message(data, {})
		.then((responseAPI) => {
			var result = responseAPI;		
			var entities = JSON.stringify(result);
			var object = result.entities
			var objectVal = Object.values(object)[0];
			var responseToClient = "";
			//console.log(objectVal);
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
			var currentTime = new Date();
			var currentHour = currentTime.getUTCHours();
			var currentMin = currentTime.getUTCMinutes();
			client.emit('thread', '<div class=\'chat bot\' ><div class=\'user-photo\'></div><p class=\'chat-message\' >' + responseToClient +'</p></div>');
			return;
		}).catch(console.error);
  	});
});

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = 'Z2JF7K3KMJYQZKKWPQPH22N4OPRSZCCN';







