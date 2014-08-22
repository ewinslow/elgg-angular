// <script>
define(function(require) {
	var angular = require('angular');

	<?php echo file_get_contents(__DIR__ . "/../../../../../bower_components/angular-sanitize/angular-sanitize.js"); ?>
	
	return angular.module('ngSanitize');
});
