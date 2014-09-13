define(function() {
	function Ctrl() {
    	this.entity_ = null;	
    	this.isLiked_ = false;
    }
    
    Ctrl.prototype.isLiked = function() {
    	return this.isLiked_;
    };
    
    Ctrl.prototype.like = function() {
    	this.isLiked_ = true;
    };
    
    Ctrl.prototype.unlike = function() {
    	this.isLiked_ = false;
    }
    
    Ctrl.prototype.init = function(entity) {
    	this.entity_ = entity;
	};
	
	return Ctrl;
})