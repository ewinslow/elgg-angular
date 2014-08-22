define(function(require) {
	var angular = require('angular');

	<?php echo file_get_contents(__DIR__ . "/../../../../../bower_components/angular-resource/angular-resource.js"); ?>
	
	return angular.module('ngResource');
});
