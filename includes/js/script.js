// Holidays JSON_data is mapped here
var disabledDates = holidays.map(function (holiday) {
    return holiday.date;

});

var start = moment(), end = moment('2025-12-31');
var weekends = [];
var checkinDates = [];
var notCheckinDates = [];
var checkoutDates = [];
var noCheckoutDates = [];
var current = start.clone();
while (current.isBefore(end)) {
    if (current.format('ddd') == 'Sun' || current.format('ddd') == 'Sat') {
        weekends.push(current.format('YYYY-MM-DD'));
    }
    if (checkinDates.length) {
        var lastCheckinMonth = moment(checkinDates[checkinDates.length - 1]).format('MM');
        if (lastCheckinMonth == current.format('MM')) {
            notCheckinDates.push(current.format('YYYY-MM-DD'));
        }
        else {
            if (current.format('ddd') == 'Sun' || current.format('ddd') == 'Sat' || disabledDates.includes(current.format('YYYY-MM-DD'))) {
                notCheckinDates.push(current.format('YYYY-MM-DD'));
            } else {
                checkinDates.push(current.format('YYYY-MM-DD'));
            }
        }
    }
    else if (current.format('DD') > '10') {
        notCheckinDates.push(current.format('YYYY-MM-DD'));
    }
    else {
        if (current.format('ddd') == 'Sun' || current.format('ddd') == 'Sat' || disabledDates.includes(current.format('YYYY-MM-DD'))) {
            notCheckinDates.push(current.format('YYYY-MM-DD'));
        } else {
            checkinDates.push(current.format('YYYY-MM-DD'));
        }
    }

    if (noCheckoutDates.length) {
        var lastnoCheckoutDate = moment(noCheckoutDates[noCheckoutDates.length - 1]);
        if (lastnoCheckoutDate.format('MM') != current.format('MM')) {
            var addingCheckoutDate = true;
            while (addingCheckoutDate) {
                if (disabledDates.includes(lastnoCheckoutDate.format('YYYY-MM-DD')) || lastnoCheckoutDate.format('ddd') == 'Sun' || lastnoCheckoutDate.format('ddd') == 'Sat') {
                    lastnoCheckoutDate = lastnoCheckoutDate.subtract('1', 'days');
                } else {
                    addingCheckoutDate = false;
                    checkoutDates.push(lastnoCheckoutDate.format('YYYY-MM-DD'));
                }
            }
        }
    }

    noCheckoutDates.push(current.format('YYYY-MM-DD'));
    current = current.add('1', 'days').clone();
}

disabledDates = disabledDates.concat(weekends);

noCheckoutDates = noCheckoutDates.map(function (d) {
    if (!checkoutDates.includes(d)) {
        return d;
    }
});
// console.log( checkoutDates );
// console.log(checkinDates);
// console.log(weekends);
// console.log(disabledDates);

// Here You can change the property of the calendar as per you need
var options = {
    "format": "DD-MM-YYYY",
    "noCheckInDates": notCheckinDates,
    "noCheckOutDates": noCheckoutDates,
    "autoClose": true,
    "minNights": 29,
    //"startOfWeek": "monday",
    "selectForward": true,
    "enableCheckout": true,
    i18n: {
        selected: 'Your stay:',
        night: 'Day',
        nights: 'Days',
        button: 'Close',
        'checkin-disabled': 'Check-in disabled',
        'checkout-disabled': 'Check-out disabled',
        'day-names-short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        'day-names': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'month-names-short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'error-more': 'Date range should not be more than 1 day',
        'error-more-plural': 'Date range should not be more than %d days',
        'error-less': 'Date range should not be less than 1 night',
        'error-less-plural': 'Date range should not be less than %d days',
        'info-more': 'Please select a date range of at least 1 day',
        'info-more-plural': 'Please select a date range of at least %d days',
        'info-range': 'Please select a date range between %d and %d days',
        'info-default': 'Please select a date range'
    }
};
var hdpkr = new HotelDatepicker(document.getElementById('input-id'), options);