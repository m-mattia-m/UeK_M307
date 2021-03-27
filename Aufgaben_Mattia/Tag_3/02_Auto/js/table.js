$('.add').click(function () {
    var id = $(this).parent().attr('data-id')
    console.log(id)
    showModal(id, "New");
});
getData();

function getData(){

    $.ajax({
        type: "get",
        url: "data/api.php",
        dataType: "JSON",
        success: function (response) {
            var template = $('#template').html();
            var html= Mustache.render(template, response);
            $('tbody').html(html);


            $('.delete').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showDelModal(id);
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
            });

        }
    });
}