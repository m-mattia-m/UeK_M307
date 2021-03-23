$('.add').click(function () {
    var id = $(this).parent().attr('data-id')
    console.log(id)
    showModal(id, "Add");
});

$.ajax({
    type: "get",
    url: "data/data.json",
    dataType: "JSON",
    success: function (response) {
        // console.log(response)
        var template = $('#template').html();
        // console.log(template);
        var html = Mustache.render(template, response);
        // console.log(template)
        $('tbody').html(html)
        // Action
        $('.delete').click(function () {
            var id = $(this).parent().attr('data-id')
            console.log(id)
            showModal(id, "Delete");
        });
        $('.edit').click(function () {
            var id = $(this).parent().attr('data-id')
            console.log(id)
            showModal(id, "Edit");
        });
        $('.tank').click(function () {
            var id = $(this).parent().attr('data-id')
            console.log(id)
            showModal(id, "Tank");
        });
    }
})

