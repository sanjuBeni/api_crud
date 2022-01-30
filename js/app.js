
$(document).ready(function(){
   
   
    loadData(); 

    $("#submit-btn").on("click",function(e){
        e.preventDefault();
        
        let jsonObj = jsonData("#myForm");
        // console.log(jsonObj);
        if(jsonObj == false){
            alert("All fields are required.");
        }else{
        $.ajax({
            url: "http://localhost/API_CRUD/api_crud_app/api-insert-data.php",
            type: "POST",
            data: jsonObj,
            // dataType: "json",
            success:function(data){
                if(data.status == true){
                    loadData();
                    $("#myForm").trigger("reset");
                alert(data.message);
                }else{
                    loadData();
                    alert(data.message);
                }
            }
        });
    }
});
    
});


// json object function

function jsonData(targetForm){
    let arr = $(targetForm).serializeArray();
    // console.log(arr);
    let obj = {};
    for(let a = 0; a < arr.length; a++){
        if(arr[a].value == ""){
            return false;
        }
        obj[arr[a].name] = arr[a].value;
    }
    // console.log(obj);
    let jsonString = JSON.stringify(obj);
    return jsonString
}

function loadData(){
    $("#tbl").html("");
    $.ajax({
        url: "http://localhost/API_CRUD/api_crud_app/api-fetch-all.php",
        type: "get",
        dataType: "json",
        success: function (response) {
            if(response.status){

            }else{
                let id = 1;
                $.each(response, function (key, value) { 
                    $("#tbl").append(
                        `<tr>
                            <td>${id}</td>
                            <td>${value.name}</td>
                            <td>${value.email}</td>
                            <td>${value.mobile}</td> 
                            <td><a href="edit.html" id="update-data" class="btn btn-info text-white" onclick="editData(${value.id})" data-toggle="modal" data-target="#myModal"><span class="fa fa-edit"></span></a>
                            <a class="btn btn-danger text-white"><span class="fa fa-times"
                            onclick="deleteData(${value.id})"></span></a></td>             
                        </tr>`

                    );
                    id++;
                });
                // console.log(response);
            }
        }
    });
}

// Update data

function editData($id) {
    let userId = {
        sid : $id
    }
    let jsonId = JSON.stringify(userId);
    // console.log(jsonId);
    $.ajax({
        url: "http://localhost/API_CRUD/api_crud_app/api-fetch-single.php",
        type: "POST",
        data: jsonId,
        success:function(data){
            $("#id").val(data[0].id);
            $("#name").val(data[0].name);
            $("#email").val(data[0].email);
            $("#pwd").val(data[0].pass);
            $("#mobile").val(data[0].mobile);
            // console.log(data);
        }
        
    });
  } 

function update(){
    let jsonString = jsonData("#form-update");
    console.log(jsonString);
    if(jsonString == false){
        alert("All field are required");
    }else{
        $.ajax({
            url: "http://localhost/API_CRUD/api_crud_app/api-update-data.php",
            type: "POST",
            data: jsonString,
            dataType: "json",
            success:function(data){
                if(data.status == true){
                    loadData();
                alert(data.message);
                }else{
                    loadData();
                    alert(data.message);
                }
            }
        });
    }
}

  function deleteData(id) {
    let jsonString = JSON.stringify({"sid" : id});
    $.ajax({
        url: "http://localhost/API_CRUD/api_crud_app/api-delete-data.php",
            type: "POST",
            data: jsonString,
            dataType: "json",
            success:function(data){
                if(data.status == true){
                    loadData();
                alert(data.message);
                }else{
                    loadData();
                    alert(data.message);
                }
            }
    });
  }