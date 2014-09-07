define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            controller: function(elgg, elggResourceFactory) {
                var url = elgg.normalize_url('/elgg-api/me');
                
                this.me = elggResourceFactory.create(url);
            },
            controllerAs: 'ctrl',
            scope: {
                'entity': '=',
            },
            template: require('text!./elggComments.html'),
        };
    };
});