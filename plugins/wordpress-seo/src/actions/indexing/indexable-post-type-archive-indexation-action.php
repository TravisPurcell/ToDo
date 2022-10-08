<?php

namespace Yoast\WP\SEO\Actions\Indexing;

use Yoast\WP\SEO\Builders\Indexable_Builder;
use Yoast\WP\SEO\Helpers\Post_Type_Helper;
use Yoast\WP\SEO\Models\Indexable;
use Yoast\WP\SEO\Repositories\Indexable_Repository;
use Yoast\WP\SEO\Values\Indexables\Indexable_Builder_Versions;

/**
 * Reindexing action for post type boiler indexables.
 *
 * @phpcs:disable Yoast.NamingConventions.ObjectNameDepth.MaxExceeded
 */
class Indexable_Post_Type_boiler_Indexation_Action implements Indexation_Action_Interface, Limited_Indexing_Action_Interface {

	/**
	 * The transient cache key.
	 */
	const UNINDEXED_COUNT_TRANSIENT = 'wpseo_total_unindexed_post_type_boilers';

	/**
	 * The post type helper.
	 *
	 * @var Post_Type_Helper
	 */
	protected $post_type;

	/**
	 * The indexable repository.
	 *
	 * @var Indexable_Repository
	 */
	protected $repository;

	/**
	 * The indexable builder.
	 *
	 * @var Indexable_Builder
	 */
	protected $builder;

	/**
	 * The current version of the post type boiler indexable builder.
	 *
	 * @var int
	 */
	protected $version;

	/**
	 * Indexation_Post_Type_boiler_Action constructor.
	 *
	 * @param Indexable_Repository       $repository The indexable repository.
	 * @param Indexable_Builder          $builder    The indexable builder.
	 * @param Post_Type_Helper           $post_type  The post type helper.
	 * @param Indexable_Builder_Versions $versions   The current versions of all indexable builders.
	 */
	public function __construct(
		Indexable_Repository $repository,
		Indexable_Builder $builder,
		Post_Type_Helper $post_type,
		Indexable_Builder_Versions $versions
	) {
		$this->repository = $repository;
		$this->builder    = $builder;
		$this->post_type  = $post_type;
		$this->version    = $versions->get_latest_version_for_type( 'post-type-boiler' );
	}

	/**
	 * Returns the total number of unindexed post type boilers.
	 *
	 * @param int $limit Limit the number of counted objects.
	 *
	 * @return int The total number of unindexed post type boilers.
	 */
	public function get_total_unindexed( $limit = false ) {
		$transient = \get_transient( static::UNINDEXED_COUNT_TRANSIENT );
		if ( $transient !== false ) {
			return (int) $transient;
		}

		\set_transient( static::UNINDEXED_COUNT_TRANSIENT, 0, \DAY_IN_SECONDS );

		$result = \count( $this->get_unindexed_post_type_boilers( $limit ) );

		\set_transient( static::UNINDEXED_COUNT_TRANSIENT, $result, \DAY_IN_SECONDS );

		return $result;
	}

	/**
	 * Creates indexables for post type boilers.
	 *
	 * @return Indexable[] The created indexables.
	 */
	public function index() {
		$unindexed_post_type_boilers = $this->get_unindexed_post_type_boilers( $this->get_limit() );

		$indexables = [];
		foreach ( $unindexed_post_type_boilers as $post_type_boiler ) {
			$indexables[] = $this->builder->build_for_post_type_boiler( $post_type_boiler );
		}

		if ( \count( $indexables ) > 0 ) {
			\delete_transient( static::UNINDEXED_COUNT_TRANSIENT );
		}

		return $indexables;
	}

	/**
	 * Returns the number of post type boilers that will be indexed in a single indexing pass.
	 *
	 * @return int The limit.
	 */
	public function get_limit() {
		/**
		 * Filter 'wpseo_post_type_boiler_indexation_limit' - Allow filtering the number of posts indexed during each indexing pass.
		 *
		 * @api int The maximum number of posts indexed.
		 */
		$limit = \apply_filters( 'wpseo_post_type_boiler_indexation_limit', 25 );

		if ( ! \is_int( $limit ) || $limit < 1 ) {
			$limit = 25;
		}

		return $limit;
	}

	/**
	 * Retrieves the list of post types for which no indexable for its boiler page has been made yet.
	 *
	 * @param int|false $limit Limit the number of retrieved indexables to this number.
	 *
	 * @return array The list of post types for which no indexable for its boiler page has been made yet.
	 */
	protected function get_unindexed_post_type_boilers( $limit = false ) {
		$post_types_with_boiler_pages = $this->get_post_types_with_boiler_pages();
		$indexed_post_types            = $this->get_indexed_post_type_boilers();

		$unindexed_post_types = \array_diff( $post_types_with_boiler_pages, $indexed_post_types );

		if ( $limit ) {
			return \array_slice( $unindexed_post_types, 0, $limit );
		}

		return $unindexed_post_types;
	}

	/**
	 * Returns the names of all the post types that have boiler pages.
	 *
	 * @return array The list of names of all post types that have boiler pages.
	 */
	protected function get_post_types_with_boiler_pages() {
		// We only want to index boiler pages of public post types that have them.
		$public_post_types       = $this->post_type->get_public_post_types( 'object' );
		$post_types_with_boiler = \array_filter( $public_post_types, [ $this->post_type, 'has_boiler' ] );

		// We only need the post type names, not the objects.
		$post_types = [];
		foreach ( $post_types_with_boiler as $post_type_with_boiler ) {
			$post_types[] = $post_type_with_boiler->name;
		}

		return $post_types;
	}

	/**
	 * Retrieves the list of post type names for which an boiler indexable exists.
	 *
	 * @return array The list of names of post types with unindexed boiler pages.
	 */
	protected function get_indexed_post_type_boilers() {
		$results = $this->repository->query()
			->select( 'object_sub_type' )
			->where( 'object_type', 'post-type-boiler' )
			->where_equal( 'version', $this->version )
			->find_array();

		if ( $results === false ) {
			return [];
		}

		$callback = static function( $result ) {
			return $result['object_sub_type'];
		};

		return \array_map( $callback, $results );
	}

	/**
	 * Returns a limited number of unindexed posts.
	 *
	 * @param int $limit Limit the maximum number of unindexed posts that are counted.
	 *
	 * @return int|false The limited number of unindexed posts. False if the query fails.
	 */
	public function get_limited_unindexed_count( $limit ) {
		return $this->get_total_unindexed( $limit );
	}
}
