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
			location.href = "/loginPage.html";
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
	$(document).keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			if ($.trim($("#inputMessage").val()) == "") {
				$("#inputMessage").effect("highlight", [], 500);
			} else {
				sendMessage(roomId, name, $("#inputMessage").val(), 1);
			}
			$("#inputMessage").val("");
		}
	});
	$(window).bind('beforeunload', function() {
		disconnect();
	});

	connect(roomId);
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
						messageItem.effect("slide", {
							direction : "up"
						}, 300);
					} else if (message.type == 1) {
						var img = $("<img></img>")
								.attr("src", message.iconPath);
						var name = $("<div></div>").addClass("name").text(
								message.name);
						var icon = $("<div></div>").addClass("icon").append(
								img, name);
						var message = $("<div></div>").addClass("message").css(
								"background-color", message.backgroundColor)
								.text(message.content);
						var messageItem = $("<div></div>").addClass(
								"messageItem").append(icon, message);
						$(".messageContainer").prepend(messageItem);
						messageItem.effect("slide", {
							direction : "up"
						}, 300);
					}
				});
		sendMessage(roomId, name, name + "进入了房间", 2);
		$
				.ajax({
					type : "PUT",
					url : "rooms/" + roomId + "?name=" + name
							+ "&addOrRemoveAPelple=1",
					success : function(message) {
						console.debug(message);
					},
					error : function() {
					}
				});
	});
}

function sendMessage(chatRoomId, name, message, type) {
	stompClient.send("/app/chatRoom/" + chatRoomId, {}, JSON.stringify({
		'chatRoomId' : chatRoomId,
		'name' : name,
		'type' : type,
		'content' : message,
		'backgroundColor' : '',
	}));
}

function disconnect() {
	sendMessage(roomId, name, name + "离开了房间", 2);
	stompClient.disconnect();
	$.ajax({
		type : "PUT",
		url : "rooms/" + roomId + "?name=" + name + "&addOrRemoveAPelple=-1",
		success : function(message) {
			console.debug(message);
		},
		error : function() {
		}
	});
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
