var jcrop_api;
var boundx;
var boundy;
var name;

var x, y, w, h;

$(document).ready(
		function() {
			$("#oldPassword").focus(function() {
				$("#oldPassword").css("border-color", "#cccccc");
				$("#errorMessageOldPassword").css("display", "none");
			});
			$("#newPassword").focus(function() {
				$("#newPassword").css("border-color", "#cccccc");
				$("#errorMessageNewPassword").css("display", "none");
			});
			$("#newPasswordConfirm").focus(function() {
				$("#newPasswordConfirm").css("border-color", "#cccccc");
				$("#errorMessageNewPasswordConfirm").css("display", "none");
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
			$.ajax({
				type : "GET",
				url : "currentUser",
				success : function(result) {
					console.debug(result);
					name = result.name;
					$("#name").text(result.name);
					$(".currentIcon img").attr("src", result.iconPath);
					$("#iconUpload")
							.uploadify(
									{
										formData : {
											'name' : name
										},
										fileObjName : 'file',
										buttonText : '选择图片',
										fileTypeExts : '*.gif; *.jpg; *.png',
										height : 30,
										swf : 'resources/css/uploadify.swf',
										uploader : '/iconUpload',
										width : 120,
										onUploadSuccess : function(file, data,
												response) {
											console.log(data);
											$(".previewIcon img").attr("src",
													data);
											$(".uploadedIcon").html("");
											var img = $("<img></img>").attr(
													"width", "600px").attr(
													"src", data).attr("id",
													"target");
											$(".uploadedIcon").append(img);
											$('#target').Jcrop({
												onChange : updatePreview,
												onSelect : updatePreview,
												aspectRatio : 1 / 1,
											}, function() {
												// Use the API to get the real
												// image size
												var bounds = this.getBounds();
												boundx = bounds[0];
												boundy = bounds[1];
												// Store the API in the
												// jcrop_api variable
												jcrop_api = this;

												// Move the preview into the
												// jcrop container for css
												// positioning
												// $preview.appendTo(jcrop_api.ui.holder);
											});
										}
									});
					$(".uploadify-button").css("width", "60px");

				},
				error : function() {
					location.href = "/loginPage.html";
				}
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 13) {
				}
			});
			$("h1").click(function() {
				$(this).next(".subContent").toggle("blind", {}, 400);
			});
		});

function updatePreview(c) {
	x = c.x;
	y = c.y;
	w = c.w;
	h = c.h;

	if (parseInt(c.w) > 0) {
		var rx = 50 / c.w;
		var ry = 50 / c.h;

		$(".previewIcon img").css({
			width : Math.round(rx * boundx) + 'px',
			height : Math.round(ry * boundy) + 'px',
			marginLeft : '-' + Math.round(rx * c.x) + 'px',
			marginTop : '-' + Math.round(ry * c.y) + 'px'
		});
	}
};

function cutIcon() {
	$.ajax({
		type : "POST",
		url : "cutIcon",
		data : {
			"name" : name,
			"x" : x,
			"y" : y,
			"w" : w,
			"h" : h
		},
		success : function(message) {
			if ("success" == message) {
				$.ajax({
					type : "GET",
					url : "currentUser",
					success : function(result) {
						console.debug(result);
						$(".currentIcon img").attr("src", result.iconPath);
					},
					error : function() {
					}
				});
				$("#message div").text("头像修改成功");
				$("#message").dialog("open");
			} else {

			}
		},
		error : function() {

		}
	});
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

function changePassword() {
	var check = true;
	var oldPassword = $("#oldPassword").val();
	var newPassword = $("#newPassword").val();
	var newPasswordConfirm = $("#newPasswordConfirm").val();
	if ($.trim(oldPassword) == "") {
		check = false;
		$("#oldPassword").css("border-color", "#ff0039");
		$("#errorMessageOldPassword").text("原密码不能为空");
		$("#errorMessageOldPassword").css("display", "inline");
	}
	if ($.trim(newPassword) == "") {
		check = false;
		$("#newPassword").css("border-color", "#ff0039");
		$("#errorMessageNewPassword").text("新密码不能为空");
		$("#errorMessageNewPassword").css("display", "inline");
	}
	if ($.trim(newPasswordConfirm) == "") {
		check = false;
		$("#newPasswordConfirm").css("border-color", "#ff0039")
		$("#errorMessageNewPasswordConfirm").text("新密码确认不能为空");
		$("#errorMessageNewPasswordConfirm").css("display", "inline");
	}
	if (newPassword != newPasswordConfirm) {
		check = false;
		$("#newPasswordConfirm").css("border-color", "#ff0039")
		$("#errorMessageNewPasswordConfirm").text("输入密码不一致");
		$("#errorMessageNewPasswordConfirm").css("display", "inline");
	}

	if (!check) {
		return;
	}

	$.ajax({
		type : "POST",
		url : "changePassword",
		data : {
			"name" : name,
			"oldPassword" : oldPassword,
			"newPassword" : newPassword
		},
		success : function(message) {
			if ("success" == message) {
				$("#message div").text("密码修改成功");
				$("#message").dialog("open");
			} else if ("error" == message) {
				$("#oldPassword").css("border-color", "#ff0039");
				$("#errorMessageOldPassword").text("原密码错误");
				$("#errorMessageOldPassword").css("display", "inline");
			}
		},
		error : function() {

		}
	});

}
