$(function () {
    // footer with year
    var date = new Date();
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () {});
    });

    function showMeldung(response) {
        // console.log(response['error']);
        if (response['error']) {
            console.error(response['error']);
            // M.toast({html: response['error'], classes: "red"});
        }
        // console.log(response['success']);
        if (response['success']) {
            console.warn(response['success'])
        }
    }

    $('#tanken').click(function () {
        // e.preventDefault();
        console.log("tanken")
        var id = $('#id').val();
        $.ajax({
            type: "TANKEN",
            url: "api.php?id=" + id,
            dataType: "JSON",
            success: function (response) {
                console.log("tanken success");
                showMeldung(response);
            }
        });
    });



});