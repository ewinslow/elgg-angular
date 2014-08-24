<?php
namespace Elgg\Api;

class MenuResource {
	public function __construct($matches) {
		$this->menu = $matches[1];
	}
	
	function get() {
		return elgg_menu_resource($this->menu);
	}	
}
