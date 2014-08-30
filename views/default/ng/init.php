<script>
define('ng/init', function(require) {
	var angular = require('angular');
	
	angular.bootstrap(document, [
		// TODO build this list dynamically with PHP for per-app customization
		require('elgg/http/ng').name,
		// require('elgg/likes/ng').name,
		require('elgg/menus/ng').name,
		require('ng/modules/elgg').name,
		require('ng/modules/moment').name,
	]);
});
require(['ng/init']);
</script>
