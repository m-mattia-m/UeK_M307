var id;
var modus;

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
