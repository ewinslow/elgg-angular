define(function(require) {
	/**
	 * @ngInject
	 */
    return function(moment) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
            	$attrs.$observe('datetime', function(datetime) {
            		var datetimeMoment = moment(datetime);
	                if (datetimeMoment) {
	                	$element.html(datetimeMoment.fromNow());
	                    $element.attr('title', datetimeMoment.format('LLLL'));
	                }
            	});

                $element.addClass('elgg-timestamp');
            }
        };
    };
});