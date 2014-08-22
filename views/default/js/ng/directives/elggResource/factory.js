// <script>
define(function(require) {
	/**
	 * @ngInject
	 */
	return function(elggResourceFactory, $parse, elgg) {
        return {
            restrict: 'E',
            link: function($scope, $element, $attrs) {
            	var aliasExpression = $parse($attrs['as'] || '$resource');
            	
            	$attrs.$observe('src', function updateResource(src) {
            		aliasExpression.assign(
            		    $scope, elggResourceFactory.createAndGet(
            		        elgg.normalize_url(src)));
            	});
            }
        };
    };
});