$(document)
		.ready(
				function() {
					$(document).keyup(function(e) {
						if (e.keyCode == 13) {
							registry();
						}
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

					$("#name").focus(function() {
						$("#errorMessageName").css("display", "none");
						$("#name").css("border-color", "#cccccc");
					});
					$("#name").blur(
							function() {
								var name = $("#name").val();
								if ($.trim(name) == "") {
									$("#name").css("border-color", "#ff0039");
									$("#errorMessageName").css("display",
											"inline");
									$("#errorMessageName").text("用户名不能为空");
									return;
								}
								$.ajax({
									type : "GET",
									url : "checkName",
									data : {
										"name" : name,
									},
									success : function(message) {
										if ("success" == message) {
											$("#name").css("border-color",
													"#3fb618");
										} else {
											$("#name").css("border-color",
													"#ff0039");
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
				});

function registry() {
	$("#email").trigger("blur");
	$("#name").trigger("blur");
	$("#password").trigger("blur");
	$("#confirmPassword").trigger("blur");

	if ($("#errorMessageEmail").css("display") == "inline") {
		$("#email").effect("highlight", [], 500);
	}
	if ($("#errorMessageName").css("display") == "inline") {
		$("#name").effect("highlight", [], 500);
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
			url : "registry",
			data : {
				"email" : $("#email").val(),
				"name" : $("#name").val(),
				"password" : $("#password").val(),
			},
			success : function(message) {
				if ("success" == message) {
					location.href = "/loginPage.html";
				}
			},
			error : function() {

			}
		});
	}
}