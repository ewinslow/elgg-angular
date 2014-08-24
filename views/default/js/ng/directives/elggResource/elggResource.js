define(function(require) {
	/**
	 * @ngInject
	 */
	return function(elggResourceFactory, $parse, elgg) {
        return {
            restrict: 'E',
            scope: true,
            link: function($scope, $element, $attrs) {
            	var aliasExpression = $parse($attrs['as'] || '$resource');
            	
            	$attrs.$observe('src', function updateResource(src) {
            		aliasExpression.assign(
            		    $scope, elggResourceFactory.createAndGet(
            		        elgg.normalize_url('/elgg-api' + src)));
            	});
            }
        };
    };
});