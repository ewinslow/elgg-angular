<?php
namespace Elgg\Api\Discussions\Discussion;

use Elgg\Api\Session;
use Elgg\Exception;
use Elgg\Storage\Activities;
use Elgg\Storage\Entities;


/**
 * @UrlTemplate(/discussions/{container_guid}/replies)
 */
class RepliesResource {
	public function __construct($matches) {
		$this->container_guid = $matches[1];
		
		$this->entities = new Entities();
		$this->activities = new Activities();
		$this->session = new Session();
	}
	
	public function get(stdClass $input) {
		$replies = $this->entities->find(array(
			'type' => 'object',
			'subtype' => 'discussion_reply',
			'container_guid' => $this->container_guid,
			'reverse_order_by' => true,
			'full_view' => true,
			'limit' => $input->limit,
		));

		return array(
			'count' => $replies->count(),
			'items' => $replies->map(function($reply) {
				return elgg_entity_resource($reply);
			}),
		);
	}
	
	public function post($input) {
		$topic = $this->entities->get($this->container_guid, 'object', 'groupforumtopic');
		
		$reply = $this->entities->create(array(
			'type' => 'object',
			'subtype' => 'discussion_reply',
			'description' => $input->description,
			'access_id' => $topic->access_id,
			'container_guid' => $topic->guid,
		));

		return elgg_entity_resource($reply);
	}
}