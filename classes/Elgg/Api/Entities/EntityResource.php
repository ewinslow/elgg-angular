<?php
namespace Elgg\Api\Entities;

use Elgg\Storage\Entities;

/**
 * @UrlTemplate(/entities/{guid})
 */
class EntityResource {
	public function __construct($matches) {
		$this->guid = $matches[1];
		
		$this->entities = new Entities();
	}
	
	public function get() {
		$entity = $this->entities->get($this->guid);
		
		return elgg_entity_resource($entity);
	}
}