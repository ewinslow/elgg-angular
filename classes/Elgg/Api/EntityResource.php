<?php
namespace Elgg\Api;

class EntityResource {
	public function __construct($matches) {
		$this->entity_guid = $matches[1];
	}
	
	public function get() {
		$entity = get_entity($this->entity_guid);
		
		return elgg_entity_resource($entity);
	}
}