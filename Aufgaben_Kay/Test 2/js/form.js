$('.modal').modal(); // initialize modal 

$(document).ready(function () { //datepicker
    $('.datepicker').datepicker();
    // Datum Initialization
    var date = new Date();
    //var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var str = date.toISOString();
    $('#field-date').val(str);

    //$('#mydate').datepicker();
    $('#field-date').datepicker({
        format: 'yyyy-mm-dd',
        setDefaultDate: true,
        firstDay: 1,
        selectMonths: true,
        selectYears: 2,
        i18n: {
            labelMonthNext: 'Nexter Monat',
            labelMonthPrev: 'Vorheriger Monat',
            labelMonthSelect: 'Monat wählen',
            labelYearSelect: 'Jahr wählen',
            months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            monthsLong: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            weekdaysAbbrev: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
            today: 'Heute',
            close: 'schliessen',
            cancel: 'abbrechen',
            clear: 'löschen',
            done: 'wählen'
        }
    });

});

// initialize components
$('select').formSelect();
$('*[data-length]').characterCounter();
M.Range.init($('*[type=range]'));

$('#modal-save').click(function (e) {
    e.preventDefault();

    // get id from input field
    var id = Number($('#field-id').val());

    // get form data
    var name = $('#field-name').val();
    var datum = $('#field-date').val();
    var preis = $('#field-preis').val();
    var kategorie = $('#field-kategorie').val();
    var rating = $('#field-rating').val();
    var stat = $('#field-stat').val();

    // ! Validation
    var isValid = true;

    // requiredFieldIsValid(str: string, fieldname: string): boolean OR fieldIsValid(str: string, fieldname: string): boolean

    if (!requiredFieldIsValid(name, 'Name')) isValid = false;
    if (!requiredFieldIsValid(datum, 'Datum')) isValid = false;
    if (!fieldIsValid(preis, 'Preis')) isValid = false;
    if (!fieldIsValid(kategorie, 'Kategoire')) isValid = false;
    if (!fieldIsValid(rating, 'Rating')) isValid = false;
    if (!fieldIsValid(stat, 'Stat')) isValid = false;

    if (isValid) {
        // close modal here to avoid double submit
        var instance = M.Modal.getInstance($('#modal'));
        instance.close();

        // check for id and update & create
        if (id > 0) {
            // * Update
            $.ajax({
                type: "POST",
                url: "data/api.php?action=update&id=" + id,
                data: {
                    'name': name,
                    'datum': datum,
                    'preis': preis,
                    'kategorie': kategorie,
                    'rating': rating,
                    'stat': stat
                },
                dataType: "json",
                success: function (response) {
                    showResponseToasts(response);
                    getData();
                }
            });
        } else {
            // * Create
            $.ajax({
                type: "POST",
                url: "data/api.php?action=create",
                data: {
                    'name': name,
                    'datum': datum,
                    'preis': preis,
                    'kategorie': kategorie,
                    'rating': rating,
                    'stat': stat
                },
                dataType: "json",
                success: function (response) {
                    showResponseToasts(response);
                    getData();
                }
            });
        }
    }
});

// checks the field if it contains content
// also checks if overflow
function requiredFieldIsValid(str, fieldname) {
    str = String(str);
    str = str.trim(); // trim white spaces
    if (!(str.length > 0 && str.length <= 255 && str != 'null')) {
        showToast('Please check the field ' + fieldname, 'error');
    }
    return (str.length > 0 && str.length <= 255 && str != 'null');
}

function fieldIsValid(str, fieldname) {
    str = String(str);
    str = str.trim(); // trims white spaces
    if (!(str.length <= 255)) {
        showToast('Please check the field ' + fieldname, 'error');
    }
    return (str.length <= 255);
}
