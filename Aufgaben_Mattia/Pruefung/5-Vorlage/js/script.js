$(function () {
    /* Set Footer-Settings - Index */
    var date = new Date();
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    /* Load Table - Index */
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/button.js", function () {});
    });

    /* Get all Cars - onOpen */
    getData();

    /* Import Modal from Materialize - onOpen */
    $('.modal').modal();

});


/* Open Modal - Table */
function showModal(id, modus) {
    this.id = id;
    this.modus = modus;
    $('data-modal').load("sites/modal.html", function () {
        $.getScript("js/modal.js", function () {
            $('#modal-title').html(modus);
            $('#elementID').text(" '" + id + "' ");
            // open modal
            // var instance = M.Modal.getInstance($('#modal'));
            // instance.open();
        });
    });

}

/* Open Delete Modal - Table */
function showDelModal(id) {
    this.id = id;
    $('data-deleteModal').load("sites/deleteModal.html", function () {
        $.getScript("js/delModal.js", function () {
            $('#modal-title').html("Delete");
            $('#elementID').text(" '" + id + "' ");
            // open modal
            // var instance = M.Modal.getInstance($('#deleteModal'));
            // instance.open();
        });
    });

}

// /* Show Message from API - Table */
// function showMeldung(response) {
//     // console.log(response['error']);
//     if (response['error']) {
//         console.error(response['error']);
//         // M.toast({html: response['error'], classes: "red"});
//     }
//     // console.log(response['success']);
//     if (response['success']) {
//         console.warn(response['success'])
//     }
// }

/* Get all Cars - Table */
function getData() {
    $.ajax({
        type: "get",
        url: "data/api.php",
        dataType: "JSON",
        success: function (response) {
            var template = $('#template').html();
            var html = Mustache.render(template, response);
            $('tbody').html(html);

            /* Wurden von hier gelöscht */
            $('.delete').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showDelModal(id);
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
            });

        }
    });
}

/* Create or Update Car - Modal */
function post(id) {
    var send = true;
    var name = $('#name').val();
    var kraftstoff = $('#kraftstoff').val();
    var color = $('#color').val();
    var bauart = $('#bauart').val();
    var tank = $('#tank').val();

    $.ajax({
        type: "POST",
        url: "./data/api.php",
        data: {
            id: id,
            name: name,
            kraftstoff: kraftstoff,
            color: color,
            bauart: bauart,
            tank: tank
        },
        dataTyp: "html",
        success: function (response) {
            console.log(response)
            $('#responsePHP').append(response);
        }
    })
    console.log(id)
    console.log(name)
    console.log(kraftstoff)
    console.log(color)
    console.log(bauart)
    console.log(tank)
}

/* Tank Car - Table */
$('#tanken').click(function () {
    // e.preventDefault();
    console.log("tanken")
    $('.tanken').click(function () {
        var id = $(this).parent().attr('data-id')
        $.ajax({
            type: "TANKEN",
            url: "data/api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                console.log("tanken success");
                console.log(id)
                // showMeldung(response);
            }
        });
    });
})

/* Add new Button - Table */
$('.add').click(function () {
    var id = $(this).parent().attr('data-id')
    console.log(id)
    showModal(id, "New");
});
