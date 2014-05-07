var name;

var colors = new Array("#E51400", "#339933", "#1BA1E2", "#F09609", "#8CBF26",
		"#00ABA9", "#FF0097", "#E671B8", "#996600", " #A200FF");
var colorIndex1 = 0;
var colorIndex2 = 0;
var startIndex1 = 0;
var startIndex2 = 0;

$(document)
		.ready(
				function() {
					$.ajax({
						type : "GET",
						url : "currentUser",
						success : function(result) {
							console.debug(result);
							name = result.name;
							$("#name").text(result.name);
							if (!result.admin) {
								location.href = "/loginPage.html";
							}
						},
						error : function() {
							location.href = "/loginPage.html";
						}
					});
					getUsers();
					getRooms();
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
					$("#addUserDialog").dialog({
						dialogClass : "no-close",
						title : "增加用户",
						width : "450",
						height : "480",
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
								addUser();
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
					$("#email").focus(function() {
						$("#errorMessageEmail").css("display", "none");
						$("#email").css("border-color", "#cccccc");
					});
					$("#email")
							.blur(
									function() {
										var email = $("#email").val();
										if ($.trim(email) == "") {
											$("#email").css("border-color",
													"#ff0039");
											$("#errorMessageEmail").css(
													"display", "inline");
											$("#errorMessageEmail").text(
													"邮箱不能为空");
											return;
										}
										if (!email
												.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
											$("#email").css("border-color",
													"#ff0039");
											$("#errorMessageEmail").css(
													"display", "inline");
											$("#errorMessageEmail").text(
													"邮箱格式不正确");
										}
										$.ajax({
											type : "GET",
											url : "checkEmail",
											data : {
												"email" : email,
											},
											success : function(message) {
												if ("success" == message) {
													$("#email").css(
															"border-color",
															"#3fb618");
												} else {
													$("#email").css(
															"border-color",
															"#ff0039");
													$("#errorMessageEmail")
															.css("display",
																	"inline");
													$("#errorMessageEmail")
															.text("邮箱已存在");
												}
											},
											error : function() {

											}
										});
									});

					$("#nameForAdd").focus(function() {
						$("#errorMessageName").css("display", "none");
						$("#nameForAdd").css("border-color", "#cccccc");
					});
					$("#nameForAdd").blur(
							function() {
								var nameForAdd = $("#nameForAdd").val();
								if ($.trim(nameForAdd) == "") {
									$("#nameForAdd").css("border-color",
											"#ff0039");
									$("#errorMessageName").css("display",
											"inline");
									$("#errorMessageName").text("用户名不能为空");
									return;
								}
								$.ajax({
									type : "GET",
									url : "checkName",
									data : {
										"name" : nameForAdd,
									},
									success : function(message) {
										if ("success" == message) {
											$("#nameForAdd").css(
													"border-color", "#3fb618");
										} else {
											$("#nameForAdd").css(
													"border-color", "#ff0039");
											$("#errorMessageName").css(
													"display", "inline");
											$("#errorMessageName").text(
													"用户名已存在");
										}
									},
									error : function() {

									}
								});
							});

					$("#password").focus(function() {
						$("#errorMessagePassword").css("display", "none");
						$("#password").css("border-color", "#cccccc");
					});
					$("#password").blur(
							function() {
								var password = $("#password").val();
								if ($.trim(password) == "") {
									$("#password").css("border-color",
											"#ff0039");
									$("#errorMessagePassword").css("display",
											"inline");
									$("#errorMessagePassword").text("密码不能为空");
									return;
								}
								$("#password").css("border-color", "#3fb618");
							});

					$("#confirmPassword").focus(
							function() {
								$("#errorMessageConfirmPassword").css(
										"display", "none");
								$("#confirmPassword").css("border-color",
										"#cccccc");
							});
					$("#confirmPassword").blur(
							function() {
								var confirmPassword = $("#confirmPassword")
										.val();
								if ($.trim(confirmPassword) == "") {
									$("#confirmPassword").css("border-color",
											"#ff0039");
									$("#errorMessageConfirmPassword").css(
											"display", "inline");
									$("#errorMessageConfirmPassword").text(
											"确认密码不能为空");
									return;
								}
								if ($("#password").val() != $(
										"#confirmPassword").val()) {
									$("#confirmPassword").css("border-color",
											"#ff0039");
									$("#errorMessageConfirmPassword").css(
											"display", "inline");
									$("#errorMessageConfirmPassword").text(
											"两次输入的密码不一致");
									return;
								}
								$("#confirmPassword").css("border-color",
										"#3fb618");
							});
					$(document).keyup(function(e) {
						if (e.keyCode == 13) {
						}
					});
					$("h1").click(function() {
						$(this).next(".subContent").toggle("blind", {}, 400);
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

function getUsers() {
	$.ajax({
		type : "GET",
		url : "users",
		data : {
			"startIndex" : startIndex1
		},
		success : function(result) {
			console.debug(result);
			if (result.length == 0) {
				$("#getMoreUsers").text("没有更多了");
			}
			for ( var i = 0; i < result.length; i++) {
				var img = $("<img></img>").attr("width", "50px").attr("src",
						result[i].iconPath);
				var td1 = $("<td></td>").append(img);
				var td2 = $("<td></td>").text(result[i].name);
				var td3 = $("<td></td>").text(result[i].email);
				var td4 = $("<td></td>").text(result[i].admin ? "是" : "否");
				var deleteUser = $("<a></a>").attr("href",
						"javascript:deleteUser('" + result[i].name + "')");
				if (result[i].name != 'admin' && result[i].name != name) {
					var deleteImg = $("<img></img>").attr("width", "40px")
							.attr("src", "resources/img/delete.png");
					deleteUser.append(deleteImg);
				}
				var td5 = $("<td></td>").append(deleteUser);
				var tr = $("<tr></tr>").append(td1, td2, td3, td4, td5).css(
						"background-color", colors[colorIndex1]).css("color",
						"#FFFFFF")
						.attr("id", "usersTableTrId" + result[i].name);
				colorIndex1 = (++colorIndex1) % 10;
				$("#usersTable tbody").append(tr);
			}
			startIndex1 += result.length;
		},
		error : function() {
			location.href = "/loginPage.html";
		}
	});
}

function deleteUser(name) {
	$.ajax({
		type : "DELETE",
		url : "users/" + name,
		success : function(message) {
			if ("success" == message) {
				$("#usersTableTrId" + name).remove();
			} else {
			}
		},
		error : function() {

		}
	});
}

function openAddUserDialog() {
	$("#addUserDialog").dialog("open");
}

function addUser() {
	$("#email").trigger("blur");
	$("#nameForAdd").trigger("blur");
	$("#password").trigger("blur");
	$("#confirmPassword").trigger("blur");

	if ($("#errorMessageEmail").css("display") == "inline") {
		$("#email").effect("highlight", [], 500);
	}
	if ($("#errorMessageName").css("display") == "inline") {
		$("#nameForAdd").effect("highlight", [], 500);
	}
	if ($("#errorMessagePassword").css("display") == "inline") {
		$("#password").effect("highlight", [], 500);
	}
	if ($("#errorMessageConfirmPassword").css("display") == "inline") {
		$("#confirmPassword").effect("highlight", [], 500);
	}
	if ($("#errorMessageEmail").css("display") == "none"
			&& $("#errorMessageName").css("display") == "none"
			&& $("#errorMessagePassword").css("display") == "none"
			&& $("#errorMessageConfirmPassword").css("display") == "none") {
		$.ajax({
			type : "POST",
			url : "users/" + $("#nameForAdd").val(),
			data : {
				"email" : $("#email").val(),
				"name" : $("#nameForAdd").val(),
				"password" : $("#password").val(),
				"isAdmin" : $("input[type='radio']:checked").val()
			},
			success : function(message) {
				if ("success" == message) {
					var img = $("<img></img>").attr("width", "50px").attr(
							"src", "resources/img/default.png");
					var td1 = $("<td></td>").append(img);
					var td2 = $("<td></td>").text($("#nameForAdd").val());
					var td3 = $("<td></td>").text($("#email").val());
					if ($("input[type='radio']:checked").val() == "false") {
						var td4 = $("<td></td>").text("否");
					} else {
						var td4 = $("<td></td>").text("是");
					}
					var deleteUser = $("<a></a>").attr(
							"href",
							"javascript:deleteUser('" + $("#nameForAdd").val()
									+ "')");
					var deleteImg = $("<img></img>").attr("width", "40px")
							.attr("src", "resources/img/delete.png");
					deleteUser.append(deleteImg);
					var td5 = $("<td></td>").append(deleteUser);
					var tr = $("<tr></tr>").append(td1, td2, td3, td4, td5)
							.css("background-color", colors[colorIndex1]).css(
									"color", "#FFFFFF");
					colorIndex1 = (++colorIndex1) % 10;
					$("#usersTable tbody").append(tr);
					$("#addUserDialog").dialog("close");
					initDialog();
				}
			},
			error : function() {

			}
		});
	}
}

function initDialog() {
	$("#errorMessageEmail").css("display", "none");
	$("#email").css("border-color", "#cccccc");
	$("#email").val("");
	$("#errorMessageName").css("display", "none");
	$("#nameForAdd").css("border-color", "#cccccc");
	$("#nameForAdd").val("");
	$("#errorMessagePassword").css("display", "none");
	$("#password").css("border-color", "#cccccc");
	$("#password").val("");
	$("#errorMessageConfirmPassword").css("display", "none");
	$("#confirmPassword").css("border-color", "#cccccc");
	$("#confirmPassword").val("");
}

function getRooms() {
	$.ajax({
		type : "GET",
		url : "roomsForAdmin",
		data : {
			"startIndex" : startIndex2
		},
		success : function(result) {
			console.debug(result);
			if (result.length == 0) {
				$("#getMoreRooms").text("没有更多了");
			}
			for ( var i = 0; i < result.length; i++) {
				var td1 = $("<td></td>").text(result[i].title);
				var td2 = $("<td></td>").text(result[i].currentSize);
				var td3 = $("<td></td>").text(result[i].capacity);
				var deleteRoom = $("<a></a>").attr("href",
						"javascript:deleteRoom('" + result[i].id + "')");
				var deleteImg = $("<img></img>").attr("width", "40px").attr(
						"src", "resources/img/delete.png");
				deleteRoom.append(deleteImg);
				var td4 = $("<td></td>").append(deleteRoom);
				var tr = $("<tr></tr>").append(td1, td2, td3, td4).css(
						"background-color", colors[colorIndex2]).css("color",
						"#FFFFFF").attr("id", "roomsTableTrId" + result[i].id);
				colorIndex2 = (++colorIndex2) % 10;
				$("#roomsTable tbody").append(tr);
			}
			startIndex2 += result.length;
		},
		error : function() {
			location.href = "/loginPage.html";
		}
	});
}

function deleteRoom(id) {
	$.ajax({
		type : "DELETE",
		url : "rooms/" + id,
		success : function(message) {
			if ("success" == message) {
				$("#roomsTableTrId" + id).remove();
			} else {
			}
		},
		error : function() {

		}
	});
}
