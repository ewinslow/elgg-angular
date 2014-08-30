define(function() {
	/**
	 * @ngInject
	 */
	return function(elggResourceFactory, $parse) {
        return {
            restrict: 'E',
            scope: true,
            link: function($scope, $element, $attrs) {
            	var aliasExpression = $parse($attrs['as'] || '$resource');
            	
            	$attrs.$observe('src', function updateResource(src) {
            		aliasExpression.assign($scope, elggResourceFactory.create(src));
            	});
            }
        };
    };
});