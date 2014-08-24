<?php
namespace Elgg\Api\Users;

class MeResource {
	public function get() {
		return elgg_entity_resource(elgg_get_logged_in_user_entity());
	}
}
