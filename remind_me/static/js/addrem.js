var values;
var token = sessionStorage.getItem("token");
// console.log(token);
$(document).ready(function(){
    document.getElementsByClassName('topbarspan')[0].innerHTML =  username;
});

var username = sessionStorage.getItem("username");
console.log(username);
function addreminder() {
    var dt = new Date(document.getElementsByClassName('date')[0].value);
    dt = dt.toISOString();
    console.log(dt);
    var values = {
        'message': document.getElementsByClassName('message')[0].value,
        'phone_number': document.getElementsByClassName('phone')[0].value,
        'scheduled_datetime':dt
    };
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    $.ajax({
        url: "/reminders/",
        type: "POST",
        data: values,
        headers: {
            'Authorization': 'Token '+token
        }
    });
    showreminder();
}

// function hidereminders(){
//     document.getElementById("reminderlist").style.display = "none";
// }
var ihtml = "";
var jhtml = "";
    
function showreminder(){
    // var token = '2200d7faf10f34cd9df0732fe49246560f282a4a';
    ihtml = "";
    jhtml = "";
     $.ajax({
        url: "/reminders/",
        type: "GET",
        headers: {
            'Authorization': 'Token '+token
        },
        success : function(data){
            values=data;
            var ihtml="";
            for(var i=0;i<data.length;i++){
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
        
        ihtml += '<li class="ui remind"><input name="idinp" type="hidden" value="'+id+'">'+'<p class="messagetext">'+msg+'</p>'+'<label class="ui label datelabel">' + datefull.toDateString() + ' at '+ datefull.toTimeString() +'</label> <div class="ui right floated red button deletebtn" onclick="deletereminder('+i+')"> Delete </div> <div class="ui teal button right floated editbtn" onclick="editreminder('+i+')"> Edit </div>  </li>' ;
    }
    else{
        
        jhtml += '<li class="ui pastremind"><input name="idinp" type="hidden" value="'+id+'">'+'<p class="pastmessagetext">'+msg+'</p>'+'<label class="ui label datelabel">'+  datefull.toDateString() + ' at '+ datefull.toTimeString() +'</label> <div class="ui right floated red button deletebtn" onclick="deletereminder('+i+')"> Delete </div> <div class="ui blue button right floated editbtn" onclick="editreminder('+i+')"> Remind Again </div>  </li>' ;
    }  
    document.getElementById("listreminder").innerHTML = ihtml;
    document.getElementById("listpastreminder").innerHTML = jhtml;
}
function editreminder(i){
    var item = document.getElementById("listreminder").children[i];
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
    console.log(new Date());
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
    console.log(date);
    var new_values = {
        "message": msg,
        "phone_number": phone,
        "scheduled_datetime":date
    };
    $.ajax({
        url :"/reminders/"+id+"/",
        type : "PUT",
        dataType : "JSON",
        data:new_values,
        headers: {
            'Authorization': 'Token '+token,
            'Content-Type': 'application/json'
        }
    });
    showreminder();
}
function deletereminder(id){
    $.ajax({
        url :"/reminders/"+id+"/",
        type : "DELETE",
        headers: {
            'Authorization': 'Token '+token,
            'Content-Type': 'application/json'
        }
    });
    showreminder();
}

function pastreminders(){
    var newDate = new Date();
    //var datetime = "LastSync: " + newDate.getDay() + " @ " + newDate.getMonth();
    console.log(newDate);
}