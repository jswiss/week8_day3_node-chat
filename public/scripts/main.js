console.log('yo!');

var socket = io();

$('#chat-form').submit(function(e) {
	e.preventDefault();
	var message = $('#message').val();
	var user    = $('#user').val();
	console.log(message);
	console.log(user);
	socket.emit('chat message', { usr: user, msg: message });
	$('#message').val('');
	$('.userbox').hide();
});

socket.on('chat message', function(userMessageObject) {
	console.log('hello!' + userMessageObject)
	console.log(userMessageObject.usr);
	console.log(userMessageObject.msg);
	addToPage(userMessageObject);
})

function addToPage(userMessageObject) {
	console.log(userMessageObject)
	var chatMessage = '<li><strong>' + userMessageObject.usr + '</strong>';
	chatMessage += '>> ' + userMessageObject.msg + '</li>';
	console.log(userMessageObject);
	$('#chat-messages').append(chatMessage);
}

// socket.on('chat message', function(msg) {
// 	$('#chat-messages').append(chatMessage);
// 	// $('<li>').text(msg));
// });

