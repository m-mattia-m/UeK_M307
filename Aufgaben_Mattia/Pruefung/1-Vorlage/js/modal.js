function showModal(id) {
    // check if it needs a new dataset or if it is an update

    $('modal').load("sites/form.html", function () {
        $.getScript("js/form.js", function () {
            $('#modal-title').html('New');
            $('#field-id').val(0);
            M.updateTextFields(); // update the text fields
            $('select').formSelect();
            // open modal
            var instance = M.Modal.getInstance($('#modal'));
            instance.open();
        });
    });

}





/*
#################################################################
    von Kay
#################################################################
*/




// function showModal(id) {
//     // check if it needs a new dataset or if it is an update
//     if (id == 0) {
//         $('data-modal').load("sites/form.html", function () {
//             $.getScript("js/form.js", function () {
//                 $('#modal-title').html('New');
//                 $('#field-id').val(0);
//                 M.updateTextFields(); // update the text fields
//                 $('select').formSelect();
//                 // open modal
//                 var instance = M.Modal.getInstance($('#modal'));
//                 instance.open();
//             });
//         });
//     } else {
//         $('data-modal').load("sites/form.html", function () {
//             $.getScript("js/form.js", function () {
//                 // set modal html
//                 $('#modal-title').html('Edit - ID: ' + id); // * Get parent and read attr `data-id` => data('id')

//                 // get data
//                 $.ajax({
//                     type: "GET",
//                     url: "data/api.php?action=get&id=" + id,
//                     data: "",
//                     dataType: "json",
//                     success: function (response) {
//                         $('#field-id').val(response['data'][0]['id']);
//                         $('#field-name').val(response['data'][0]['name']);
//                         $('#field-datum').val(response['data'][0]['datum']);
//                         $('#field-preis').val(response['data'][0]['preis']);
//                         $('#field-kategorie').val(response['data'][0]['kategorie']);
//                         $('#field-rating').val(response['data'][0]['rating']);
//                         $('#field-stat').val(response['data'][0]['stat']);
//                         // update the fields
//                         M.updateTextFields();
//                         $('select').formSelect();
//                         // open modal
//                         var instance = M.Modal.getInstance($('#modal'));
//                         instance.open();
//                     }
//                 });
//             });
//         });
//     }
// }
