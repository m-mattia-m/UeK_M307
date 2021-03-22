$(function () {
    // footer with year
    var date = new Date();
    $('#footer-text').html('© ' + date.getFullYear() + ' Apps');

    // load list
    $('data-table').load("sites/list.html", function () {
        $.getScript("js/list.js", function () { });
    });

    // add item to list
    $('.mode-new').click(function (e) {
        e.preventDefault();
        showModal(0);
    });
});


// show toasts after response
function showResponseToasts(data) {
    if (data['success'].length > 0) {
        data['success'].forEach(element => {
            M.toast({ html: element, classes: 'green' });
        });
    }
    if (data['error'].length > 0) {
        data['error'].forEach(element => {
            M.toast({ html: element, classes: 'red' });
        });
    }
}

function showToast(text, type) {
    switch (type) {
        case 'error':
            M.toast({ html: text, classes: 'red' });
            break;
        case 'success':
            M.toast({ html: text, classes: 'green' });
            break;
        default:
            M.toast({ html: text, classes: 'grey lighten-1' });
            break;
    }
}

function showModal(id) {
    // check if it needs a new dataset or if it is an update
    if (id == 0) {
        $('data-modal').load("sites/form.html", function () {
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
    } else {
        $('data-modal').load("sites/form.html", function () {
            $.getScript("js/form.js", function () {
                // set modal html
                $('#modal-title').html('Edit - ID: ' + id); // * Get parent and read attr `data-id` => data('id')

                // get data
                $.ajax({
                    type: "GET",
                    url: "data/api.php?action=get&id=" + id,
                    data: "",
                    dataType: "json",
                    success: function (response) {
                        $('#field-id').val(response['data'][0]['id']);
                        $('#field-name').val(response['data'][0]['name']);
                        $('#field-datum').val(response['data'][0]['datum']);
                        $('#field-preis').val(response['data'][0]['preis']);
                        $('#field-kategorie').val(response['data'][0]['kategorie']);
                        $('#field-rating').val(response['data'][0]['rating']);
                        $('#field-stat').val(response['data'][0]['stat']);
                        // update the fields
                        M.updateTextFields();
                        $('select').formSelect();
                        // open modal
                        var instance = M.Modal.getInstance($('#modal'));
                        instance.open();
                    }
                });
            });
        });
    }
}

function showDeleteModal(id) {
    $('data-modal-delete').load("sites/form-delete.html", function () {
        $.getScript("js/form-delete.js", function () {
            $('#modal-delete').data('id', id); // set id to reference
            $('#modal-delete-title').html('Delete - ID: ' + id); // set modal html
            $('#alert-text').html(`Do you want to delete the record: <b>${id}</b>`);
            var instance = M.Modal.getInstance($('#modal-delete')); // open modal
            instance.open();
        });
    });
}