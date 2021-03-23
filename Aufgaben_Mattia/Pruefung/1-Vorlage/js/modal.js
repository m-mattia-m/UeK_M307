$('.modal').modal();

function showModal(id, modus) {

    $('data-modal').load("sites/modal.html", function () {
        $.getScript("js/modal.js", function () {
            $('#modal-title').html(modus);
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#modal'));
            instance.open();
        });
    });

}

$('.save').click(function () {
    console.log("save")
})

$('.cancel').click(function () {
    console.log("cancel")
})