var dayLables;
var monthLables;

if (currentLang == "da") {
    dayLables = ['S&oslash;', 'Ma', 'Ti', 'On', 'To', 'Fr', 'L&oslash;'];
    monthLables = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    curDateFormat = 'dd-mm-yy';
}
if (currentLang == "en") {
    dayLables = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    monthLables = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    curDateFormat = 'mm/dd/yy';
}


$.datepicker.setDefaults({
    showOn: 'both',
    buttonImageOnly: true,
    buttonImage: 'calendar.gif',
    buttonText: 'Calendar',
    dayNamesMin: dayLables,
    firstDay: 1,
    monthNames: monthLables,
    buttonImageOnly: true,
    dateFormat: curDateFormat,
    buttonImage: '/gfx/icon_cal.png',
    both: 'button'
});