define(function() {
	return function fromNowFactory(moment) {
	    return function convertDateStringToRelativeTime(dateString) {
	        return moment(new Date(dateString)).fromNow();
	    };
	};
});
