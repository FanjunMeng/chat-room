function connect(chatRoomId) {
	var socket = new SockJS('/chatRoom');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/chatRoom/'+chatRoomId, function(message) {
			alert(JSON.parse(message.body).content);
		});
	});
}

function sendMessage(chatRoomId){
	stompClient.send("/app/chatRoom/"+chatRoomId, {}, JSON.stringify({ 'chatRoomId':chatRoomId,
																		'name': name,
																		'content':'hehehheheheheheheh' }));
}

function disconnect() {
    stompClient.disconnect();
    console.log("Disconnected");
}
