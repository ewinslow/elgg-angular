<?php
namespace Elgg\Api\Entities\Entity;

use Elgg\Storage\Entities;

/**
 * @UrlTemplate(/discussions/{guid})
 */
class DiscussionsResource {
	public function __construct($matches) {
		$this->container_guid = $matches[1];
		
		$this->session = _elgg_services()->session;
		
		$this->entities = new Entities();
	}
	
	public function get($input) {
		$discussions = $this->entities->find(array(
			'type' => 'object',
			'subtype' => 'groupforumtopic',
			'container_guid' => $this->container_guid,
			'reverse_order_by' => true,
			'full_view' => true,
			'limit' => $input->limit,
		));
		
		return array(
			'count' => $discussions->count($options),
			'items' => $discussions->map(function($discussion) {
				return elgg_entity_resource($discussion);
			}),
		);
	}
	
	public function post($input) {
		$topic = $this->entities->create(array(
			'type' => 'object',
			'subtype' => 'groupforumtopic',
			'title' => $input->title,
			'description' => $input->description,
			'status' => $input->status,
			'access_id' => $input->access_id,
			'container_guid' => $this->container_guid,
		));

		return elgg_entity_resource($topic);
	}
}