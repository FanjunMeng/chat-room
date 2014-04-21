$(document).ready(function() {
	$("input").focus(function() {
		$("#errorMessage").css("display", "none");
		$("#name").css("border-color", "#cccccc");
		$("#password").css("border-color", "#cccccc");
	});
});

$(document).ready(function() {
	$(document).keyup(function(e) {
		if(e.keyCode == 13){
			login();
		}
	});
});

function login() {
	$("#name").css("border-color", "#cccccc");
	$("#password").css("border-color", "#cccccc");
	var name = $("#name").val();
	var password = $("#password").val();
	$.ajax({
		type : "GET",
		url : "login",
		data : {
			"name" : name,
			"password" : password
		},
		success : function(message) {
			if ("success" == message) {
				location.href = "/";
			} else if ("error1" == message) {
				$("#name").css("border-color", "#ff0039");
				$("#errorMessage").css("display", "inline");
				$("#errorMessage").text("用户名或邮箱不存在");
			} else if ("error2" == message) {
				$("#password").css("border-color", "#ff0039");
				$("#errorMessage").css("display", "inline");
				$("#errorMessage").text("密码错误");
			}
		},
		error : function() {

		}
	});
}