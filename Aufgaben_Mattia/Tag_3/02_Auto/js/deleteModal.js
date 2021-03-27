$('.modal').modal();

var id;

function showDelModal(id) {
    this.id = id;
    $('data-deleteModal').load("sites/deleteModal.html", function () {
        $.getScript("js/deleteModal.js", function () {
            $('#modal-title').html("Delete");
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#deleteModal'));
            instance.open();
        });
    });

}

$('.deleteToast').click(function () {
    console.log("save")
    M.toast({html: "Successfull Deleted", classes: 'green white-text'})
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({html: modus + " - Canceled", classes: 'red white-text'})
})