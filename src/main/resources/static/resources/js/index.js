function connect(chatRoomId) {
	var socket = new SockJS('/chatRoom');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/chatRoom/' + chatRoomId,
				function(message) {
					alert(JSON.parse(message.body).content);
				});
	});
}

function sendMessage(chatRoomId) {
	stompClient.send("/app/chatRoom/" + chatRoomId, {}, JSON.stringify({
		'chatRoomId' : chatRoomId,
		'name' : name,
		'content' : 'hehehheheheheheheh'
	}));
}

function disconnect() {
	stompClient.disconnect();
	console.log("Disconnected");
}

$(document).ready(function() {
	$.ajax({
		type : "GET",
		url : "currentUser",
		success : function(result) {
			console.debug(result);
			$("#name").text(result.name);
		},
		error : function() {
		}
	});
});

function logout() {
	$.ajax({
		type : "GET",
		url : "logout",
		success : function(message) {
			if ("success" == message) {
				console.log("logout");
				location.href = "/loginPage.html";
			} else {
			}
		},
		error : function() {

		}
	});
}

$(document).ready(function() {
	$(".chatroom").mouseenter(function() {
		$(this).animate({
			backgroundColor : '#404038',
			color:'#CCCC9F'
		});
		$(this).children('.title').animate({
			fontSize:'+=1'
		});
	});
	$(".chatroom").mouseleave(function() {
		$(this).animate({
			backgroundColor : '#33332D',
			color:'#FFF8E3'
		});
		$(this).children('.title').animate({
			fontSize:'-=1'
		});
	});
});