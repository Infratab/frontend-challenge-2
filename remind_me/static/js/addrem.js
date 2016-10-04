var values;
var token = sessionStorage.getItem("token");
// console.log(token);
var username = sessionStorage.getItem("username");
$(document).ready(function(){
    document.getElementsByClassName('topbarspan')[0].innerHTML =  username;
});

// console.log(username);
function addreminder() {
    var date = new Date(document.getElementsByClassName('date')[0].value);
    date = date.toISOString();
    // console.log(dt);
    var values = {
        'message': document.getElementsByClassName('message')[0].value,
        'phone_number': document.getElementsByClassName('phone')[0].value,
        'scheduled_datetime':date
    };
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    $.ajax({
        url: "/reminders/",
        type: "POST",
        data: values,
        headers: {
            'Authorization': 'Token '+token
        },
        success : function(){
            $(".date").text(" ");
            document.getElementsByClassName('message')[0].innerHTML = "";
            document.getElementsByClassName('phone')[0].innerHTML = "";
            document.getElementsByClassName('message')[0].value = "";
            document.getElementsByClassName('phone')[0].value = "";
            document.getElementById('errspan').innerHTML = "";
            document.getElementById('errspan').value = "";
            document.getElementsByClassName('date')[0].value = "";
            document.getElementsByClassName('date')[0].innerHTML = "";

            showreminder();
        },
        error: function(data){
            // console.log(data.responseText);
            // console.log(data.responseText.slice(22,-3));
            var errmsg = data;
            document.getElementById('errspan').innerHTML = data.responseText.slice(22,-3);
            }
    });
}

// function hidereminders(){
//     document.getElementById("reminderlist").style.display = "none";
// }
var upComingListHtml = "";
var pastListHtml = "";
    
function showreminder(){
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    console.log(token);
    if(token === null){
        sessionStorage.setItem('Error',"Please  login to continue");
    window.location.href = '/';
    }
    urem = 0;
    premin = 0;
    upComingListHtml = "";
    pastListHtml = "";
     $.ajax({
        url: "/reminders/",
        type: "GET",
        headers: {
            'Authorization': 'Token '+token
        },
        success : function(data){
            values=data;
            var upComingListHtml="";
            for(var i=0;i<data.length;i++){
                // console.log(i);
                msg = data[i].message;
                date = data[i].scheduled_datetime;
                id=data[i].id;
                phone = data[i].phone;
                // ihtml_temp = createreminder(msg,date,id,phone,i);
                // ihtml += ihtml_temp;
                createreminder(msg,date,id,phone,i);
            }
            // document.getElementById("listreminder").innerHTML = ihtml;
        }
    });
   
}

// urem = 0;
// premin = 0;

function createreminder(msg,fulldate,id,phone,i){
    var newDate = new Date();
    todayYear = newDate.getFullYear();
    todayMonth = newDate.getMonth()
    todayDate =  newDate.getDate() ;
    hour = newDate.getHours();
    min = newDate.getMinutes();
    sec = newDate.getSeconds();
    ms = newDate.getMilliseconds();
    var today = new Date(todayYear,todayMonth,todayDate,hour,min,sec,ms);
    //console.log(datetime);
    var datefull = datesplit(fulldate);
    // datefull = datefull.toDateTimeString();
    if(datefull >= today ){
        upComingListHtml += '<li class="ui remind"><input name="idinp" type="hidden" value="'+id+'">'+'<p class="messagetext">'+msg+'</p>'+'<label class="ui label datelabel">' + datefull.toDateString() + ' at '+ datefull.toTimeString() +'</label> <div class="ui right floated red button deletebtn" onclick="deletereminder('+id+')"> Delete </div> <div class="ui teal button right floated editbtn" onclick="editUpComingReminder('+urem+')"> Edit </div>  </li>' ;
        urem += 1;
    }
    else{
        // console.log(premin);
        pastListHtml += '<li class="ui pastremind"><input name="idinp" type="hidden" value="'+id+'">'+'<p class="pastmessagetext">'+msg+'</p>'+'<label class="ui label datelabel">'+  datefull.toDateString() + ' at '+ datefull.toTimeString() +'</label> <div class="ui right floated red button deletebtn" onclick="deletereminder('+id+')"> Delete </div> <div class="ui blue button right floated editbtn" onclick="editPastReminder('+premin+')"> Remind Again </div>  </li>' ;
        premin += 1;
    }  
    document.getElementById("listreminder").innerHTML = upComingListHtml;
    document.getElementById("listpastreminder").innerHTML = pastListHtml;
}
function editUpComingReminder(i){
     var item = document.getElementById("listreminder").children[i];
     editreminder(item);
}
function editPastReminder(i){
     var item = document.getElementById("listpastreminder").children[i];
     editreminder(item);
}
function editreminder(item){
    str = "list-style-type";
    item.style.str   = "none";
    var id = item.children[0].value;
    var result = $.grep(values, function(e){ return e.id == id; });
    var date=datesplit(result[0].scheduled_datetime);
    var itemhtml = "" ;
    itemhtml = '<div class="ui input msgdiv" > <input id="newmsg" class="message" type="text" name="message" value ="'+ result[0].message+'"     > </div> ';
    itemhtml += '<div class="ui input phndiv" > <input class="phone" type="text" id="newphn" name="phone_number" value="'+result[0].phone_number+'"> </div>';
    itemhtml += ' <div class="ui icon input caldiv" > <input id="newdate" class="date" type="text" name="scheduled_datetime"  value="'+ date+'"> <i class="green calendar icon"></i> </div>';
    itemhtml += ' <div class="savebtn ui teal button" type="submit" onclick="updatereminder('+id+')"> Save </div>';
    itemhtml += ' <div class="cancelbtn ui red button" type="clear" onclick="showreminder()"> Cancel </div>';
    item.innerHTML = " ";
    item.innerHTML = itemhtml;
    jQuery('#newdate').datetimepicker({});
}

function datesplit(date){
    // console.log(new Date());
    d = new Date(date);
    date = d.getDate();
    month = (d.getMonth());
    year = d.getFullYear();
    time = d.getTime();
    hour = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    ms = d.getMilliseconds();
    var datefull = new Date(year,month,date,hour,min,sec,ms);
    return datefull; 
}

function updatereminder(id){
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    var msg = document.getElementById("newmsg").value;
    var date = new Date(document.getElementById("newdate").value);
    var phone = document.getElementById("newphn").value;

    date = date.toISOString();
    // console.log(date);
    var newvalues = {
        "message": msg,
        "phone_number": phone,
        "scheduled_datetime":date
    };
    $.ajax({
        url :"/reminders/"+id+"/",
        type : "PUT",
        data : JSON.stringify(newvalues),
        headers: {
            'Authorization': 'Token '+token
        }
    });
    showreminder();
}
function deletereminder(id){
    $.ajax({
        url :"/reminders/"+id+"/",
        type : "DELETE",
        headers: {
            'Authorization': 'Token '+token
        },
        success: function(){
            showreminder();
        }
    });
    showreminder();
}

function logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.location.href = "/";
}

function validate(){
    err = document.getElementById('errspan');
    var reg = new RegExp(/^\d+$/);
    if((document.getElementsByClassName('phone')[0].value == "") ||  (document.getElementsByClassName('phone')[0].value == reg)){
        err.innerHTML = "Invalid Phone Number";
        // console.log("here");
    }
    else{
        // console.log("bye");
        err.innerHTML = "";
        err.value = "";
    }

}
