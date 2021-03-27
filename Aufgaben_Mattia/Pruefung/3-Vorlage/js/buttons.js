$('.modal').modal();

var id;
var modus;

$('.save').click(function () {
    console.log("save")
    post(this.id);
    M.toast({
        html: modus + " - Saved",
        classes: 'green white-text'
    });
    getData();
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({
        html: modus + " - Canceled",
        classes: 'red white-text'
    });
})

$('.deleteToast').click(function () {
    console.log("save")
    M.toast({
        html: "Successfull Deleted",
        classes: 'green white-text'
    });
    getData();
})

$('.cancel').click(function () {
    console.log("cancel")
    M.toast({
        html: modus + " - Canceled",
        classes: 'red white-text'
    })
})

$('.add').click(function () {
    var id = $(this).parent().attr('data-id')
    console.log(id)
    showModal(id, "New");
});

