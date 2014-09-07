define(function() {
	/**
	 * @ngInject
	 */
	function Resource(src, $http) {
		this.src_ = src;
		this.$http_ = $http;
	}
	
	Resource.prototype = {
		get content() {
			return this.content_;
		},
		
		// FOR BC ONLY. USE .content instead!
		get data() {
			return this.content_;
		},
		
		get error() {
			return this.error_;	
		},
		
		get: function() {
			this.isGetting_ = true;
			this.error_ = null;
			
			return this.$http_.get(this.src_).then(function handleGetSuccess(response) {
				this.content_ = response.data;
				this.isGetting_ = false;
			}.bind(this), function handleGetError(error) {
				this.error_ = error || true;
				this.isGetting_ = false;
			}.bind(this));
		},
		
		isGetting: function() {
			return this.isGetting_;
		},
		
		post: function(data) {
			this.isPosting_ = true;
			
			this.content.items.push(data);
			this.content.count++;
			
			return this.$http_.post(this.src_, data).then(function handlePostSuccess(response) {
				this.isPosting_ = false;
				this.get();
			}.bind(this), function handlePostError(error) {
				this.isPosting_ = false;
			}.bind(this));
		},
		
		isPosting: function() {
			return this.isPosting_;
		},
	};
	
	return Resource;
});
