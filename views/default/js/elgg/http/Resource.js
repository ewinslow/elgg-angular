define(function() {
	/**
	 * @ngInject
	 */
	function Resource(src, $http) {
		this.src_ = src;
		this.$http_ = $http;
	}
	
	Resource.prototype = {
		get data() {
			return this.data_;
		},
		
		get error() {
			return this.error_;	
		},
		
		get: function() {
			this.isGetting_ = true;
			this.error_ = null;
			
			this.$http_.get(this.src_).then(function handleGetResponse(response) {
				this.data_ = response.data;
				this.isGetting_ = false;
			}.bind(this), function handleGetError(error) {
				this.error_ = error || true;
				this.isGetting_ = false;
			}.bind(this));
		},
		
		isGetting: function() {
			return this.isGetting_;
		}
	};
	
	return Resource;
});
