define(function(require) {
	var Resource = require('./Resource');
	
	function ResourceFactory($http) {
		this.$http_ = $http;
	}
	
	ResourceFactory.prototype = {
		create: function(src) {
			var resource = new Resource(src, this.$http_);
			resource.get();
			return resource;
		}
	};
	
	return ResourceFactory;
});