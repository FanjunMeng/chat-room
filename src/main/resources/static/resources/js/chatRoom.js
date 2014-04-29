var stompClient = null;
var roomId = null;
var name = null;

$(document).ready(function() {

	$(".messageContainer").css("height", $(window).height() - 200);
	$(window).resize(function() {
		$(".messageContainer").css("height", $(window).height() - 200);
	});

	var urlinfo = window.location.href;
	var len = urlinfo.length;
	var offset = urlinfo.indexOf("?");
	var newsidinfo = urlinfo.substr(offset, len)
	var newsids = newsidinfo.split("=");
	roomId = newsids[1];

	$.ajax({
		type : "GET",
		url : "currentUser",
		success : function(result) {
			console.debug(result);
			name = result.name;
			$("#name").text(result.name);
		},
		error : function() {
		}
	});

	$.ajax({
		type : "GET",
		url : "rooms/" + roomId,
		success : function(result) {
			console.debug(result);
			$("#roomTitle").text(result.title);
		},
		error : function() {
		}
	});

	connect(roomId);
});

$(window).unload(function() {
	disconnect();
	alert("Goodbye!");
});

function connect(chatRoomId) {
	var socket = new SockJS('/chatRoom');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/chatRoom/' + chatRoomId,
				function(message) {
					message = JSON.parse(message.body);
					if (message.type == 2) {
						var systemMessage = $("<div></div>").addClass(
								"systemMessage").text(
								"--------" + message.content + "--------");
						var messageItem = $("<div></div>").addClass(
								"messageItem").append(systemMessage);
						$(".messageContainer").prepend(messageItem);
					} else if (message.type == 1) {

					}
				});
		sendMessage(roomId, name + "进入了房间", 2);
	});
}

function sendMessage(chatRoomId, message, type) {
	stompClient.send("/app/chatRoom/" + chatRoomId, {}, JSON.stringify({
		'chatRoomId' : chatRoomId,
		'name' : "",
		'type' : type,
		'content' : message,
	}));
}

function disconnect() {
	stompClient.disconnect();
	console.log("Disconnected");
}

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
