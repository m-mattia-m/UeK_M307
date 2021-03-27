$('.modal').modal();

var id;

function showDelModal(id) {
    this.id = id;
    // console.log(id);
    $('data-delModal').load("sites/delModal.html", function () {
        $.getScript("js/delModal.js", function () {
            $('#modal-title').html("Delete");
            $('#elementID').text(" '" + id + "' ");
            // open modal
            var instance = M.Modal.getInstance($('#delModal'));
            // console.log(instance);
            instance.open();
        });
    });

}

$('.deleteToast').click(function () {
    console.log("deleted")
    $.ajax({
        type: "DELETE",
        url: "data/api.php?id=" + id,
        dataType: "JSON",
        success: function (response) {
            console.log("delete success");
        }
    });
    M.toast({html: "Successfull Deleted", classes: 'green white-text'})
    getData();
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({html: modus + " - Canceled", classes: 'red white-text'})
})