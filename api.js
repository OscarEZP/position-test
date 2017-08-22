$(document).ready(function () {


    $.get('https://jsonplaceholder.typicode.com/todos', function(data) {

        $.ajax({
            type: "POST",
            url: 'route.php?index=postData',
            data: {data:data},
            success: function (data) {
                var obj = JSON.parse(data);
                if(obj.status_code == "200"){
                    $('#total').val(obj.total);
                    listTable(obj.list);
                    var notification = alertify.notify(obj.message, 'success', 5, function(){  console.log('dismissed'); });


                }else{
                    var notification = alertify.notify(obj.message, 'danger', 5, function(){  console.log('dismissed'); });
                }
            }
        });
    });


});


function listTable(obj) {
    for(var i=0; i< obj.length; i++){

        $('#result-list').append('<div class="list-group"><a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                '<div class="d-flex w-100 justify-content-between" id="list-group">' +
                '<h5 class="mb-1">User id '+obj[i].user_id+'</h5>' +
                '</div>' +
                '<p class="mb-1"> <span>Cantidad de tareas completadas: </span>'+obj[i].yes+'</p>' +
                '<p class="mb-1"><span>Cantidad de tareas no completadas: </span> '+obj[i].no+'</p>' +
            '</div>');
    }

}