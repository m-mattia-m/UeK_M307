$(function() {
    $('.modal').modal();

    getData();

    $('#show-all').click(function(e) { show(0) });
    $('#show-one').click(function(e) { show(1) });
    $('#show-five').click(function(e) { show(5) });
    $('#show-ten').click(function(e) { show(10) });

    $('#addauto').click(function(e) {
        // e.prevenDefault();
        $('#modal_title').html('Neuer Kunde erfassen');
        var id = 0;
        loadformular(id);
    });

    $('#save-input').click(function(e) {
        e.preventDefault();

        //formulardaten auslesen
        var firma = $('#firma').val();
        var email = $('#email').val();
        var kategorie = $('#kategorie').val();
        var rechnung = $('#rechnung').val();
        var kontaktperson = $('#kontaktperson').val();

        //id - Feld wird benutzt für Update bei Insert
        var id = $('#id').val();

        // console.log(id);
        // console.log(name);
        // console.log(kraftstoff);
        // console.log(farbe);
        // console.log(bauart);
        // console.log(tank);

        var send = true;

        //Firma Eingabe überprüfen
        if (firma.length <= 0) {
            console.log('Firma muss einen Wert besitzen');
            $('#firma').addClass('orange3 lighten-4');
            M.toast({ html: 'Firma muss Wert enthalten', classes: 'red black-text' });
            send = false;
        }
        if (firma.length > 255) {
            console.log('Firma darf nicht mehr als 255 Zeichen haben');
            $('#firma').addClass('orange3 lighten-4');
            M.toast({ html: 'Firma darf nicht mehr als 255 Zeichen haben', classes: 'red black-text' });
            send = false;
        }

        //Email Eingabe überprüfen
        if (firma.length <= 0) {
            console.log('Email muss einen Wert besitzen');
            $('#email').addClass('orange3 lighten-4');
            M.toast({ html: 'Email muss Wert enthalten', classes: 'red black-text' });
            send = false;
        }

        //Rechnung kann nicht leer sein

        //Kontaktperson Eingabe überprüfen
        if (kontaktperson.length <= 0) {
            console.log('Kontaktperson muss einen Wert besitzen');
            $('#kontaktperson').addClass('orange3 lighten-4');
            M.toast({ html: 'Kontaktperson muss Wert enthalten', classes: 'red black-text' });
            send = false;
        }
        if (firma.length > 255) {
            console.log('Firma darf nicht mehr als 255 Zeichen haben');
            $('#firma').addClass('orange3 lighten-4');
            M.toast({ html: 'Firma darf nicht mehr als 255 Zeichen haben', classes: 'red black-text' });
            send = false;
        }

        //Formular senden wenn alles i.O ist
        if (send) {
            var mymodal = M.Modal.getInstance($('.modal'));
            mymodal.close();
            // alert(farbe);

            $.ajax({
                type: "post",
                url: "data/kundenapi.php?action=insert&id=" + id,
                data: {
                    firma: firma,
                    email: email,
                    kategorie: kategorie,
                    rechnung: rechnung,
                    kontaktperson: kontaktperson,
                },
                success: function(response) {
                    console.log(response['meldung']);
                    $.each(response['meldung'], function(indexInArray, valueOfElement) {
                        M.toast({ html: valueOfElement, classes: 'red black-text' });
                    });

                    getData();
                }
            })
        };
    });
});


function getData() {
    $.ajax({
        type: "post",
        url: "data/kundenapi.php?action=getData",
        dataType: "json",
        success: function(response) {
            // console.log(response);
            // console.log(response['meldung']);
            // $.each(response['meldung'], function(indexInArray, valueOfElement) {
            //     alert(valueOfElement);
            // });
            var template = $('#template').html();
            // console.log(template);
            var html = Mustache.render(template, response);
            // console.log(html);
            $('tbody').html(html);

            $('.edit').click(function(e) {
                // e.preventDefault();
                var id = $(this).parent().attr('data-id');

                $('#modal_title').html('Kunde editieren: ' + id);
                loadformular(id);
            });
            $('.tanken').click(function(e) {
                // e.preventDefault();
                var dataid = $(this).parent().attr('data-id');
                $.ajax({
                    type: "post",
                    url: "data/kundenapi.php?action=tanken&id=" + dataid,
                    dataType: "json",
                    success: function(response) {
                        // $.each(response['meldung'], function(indexInArray, valueOfElement) {
                        //     //alert(valueOfElement);
                        //     console.log(valueOfElement);
                        // });
                        getData();
                    }
                })
            });
            $('.delete').click(function(e) {
                // e.preventDefault();
                var dataid = $(this).parent().attr('data-id');
                var check = confirm('Wollen Sie den Datensatz wirklich löschen?');
                if (check) {
                    $.ajax({
                        type: "post",
                        url: "data/kundenapi.php?action=delete&id=" + dataid,
                        dataType: "json",
                        success: function(response) {
                            // $.each(response['meldung'], function(indexInArray, valueOfElement) {
                            //     alert(valueOfElement);W
                            //     // console.log(valueOfElement);
                            // });
                            getData();
                        }
                    });
                };
            });

        }
    });
}

//automatische Abfüllung der Formular werte
function loadformular(id) {
    $("#modal_inhalt").load("sites/formular.html", function() {
        $.getScript("js/formular.js");
        $('select').formSelect();
        $('#id').val(id);
        // wenn id > 0 dann Felder füllen
        if (id > 0) {
            $.ajax({
                url: "data/kundenapi.php?action=getData&id=" + id,
                dataType: 'json',
                success: function(response) {
                    console.info(response);
                    $('#firma').val(response['data'][0]['kunde_firma']);
                    $('#email').val(response['data'][0]['kunde_email']);
                    $('#kategorie').val(response['data'][0]['kunde_kategorie']);
                    $('#rechnung').val(response['data'][0]['kunde_rechnung']);
                    $('#kontaktperson').val(response['data'][0]['kunde_kontaktperson']);
                    // DROP - DOWN wieder initialisieren nach befüllen
                    $('select').formSelect();
                    // label für input - Felder klasse active hinzufügen
                    $('.labelset label').addClass('active');
                }
            });
        }
        M.updateTextFields();
    });
    // Modal öffnen
    var mymodal = M.Modal.getInstance($('.modal'));
    mymodal.open();
}

function show(amount) {
    $.ajax({
        type: "post",
        url: "data/kundenapi.php?action=getData&show=" + amount,
        dataType: "json",
        success: function(response) {
            var template = $('#template').html();
            // console.log(template);
            var html = Mustache.render(template, response);
            // console.log(html);
            $('tbody').html(html);
        }
    });
}