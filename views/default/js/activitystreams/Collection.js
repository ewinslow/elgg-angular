define(function(require) {
	var elgg = require('elgg');
	var $ = require('jquery');
	
	function Collection(obj) {
		$.extend(this, obj);
		
		this.totalItems = this.totalItems || 0;
		this.items = this.items || [];
		this.loadingNextItems = null;
	}

	// Private member functions
	function appendItem(item) {
		this.items.push(item);
	}
	
	function appendCollection(collection) {
		this.totalItems = collection.totalItems;
		collection.items.forEach(appendItem, this);
		this.links.next = collection.items.length ? collection.links.next : null;
	}
	
	function resetLoadingNext() {
		this.loadingNextItems = null;
	}
	
	// Public member functions
	Collection.prototype.loadNextItems = function() {
		if (!this.hasNextItems()) {
			throw new Error('There are no more items to load!');
		}
		
		if (this.loadingNextItems) {
			// Loading in progress. Don't trigger two loads at once!
			return this.loadingNextItems;
		}
		
		return this.loadingNextItems = elgg.getJSON(this.links.next.href).
			done(appendCollection.bind(this)).
			always(resetLoadingNext.bind(this));
	};
	
	Collection.prototype.hasNextItems = function() {
		return !!(this.links && this.links.next);
	};
	
	Collection.prototype.isLoadingNextItems = function() {
		return !!this.loadingNextItems;
	}
	
	Collection.prototype.getOldestPublishedTime = function() {
		return this.items.map(function(object) { 
			return object.published; 
		}).sort()[0];
	};
	
	Collection.prototype.indexOfEntity = function(entity) {
		var index = -1;
		
		this.items.forEach(function(item, idx) {
			if (item.guid == entity.guid) {
				index = idx;
			}
		});
		
		return index;
	};
	
	Collection.prototype.indexOfAnnotation = function(annotation) {
		var index = -1;
		
		this.items.forEach(function(item, idx) {
			if (item.annotation_id == annotation.annotation_id) {
				index = idx;
			}
		});
		
		return index;
	};

	return Collection;
});