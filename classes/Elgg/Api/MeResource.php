<?php
namespace Elgg\Api;

use Elgg\Exception;

/**
 * @UrlTemplate(/me)
 */
class MeResource {
	public function __construct() {
		$this->session = new Session();
	}
	
	public function get() {
		$user = $this->session->getUser();
		if (!$user) {
			throw new Exception\NotFound();
		}
		
		return elgg_entity_resource($user);
	}
}
