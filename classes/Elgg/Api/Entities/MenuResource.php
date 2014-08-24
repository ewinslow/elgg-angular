<?php
namespace Elgg\Api\Entities;

class MenuResource {
	public function __construct($matches) {
		$this->entity_guid = $matches[1];
		$this->menu = $matches[2];
	}
	
	public function get() {
		return elgg_menu_resource($this->menu, array(
			'entity' => get_entity($this->entity_guid),
		));
	}	
}

