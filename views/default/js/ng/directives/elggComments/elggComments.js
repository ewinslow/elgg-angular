define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            controller: function($scope, elgg, elggResourceFactory) {
                var url = elgg.normalize_url('/elgg-api/me');
                
                this.me = elggResourceFactory.create(url);
                
                // Initialized by template code -- too magical?
                this.comments = null;
                
                this.submit = function() {
                    this.comments.post(this.newReply);
                    
                    this.newComment = {};
                };
            },
            controllerAs: 'ctrl',
            scope: {
                'entity': '=',
            },
            template: require('text!./elggComments.html'),
        };
    };
});