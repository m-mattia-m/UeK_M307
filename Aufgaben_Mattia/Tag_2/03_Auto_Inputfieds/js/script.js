$(document).ready(function() {
    var date = new Date(); 
    $('#footer-content').html('Copyright © ' + date.getFullYear() + ' Mattia Müggler');

    M.textareaAutoResize($('#textarea1'));

    $('select').formSelect();

    $('.datepicker').datepicker();

    $('.datepicker').datepicker();
});
