var socket = io.connect();

var is_play = false;

function playSound() {
	var audioElement = document.getElementById("audioElement");
	var register = null;

	if(!is_play) {
		audioElement.play();
		play = true;

		register = setInterval(function(){ 
			var currentTime = audioElement.currentTime;
			console.log(currentTime);
			socket.emit('soundTime', currentTime);
		}, 1000);
	} else {
		audioElement.pause();
		audioElement.currentTime = 0;
		play = false;
		clearInterval(register); 
	}
}

socket.on('soundTime', function(data) {
	console.log(data);
});

/*

function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}
function sentMessage() {
	if ($('#messageInput').val() != "") 
	{
		socket.emit('message', $('#messageInput').val());
		addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}
function setPseudo() {
	if ($("#pseudoInput").val() != "")
	{
		socket.emit('setPseudo', $("#pseudoInput").val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}
socket.on('message', function(data) {
});
socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo']);
});
*/
/**
 * Cuando esto se cargar apenas la pantalla este lista
 */
$(function() {
	$("#playMusic").click(function() {
		playSound();
	});

});