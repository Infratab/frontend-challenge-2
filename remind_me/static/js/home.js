var token;
var username;
var error = sessionStorage.getItem("Error");

function load(){
	err = document.getElementById('err')
	if (error !== null) {
		err.innerHTML = error;
		err.style.display = "block";
	}
	else{
		err.innerHTML="";
		err.value="";
	}
}

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
          	// console.log(data);
          	// console.log(token);
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
      error: function(data){
        var err  = document.getElementById('err');
        err.innerHTML = data.responseText.slice(22,-3);
        err.style.display = "block";
       
      }
    });
}

function validate(){
	var err  = document.getElementById('err');
	var pass = document.getElementById('passwordtextbox');
	var cpas = document.getElementById('cpasswordtextbox');

    if($("#passwordtextbox").val().length < 6){
    	err.innerHTML = "Passsword field must be atleast 5 characters";
    }
    if(pass.value != cpas.value){
    	err.innerHTML = "Password and confirm Password do not match.";
    }
    // else{
    // 	err.innerHTML="";
    // 	err.value="";
    // }
	
}
function emailValidate(){
	var err  = document.getElementById('err');
	var email = document.getElementById('emailtextbox');
	var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var bool = reg.test(email.value)
	// console.log("here");
	if(!bool){
		// console.log("here1");
		err.innerHTML = "Invalid Email ID";
	}
	else{
		console.log("here2");
    	err.innerHTML="";
    	err.value="";
    }
}

