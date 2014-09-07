<?php
namespace Elgg\Storage;

use Elgg\Exception;

class Entities {
	
	public function get($guid, $type = NULL, $subtype = NULL) {
		$entity = get_entity($guid);
		
		if (!elgg_instanceof($entity, $type, $subtype)) {
			throw new Exception\NotFound();
		}
		
		return $entity;
	}
	
	public function find(array $options) {
		return new EntitiesQuery($options);
	}
	
	public function create(array $attributes) {

		$type = $attributes['type'];
		unset($attributes['type']);
		
		switch ($type) {
			case 'object':
				$entity = new \ElggObject();
				break;
			case 'user':
				$entity = new \ElggUser();
				break;
			case 'group':
				$entity = new \ElggGroup();
				break;
			case 'site':
				$entity = new \ElggSite();
				break;
			default:
				throw new Exception\BadRequest("'$type' is not a valid ElggEntity type");
		}		
		
		foreach ($attributes as $property => $value) {
			$entity->$property = $value;
		}
		
		$entity->save();
		
		return $entity;
	}
}