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
                this.replies = null;
                
                this.submit = function() {
                    this.replies.post(this.newReply);
                    
                    this.newReply = {};
                };
            },
            controllerAs: 'ctrl',
            scope: {
                'topic': '=',
            },
            template: require('text!./elggDiscussionReplies.html'),
        };
    };
});