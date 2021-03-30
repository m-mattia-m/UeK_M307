var id;
var modus;

$(function () {
    // footer with year
    var date = new Date();
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () {});
    });

    $('#delModal').modal();
    $('#modal').modal();

    $('#sichern').click(function () {
        // console.log("xxxxxxxxxxx")
        var id = $('#id').val();
        var send = true;
        var Artikelbezeichnung = $('#Artikelbezeichnung').val();


        if (
            $('#artikelbezeichnung').val() != '' &&
            $('#kategorie').val() != '' &&
            $('#zustand').val() != ''
        ) {
            $.ajax({
                type: "POST",
                url: "data/api.php?id=" + id,
                data: {
                    Artikelbezeichnung: $('#artikelbezeichnung').val(),
                    Kategorie: $('#kategorie').val(),
                    Zustand: $('#zustand').val(),
                    Preis: $('#preis').val(),
                    Bemerkungen: $('#bemerkungen').val()
                },
                dataType: "JSON",
                success: function (response) {
                    // console.log('post success');
                    // console.log($('#artikelbezeichnung').val());
                    // console.log($('#kategorie').val());
                    // console.log($('#zustand').val());
                    // console.log($('#preis').val());
                    // console.log($('#bemerkungen').val());
                    // console.log(response);
                    M.toast({
                        html: modus + " - Saved",
                        classes: 'green white-text'
                    })
                    getData();
                }
            })
            getData();

        } else {

            M.toast({
                html: "Bitte alle Pflichtfelder ausfüllen",
                classes: 'red white-text'
            })

        }

    });

    $('.cancel').click(function () {
        // console.log("cancel")
        M.toast({
            html: modus + " - Canceled",
            classes: 'red white-text'
        })
    })

    $('.deleteToast').click(function () {
        // console.log("deleted")
        $.ajax({
            type: "DELETE",
            url: "data/api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                // console.log("delete success");
                getData();
            }
        });
        M.toast({
            html: "Successfull Deleted",
            classes: 'green white-text'
        })
    })

    // $('#sortButton').trigger('click');
    // $('#sortButton').trigger('click');
    // $('#sortButton').trigger('click');

});

// old declarate Vars


function showDelModal(id) {
    this.id = id;
    this.modus = "Delete";
    $('#delModal-title').html("Delete");
    $('#elementID').html(" '" + id + "' ");
}

function showModal(id, modus) {
    this.id = id;
    this.modus = modus;
    $('#modal-content').load("sites/formular.html", function () {
        $.getScript("js/formular.js")
    });

}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}