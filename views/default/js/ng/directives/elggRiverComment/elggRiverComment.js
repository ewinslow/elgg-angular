// <script>
define(function(require) {
	return function() {
		return {
			restrict: 'A',
			replace: true,
			template: require("text!./elggRiverComment.html"),
			controller: require('./ElggRiverCommentCtrl'),
			scope: {
				comment: '='
			}
		};
	};
});
