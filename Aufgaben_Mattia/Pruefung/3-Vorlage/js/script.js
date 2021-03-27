$('.modal').modal();

$(function () {
    // footer with year
    var date = new Date();
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/buttons.js", function () {});
    });

    getData();

});

function showModal(id, modus) {
    this.id = id;
    this.modus = modus;
    $('data-modal').load("sites/modal.html", function () {
        $.getScript("js/script.js", function () {
            $('#modal-title').html(modus);
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#modal'));
            instance.open();
        });
    });

}

function showDelModal(id) {
    this.id = id;
    $('data-deleteModal').load("sites/deleteModal.html", function () {
        $.getScript("js/script.js", function () {
            $('#modal-title').html("Delete");
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#deleteModal'));
            instance.open();
        });
    });

}

function showMeldung(response) {
    // console.log(response['error']);
    if (response['error']) {
        console.error(response['error']);
        // M.toast({html: response['error'], classes: "red"});
    }
    // console.log(response['success']);
    if (response['success']) {
        console.warn(response['success'])
    }
}
