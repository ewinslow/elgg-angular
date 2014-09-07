<?php
namespace Elgg\Api;

class Session {
	public function getUser() {
		return elgg_get_logged_in_user_entity();
	}
}