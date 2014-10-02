define(function(require) {
    
    /**
     * This assumes that "props" looks like so (like button just an example):
     * {
     *   "pressed": false, // initial state
     *   "href": "...",
     *   "press": {
     *     // Metadata overrides for when the button is in the pressed state
     *     "method": "delete",
     *     "label": "Unlike",
     *     "description": "You, John, and 13 others like this",
     *   },
     *   "unpress": {
     *     // Metadata overrides for when the button is in the unpressed state
     *     "method": "put",
     *     "label": "Like",
     *     "description": "John, Jane, and 13 others like this",
     *   },
     * }
     * 
     * 
     */
	function Ctrl($http, props) {
	    this.$http_ = $http;
	    this.props_ = props;
	}

    var Action = Ctrl.Action = {
        PRESS: 'press',
        UNPRESS: 'unpress',
    };

    var Prop = Ctrl.Prop = {
        HREF: 'href',
        LABEL: 'label',
        METHOD: 'method',
        DATA: 'data',
    };
    
    /**
     * @param {State} state
     * 
     * @return {Promise}
     */
    Ctrl.prototype.click = function() {
    	var method = this.getProp_(Prop.METHOD) || 'get';
    	var url = this.getProp_(Prop.HREF);
    	var data = this.getProp_(Prop.DATA);
    	
    	// Optimistically assume the action will succeed
        this.props_['pressed'] = (this.getAction_() == Action.PRESS);
        
    	return this.$http_({
    	    method: method,
    	    url: url,
    	    data: data,
	    });
    };
    
    /**
     * @return {Action}
     */
    Ctrl.prototype.getAction_ = function() {
        return this.isPressed() ? Action.UNPRESS : Action.PRESS;
    };
    
    /**
     * @return {string}
     */
    Ctrl.prototype.getDescription = function() {
        return this.getProp_(Prop.DESCRIPTION);
    };

    /**
     * @return {string}
     */
    Ctrl.prototype.getLabel = function() {
        return this.getProp_(Prop.LABEL);
    };
    
    /**
     * Prefers the property override from the current state, falling back to
     * the top-level property value.
     * 
     * @param {Prop} prop
     * 
     * @return {*}
     */
    Ctrl.prototype.getProp_ = function(prop) {
        var actionConfig = this.props_[this.getAction_()] || {};
        return actionConfig[prop] || this.props_[prop];
    };
    
    /**
     * @return {boolean}
     */
    Ctrl.prototype.isPressed = function() {
		return !!this.props_['pressed'];
    };
    
	return Ctrl;
});
