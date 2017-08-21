$(document).ready(function () {
    $('#question-icon').tooltip();

// Initialize Firebase
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

    //CAPTURA EL EVENTO CLICK DEL BOTON CONSULTAR
    $('#send-form-url').on('click', function (event) {

        $('#img-cant').val("");
        $('#css_cant').val("");

        event.preventDefault();

        $.get($('#url').val(), function(data) {

            var imgs = $('<div/>').html(data).find('img');

            var css = $('<div/>').html(data).find('link');

            var cont_img = 0;

            var cont_css = 0;

            imgs.each(function(i, img) {

                cont_img++;

            });

            css.each(function(i, css) {

                cont_css++;

            });

            $('#img-cant').val(cont_img);
            $('#css_cant').val(cont_css);


            // Por medio de la instancia de la base de datos de Firebase hacemos referencia a la tabla que queremos usar y enviamos un objeto json.
            database.ref('urls/').push({
                url: $('#url').val(),
                css: cont_css,
                img: cont_img
            });

            var notification = alertify.notify('Se ha consultado los datos de la url indicada', 'success', 5, function(){});

        }).fail(function (xhr, status, error) {

            if(xhr.statusText == 'error'){

                alertify.alert('Error al consultar enlace.', 'ha ocurrido un error, intente con un enlace diferente', function(){ });

            }
        });



    });

    // Se obtienen los objetos guardados en la tabla indicada.
    database.ref('urls/').on('value', function (snap) {

        $('.result-list').empty();
        console.log(snap.numChildren());
        snap.forEach(function (urlSnaps) {

            $('.result-list').append('<div class="list-group"><a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +

                '<div class="d-flex w-100 justify-content-between">' +

                    '<h5 class="mb-1">'+urlSnaps.val().url+'</h5>' +

                '</div>' +

                '<p class="mb-1"> <span>Cantidad de css: </span>'+urlSnaps.val().css+'</p>' +

                '<p class="mb-1"><span>Cantidad de imagenes: </span> '+urlSnaps.val().img+'</p>'+

                '</div>');
        })
    });


});

