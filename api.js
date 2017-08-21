$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyD8RjmIkMWjYfnI4lbrY3DBLcTUKINwMIc",
        authDomain: "bazarverde-5d739.firebaseapp.com",
        databaseURL: "https://bazarverde-5d739.firebaseio.com",
        projectId: "bazarverde-5d739",
        storageBucket: "bazarverde-5d739.appspot.com",
        messagingSenderId: "489497789338"
    };
    firebase.initializeApp(config);
    // Inicializamos nuestra base de datos por medio de la instacia de Firebase
    var database = firebase.database();

    var groupedData = {};
    $.get('https://jsonplaceholder.typicode.com/todos', function(data) {


        database.ref('api/').on('value', function (snap) {

            $('.result-list').empty();

            if(snap.numChildren() < 200){
                for(var i=0; i<data.length; i++){
                    database.ref('api/').push(data[i]);
                }
            }
        });


        /*return;

         $('#total').val(data.length);

         for (var i = 0; i < data.length - 1; i++) {

         console.log(data);
         var item = data[i];

         if (!groupedData[item.userId]){
         groupedData[item.userId] = [];
         }

         groupedData[item.userId].push(item);

         }

         console.log(groupedData);
         */
    });


    database.ref('api/').groupByValue('userId').on('value', function (snap) {
        snap.forEach(function (urlSnaps) {
            console.log(urlSnaps);
        });
    });
});

/*
function displayElements(obj) {
    var count = Object.keys(obj).length;
    var true_cont = 0;
    var false_cont = 0;
    var data = {};

    /*data['userId']['completed'] = [];
    data['userId']['noCompleted'] = [];

    for(var i=1; i<=count; i++){

        data[i] = i;

        for(var j=0; j<=obj[i].length; j++){
            if(data[i]== i){
                console.log(obj[i][j]);
            }


        }


    }

    console.log(data);
}
*/

/*$('.list-group').append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +

 '<div class="d-flex w-100 justify-content-between">' +

 '<h5 class="mb-1"> User ID'+i+'</h5>' +

 '</div>' +

 '<p class="mb-1"> <span>Cantidad de css: </span>hola cocacola</p>' +

 '<p class="mb-1"><span>Cantidad de imagenes: </span>hola cocacola</p>');*/