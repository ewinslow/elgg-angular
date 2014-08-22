define(function() {
	return function calendarFactory(moment) {
	    return function convertDateStringToAbsoluteTime(dateString) {
	        return moment(new Date(dateString)).calendar();
	    };
	};
})