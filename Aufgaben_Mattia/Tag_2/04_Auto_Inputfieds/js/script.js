$(function () {
    // footer with year
    var date = new Date(); 
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    // load list
    $('data-table').load("sites/table.html", function () {
        $.getScript("js/table.js", function () { });
    });



    // M.textareaAutoResize($('#textarea1'));

    // $('select').formSelect();

    // $('.datepicker').datepicker();

    // $('.timepicker').timepicker();


});

