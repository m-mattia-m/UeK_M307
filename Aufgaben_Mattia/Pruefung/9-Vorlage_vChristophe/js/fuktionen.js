function saveAuto() {
    send = true;

}

if (isFloat(betankungen)) {
    send = false;
}
if (betankungen < 0) {
    send = false;
}
if (name.length < 3) {
    console.log('zu klein, mindestens 3 Zeichen');
    $('#name').addClass('orange lighten-4');
    M.toast({ html: 'Name bitte min. 3 Zeichen lang', classes: 'red black-text' });
    send = false;
}
if (name.length > 255) {
    $('#name').addClass('orange lighten-4');
    M.toast({ html: 'Name bitte max. 255 Zeichen', classes: 'red black-text' });
    send = false;
}

