$(function () {
    /* Set Footer-Settings - Index */
    var date = new Date();
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    /* Load Table - Index */
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () {});
    });

    /* Get all Cars - onOpen */
    // getData();

    /* Import Modal from Materialize - onOpen */
    $('#modal').modal();
    $('#delModal').modal();

    /* Create or Update Car - Modal */
    $('.save').click(function () {
        console.log("save")
        var id = $('#id').val();
        $.ajax({
            type: "POST",
            url: "data/api.php?id=" + id,
            data: {
                name: $('#name').val(),
                kraftstoff: $('#kraftstoff').val(),
                color: $('#color').val(),
                bauart: $('#bauart').val(),
                tank: $('#tank').val()
            },
            dataType: "JSON",
            success: function (response) {
                console.log('post success');
                console.log(response);
                console.log(data);
            }
        })
        M.toast({
            html: modus + " - Saved",
            classes: 'green white-text'
        })
        getData();
    });

    /* Cancle-Toast - Modal */
    $('.cancel').click(function () {
        console.log("cancel")
        M.toast({
            html: modus + " - Canceled",
            classes: 'red white-text'
        })
    })


    /* Delete-Toast - Modal */
    $('.deleteToast').click(function () {
        console.log("deleted")
        $.ajax({
            type: "DELETE",
            url: "data/api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                console.log("delete success");
                getData();
            }
        });
        M.toast({
            html: "Successfull Deleted",
            classes: 'green white-text'
        })
    })

});

/* Declarate Var for identification - Modal */
var id;
var modus;

/* Open Delete Modal - Table */
function showDelModal(id) {
    this.id = id;
    // console.log(id);
    $('#modal-main').load("sites/delModal.html", function () {
        $('#modal-title').html("Delete");
        $('#elementID').html(" '" + id + "' ");
    });

}

/* Open Modal - Table */
function showModal(id, modus) {
    this.id = id;
    this.modus = modus;

    $('#modal-content').load("sites/formular.html", function () {
        $.getScript("js/formular.js")
    });

}