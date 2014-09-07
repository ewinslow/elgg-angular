<?php
namespace Elgg\Storage;

class EntitiesQuery {
	public function __construct(array $options) {
		unset($options['count']);
		
		$this->options = $options;
	}
	
	public function getItems() {
		return elgg_get_entities($this->options);
	}
	
	public function map($callback) {
		return array_map($callback, $this->getItems());
	}
	
	public function count() {
		$options = array_merge(array(), $this->options);
		$options['count'] = true;
		
		return elgg_get_entities($options);
	}
}