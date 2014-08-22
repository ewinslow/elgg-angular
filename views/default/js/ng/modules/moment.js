define(function(require) {
	var angular = require('angular');
	var moment = require('moment');
	
	return angular.module('moment', [])
		.value('moment', moment)
		.filter('fromNow', require('ng/filters/fromNow'))
		.filter('calendar', require('ng/filters/calendar'))
});
