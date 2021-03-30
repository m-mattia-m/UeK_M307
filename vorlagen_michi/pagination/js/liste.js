showData();

//---------------get JSON-----------------------------------------
function showData(){

    //definiton of mustache template (out of html)
    var mytemplate = $('#myTemplate').html();
 

    $.getJSON("./api.php", function (response) { //default -> getData

        /**------------response validation -> did it work? --------------- */
        if (response['error'].length > 0) {
            for (var i = 0; i < response['error'].length; i++) {
                var message = response['error'][i].msg;
                M.toast({ html: message, classes: 'red' });
            }
        }
        if (response['success'].length > 0) {
            for (var i = 0; i < response['success'].length; i++) {
                var message = response['success'][i].msg;
                M.toast({ html: message, classes: 'green' });
            }
        }
        /**-----------------------------------------------------------------*/


        /* MUSTACHE TEMPLATE IMPLEMENTATION */
        var html = Mustache.render(mytemplate, response);
        
        $('tbody').html(html);

        /*--------------pagination pre-settings------------*/

        // reset the existing pagination
        $('#myPager').html('');


        $('table').pageMe({
            pagerSelector: '#myPager', //steuerungselement
            activeColor: 'blue',
            prevText: 'prev',
            nextText: 'next',
            showPrevNext: true,
            hidePageNumbers: false,
            perPage: 3
        });
        /*------------------------------------------ */

        //---------------betanken-----------------------------------------
        $('.tankeAuto').click(function (e) {
            e.preventDefault();
            var id = $(this).parent().attr('data-id');
            //console.log("auto mit der nr " +id +" wird getankt");
            
            $.ajax({
                url: 'api.php?action=tanken&id=' + id,
                dataType: 'json',
                success: function(response) {

                /**------------response validation -> did it work? --------------- */
                if (response['error'].length > 0) {
                    for (var i = 0; i < response['error'].length; i++) {
                        var str = response['error'][i].msg;
                        M.toast({ html: str, classes: 'red' });
                    }
                }
                if (response['success'].length > 0) {
                    for (var i = 0; i < response['success'].length; i++) {
                        var str = response['success'][i].msg;
                        M.toast({ html: str, classes: 'green' });
                    }
                }
                /**-----------------------------------------------------------------*/
                    showData();
                }
            });
        });
 
        //--------------------auto---loeschen----------------
        $('.deleteAuto').click(function (e) {
            //console.log("want to delete it");
            e.preventDefault();
            var id = $(this).parent().attr('data-id');
            
            if (confirm("Möchten Sie das Element wirklich löschen?")) {
                $.ajax({
                    url: 'api.php?action=delete&id=' + id,
                    dataType: 'json',
                    success: function(response) {                       
                        /**------------response validation -> did it work? ---------------*/
                        if (response['error'].length > 0) {
                            for (var i = 0; i < response['error'].length; i++) {
                                var str = response['error'][i].msg;
                                M.toast({ html: str, classes: 'red' });
                            }
                        }
                        if (response['success'].length > 0) {
                            for (var i = 0; i < response['success'].length; i++) {
                                var str = response['success'][i].msg;
                                M.toast({ html: str, classes: 'green' });
                            }
                        }
                    }
                });
                
                M.toast({ html: "You deleted nr " + id, classes: 'red' });

                showData();

            }           
        });

        //--------------------auto---editieren----------------
        $('.editAuto').click(function (e) {
            e.preventDefault();
            var id = $(this).parent().attr('data-id');
            $('#modalTitel').html('Edit Auto ' + id);

            //console.log("want to edit " + id);
            
            loadform(id);
                            
            showData();
        });


          //--------------------auto-hinzufuegen----------------
          $('#newAuto').click(function (e) {
            $('#modalTitel').html("Create a new Auto");

            e.preventDefault();
            //console.log("want a new car");
            
            loadform(0);
                            
            showData();
        });


    }
);
}


// ----------------------------------------------
// Formular laden in das Modal
// ----------------------------------------------
function loadform(id) {
    $('#modalInhalt').load('sites/formular.html', function() {
        $('select').formSelect();
        $('#id').val(id);
        // wenn id > 0 dann Felder füllen
        if (id > 0) {
            $.ajax({
                url: "api.php?action=getData_of_row&id=" + id,
                dataType: 'json',
                success: function(response) {
                    $('#name').val(response['data'][0]['name']);
                    $('#bauart').val(response['data'][0]['bauart']);
                    $('#kraftstoff').val(response['data'][0]['kraftstoff']);
                    $('#farbe').val(response['data'][0]['farbe']);
                    $('#tank').val(response['data'][0]['betankungen']);
                    $('#date').val(response['data'][0]['date']);

                    // DROP - DOWN wieder initialisieren nach befüllen
                    $('select').formSelect();
                    // label für input - Felder klasse active hinzufügen
                    $('.labelset label').addClass('active');
                    M.updateTextFields(); //textfelder updaten
                }
            });
        }
    });

    // Modal öffnen
    var mymodal = M.Modal.getInstance($('.modal'));
    mymodal.open();
}

