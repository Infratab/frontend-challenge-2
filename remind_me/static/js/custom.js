var token;
var username;
function userlogin(){
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    username=$("#emailtextbox").val();
    var outval ={
    	'username' : username,
    	'password' : document.getElementById("passwordtextbox").value
    };
     $.ajax({
        url: "/rest-auth/login/",
        type: "POST",
        data: outval,
        // headers: {
        //     'Authorization': 'Token '+token
        // },
        success: function (data, textStatus, jqXHR) {
        	console.log(textStatus);
        	token = data.key;
          if(textStatus == "success"){
          	sessionStorage.setItem('token', token);
          	console.log(data);
          	console.log(token.key);
          	sessionStorage.setItem('username',username);
          	window.location.href = "/static/addreminder.html";
          }
          else{
          	// err = $("#err") ;
          	// alert("1");
          	// err.innerHTML = "Invalid Username or Passsword";
          	// err.style.display = "block";
          }
    	},
    	error: function(){
    		err = document.getElementById("err");
        
          	err.innerHTML = "Invalid Username or Passsword";
          	err.style.display = "block";
    	}
    });
 }

function signup(){
 	username=$("#emailtextbox").val();
    var outval ={
    	'email' : username,
    	'password' : document.getElementById("passwordtextbox").value,
    	'confirm_password' : document.getElementById("cpasswordtextbox").value
    };
     $.ajax({
        url: "/register/",
        type: "POST",
        data: outval,
        // headers: {
        //     'Authorization': 'Token '+token
        // },
        success: function (data, textStatus, jqXHR) {
        	token = data.token;
          if(textStatus == "success"){
          	sessionStorage.setItem('token', token);
          	console.log(data);
          	console.log(token);
          	sessionStorage.setItem('username',username);
          	window.location.href = "/static/addreminder.html";
          }
          else{
          	// err = $("#err") ;
          	// alert("1");
          	// err.innerHTML = "Invalid Username or Passsword";
          	// err.style.display = "block";
          }
    	}
    });
}