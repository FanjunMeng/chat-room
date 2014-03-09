function login() {
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
			if("success"==message){
				location.href="/";
			}else{
				
			}
		},
		error : function() {

		}
	});
}