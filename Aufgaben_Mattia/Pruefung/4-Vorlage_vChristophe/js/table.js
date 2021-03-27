$('.add').click(function () {
    var id = $(this).parent().attr('data-id')
    console.log(id)
    showModal(id, "Add");
});
getData();

function getData(){

    $.ajax({
        type: "GET",
        url: "data/api.php",
        dataType: "JSON",
        success: function (response) {
            var template = $('#template').html();
            var html= Mustache.render(template, response);
            $('tbody').html(html);
    
            function showMeldung(response){
                if(response['error']){
                    console.error(response['error']);
                }
                if(response['success']){
                    console.warn(response['success'])
                }
            }

            $('.delete').click(function () {
                var id = $(this).parent().attr('data-id')
                showDelModal(id);
                console.log(id)
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function () {
                var id = $(this).parent().attr('data-id')
                $.ajax({
                    type: "TANKEN",
                    url: "data/api.php?id=" + id,
                    dataType: "JSON",
                    success: function (response) {
                        console.log("tanken success");
                        console.log(id)
                        showMeldung(response);
                    }
                });
                getData()
            });
    
        }
    });
}


