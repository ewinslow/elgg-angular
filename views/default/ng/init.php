<script>
define('ng/init', function(require) {
	var angular = require('angular');
	
	angular.bootstrap(document, [
		require('ng/modules/elgg').name,
		require('ng/modules/moment').name,
		// TODO build this list dynamically with PHP for per-page customization
	]);
});
require(['ng/init']);
</script>
