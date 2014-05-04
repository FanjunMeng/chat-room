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
	$.ajax({
		type : "GET",
		url : "rooms",
		success : function(result) {
			console.debug(result);
			generateRooms(result);
		},
		error : function() {
		}
	});
	$("#dialog").dialog({
		dialogClass : "no-close",
		title : "创建聊天室",
		width : "450",
		height : "277",
		autoOpen : false,
		modal : true,
		show : {
			effect : "blind",
			duration : 500
		},
		hide : {
			effect : "blind",
			duration : 500
		},
		buttons : [ {
			text : "确定",
			class : "dialog-bottom-ok",
			click : function() {
				addRoom();
			}
		}, {
			text : "取消",
			class : "dialog-bottom-cancel",
			click : function() {
				$(this).dialog("close");
				initDialog();
			}
		} ],
	});
	$("#message").dialog({
		dialogClass : "no-close",
		title : "",
		width : "323",
		height : "184",
		autoOpen : false,
		modal : true,
		show : {
			effect : "blind",
			duration : 500
		},
		hide : {
			effect : "blind",
			duration : 500
		},
		buttons : [ {
			text : "确定",
			class : "dialog-bottom-ok",
			click : function() {
				$(this).dialog("close");
			}
		} ],
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 13) {
			addRoom();
		}
	});
	$("input").focus(function() {
		$("#errorMessage").css("display", "none");
		$("#title").css("border-color", "#cccccc");
		$("#capacity").css("border-color", "#cccccc");
	});
});

function generateRooms(rooms) {
	var roomNumber = rooms.length;
	for ( var i = 0; i < roomNumber; i++) {
		var title = $("<div></div>").addClass("title").text(rooms[i].title)
				.attr("onclick", "enterChatRoom(" + rooms[i].id + ");");
		var peopleNumber = $("<div></div>").addClass("peopleNumber").text(
				"人数：" + rooms[i].currentSize + "/" + rooms[i].capacity);
		var chatroom = $("<div></div>").addClass("chatroom").append(title,
				peopleNumber).attr("id", rooms[i].id);
		$(".content").append(chatroom);
	}

	for ( var i = 0; i < 16 - roomNumber; i++) {
		var addIconPart1 = $("<div></div>").addClass("addIconPart1").attr(
				"onclick", "openDialog();");
		var addIconPart2 = $("<div></div>").addClass("addIconPart2").attr(
				"onclick", "openDialog();");
		var chatroom = $("<div></div>").addClass("chatroom").append(
				addIconPart1).append(addIconPart2).attr("id", '-1');
		$(".content").append(chatroom);
	}

	if (roomNumber >= 16) {
		for ( var i = 0; i < 4 - (roomNumber % 4); i++) {
			var addIconPart1 = $("<div></div>").addClass("addIconPart1").attr(
					"onclick", "openDialog();");
			var addIconPart2 = $("<div></div>").addClass("addIconPart2").attr(
					"onclick", "openDialog();");
			var chatroom = $("<div></div>").addClass("chatroom").append(
					addIconPart1).append(addIconPart2).attr("id", '-1');
			$(".content").append(chatroom);
		}
	}

	$(".chatroom").mouseenter(function() {
		$(this).animate({
			backgroundColor : '#404038',
			color : '#CCCC9F'
		});
		$(this).children('.title').animate({
			fontSize : '+=1'
		});
		$(this).children('.addIconPart1').animate({
			borderBottomWidth : '+=2',
			height : '-=1'
		});
		$(this).children('.addIconPart2').animate({
			borderLeftWidth : '+=2'
		});
	});
	$(".chatroom").mouseleave(function() {
		$(this).animate({
			backgroundColor : '#33332D',
			color : '#FFF8E3'
		});
		$(this).children('.title').animate({
			fontSize : '-=1'
		});
		$(this).children('.addIconPart1').animate({
			borderBottomWidth : '-=2',
			height : '+=1'
		});
		$(this).children('.addIconPart2').animate({
			borderLeftWidth : '-=2'
		});
	});
}

function addRoom() {
	var title = $("#title").val();
	if (title == "") {
		$("#title").css("border-color", "#ff0039");
		$("#errorMessage").css("display", "inline");
		$("#errorMessage").text("请输入聊天室名称");
		return;
	}
	var capacity = $("#capacity").val();
	if (capacity == "") {
		$("#capacity").css("border-color", "#ff0039");
		$("#errorMessage").css("display", "inline");
		$("#errorMessage").text("请输入最大人数");
		return;
	}
	if (!$.isNumeric(capacity)) {
		$("#capacity").css("border-color", "#ff0039");
		$("#errorMessage").css("display", "inline");
		$("#errorMessage").text("请输入数字");
		return;
	}

	$.ajax({
		type : "POST",
		url : "rooms",
		data : {
			"title" : title,
			"capacity" : capacity
		},
		success : function(result) {
			console.log(result);
			if (result == "") {
				$("#title").css("border-color", "#ff0039");
				$("#errorMessage").css("display", "inline");
				$("#errorMessage").text("聊天室'" + $("#title").val() + "'已存在");
			} else {
				var title = $("<div></div>").addClass("title").text(
						result.title);
				var peopleNumber = $("<div></div>").addClass("peopleNumber")
						.text(
								"人数：" + result.currentSize + "/"
										+ result.capacity);
				$(".chatroom#-1:first").html("").append(title, peopleNumber)
						.attr("id", result.id);
				console.log($(".chatroom#-1:first").is(".chatroom#-1:first"));
				if (!$(".chatroom#-1:first").is(".chatroom#-1:first")) {
					for ( var i = 0; i < 4; i++) {
						var addIconPart1 = $("<div></div>").addClass(
								"addIconPart1")
								.attr("onclick", "openDialog();");
						var addIconPart2 = $("<div></div>").addClass(
								"addIconPart2")
								.attr("onclick", "openDialog();");
						var chatroom = $("<div></div>").addClass("chatroom")
								.append(addIconPart1).append(addIconPart2)
								.attr("id", '-1');
						$(".content").append(chatroom);
					}
				}
				$("#dialog").dialog("close");
				initDialog();
			}

		},
		error : function() {
		}
	});
}

function initDialog() {
	$("#title").val("");
	$("#capacity").val("");
	$("#errorMessage").css("display", "none");
	$("#title").css("border-color", "#cccccc");
	$("#capacity").css("border-color", "#cccccc");
}

function openDialog() {
	$("#dialog").dialog("open");
}

function enterChatRoom(roomId) {
	var canEnterChatRoom = false;
	$.ajax({
		type : "GET",
		url : "rooms/" + roomId,
		async : false,
		success : function(result) {
			if (result.currentSize < result.capacity) {
				canEnterChatRoom = true;
			}
		},
		error : function() {
		}
	});
	if (canEnterChatRoom) {
		window.open("/chatRoom.html?roomId=" + roomId);
	} else {
		$("#message").dialog("open");
	}
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
