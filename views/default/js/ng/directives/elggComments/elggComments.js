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
                
                // Initialized by template code -- too magical?
                this.comments = null;
                
                this.newComment = {};
                
                this.submit = function() {
                    this.comments.post({
                        owner: this.me.content,
                        description: this.newComment.description
                    });
                    
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