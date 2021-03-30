$('.add').click(function () {
    var id = "addNewRecord"
    // console.log(id)
    showModal(id, "Add");
});

// initialize tablesorter (plugin used to show an number of datasets)
$("table.data-table").tablesorter({
    headers : { 0 : { sortInitialOrder: "desc" } }
}); 

getData();

$('.modal').modal();


function getData(){

    // console.log("get Data")

    $.ajax({
        type: "GET",
        url: "data/api.php" ,
        dataType: "JSON",
        success: function(response){
            // console.log(response)

            var template = $('#template').html();
            var html= Mustache.render(template, response);
            $('tbody').html(html);
    
            function showMeldung(response){
                if(response['error']){
                    // console.error(response['error']);
                }
                if(response['success']){
                    // console.warn(response['success'])
                }
            }

            $("table.data-table").trigger('update'); // tablesorter trigger update

            $('.delete').click(function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id')
                showDelModal(id);
                // console.log(id)
                
            });
            $('.edit').click(function () {
                var id = $(this).parent().attr('data-id')
                // console.log(id)
                showModal(id, "Edit");
            });
        }
    })

}



