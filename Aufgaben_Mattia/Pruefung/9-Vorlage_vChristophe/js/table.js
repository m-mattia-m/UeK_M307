$('.add').click(function () {
    var id = "addNewRecord"
    console.log(id)
    showModal(id, "Add");
});
getData();

$('.modal').modal();

// var limit = 10;

// $('data-table').data('limit', 10); // set default table limit
// $('button.sort').click(function (e) {
//     e.preventDefault();
//     limit = Number($(this).data('value'));
//     console.log(limit)
//     $('data-table').data('limit', limit); // persistent limit even after reload of table
//     getData(limit);
// });

// $("table.data-table").tablesorter();

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

            // $("table.data-table").trigger('update'); 

            $('.delete').click(function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id')
                showDelModal(id);
                console.log(id)
                
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                console.log(id)
                showModal(id, "Edit");
            });
            $('.tanken').click(function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id')
                $.ajax({
                    type: "TANKEN",
                    url: "data/api.php?id=" + id,
                    dataType: "JSON",
                    success: function (response) {
                        console.log("tanken success");
                        console.log(id)
                        showMeldung(response);
                        getData();
                    }
                });
                
            });
    
        }
    });
}



