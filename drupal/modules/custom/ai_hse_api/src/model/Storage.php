<?php

namespace Drupal\ai_hse_api\model;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;

class Storage
{
//    static function queryTerms($vid)
//    {
//        $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid, 0, NULL, TRUE);
//        return $terms;
//    }

    static function queryNode(string $nodeType, int $page = 0, int $items_per_page = 10, array  $sort = []): array
    {
        $storage = \Drupal::entityTypeManager()->getStorage('node');
        $query = $storage->getQuery();
        $queryTotal = $storage->getQuery();
        $query->condition('type', $nodeType);
        $queryTotal->condition('type', $nodeType);
        if ($sort) {
            $query->sort($sort['field'], $sort['type']);
        }
        $ids = $query
            ->condition('status', 1)
            //->sort($sort['field'], $sort['type'])
            ->range($page * $items_per_page, $items_per_page)
            ->execute();

        $total = $queryTotal
            ->condition('status', 1)
            ->count()
            ->execute();

        return array(
            'data' => $storage->loadMultiple($ids),
            'total' => intval($total)
        );
    }

    /**
     * @throws InvalidPluginDefinitionException
     * @throws PluginNotFoundException
     */
    static function queryTaxonomy(string $taxonomyId, array $sort = [], int $page = 0, int $items_per_page = 10)
    {
        $storage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
        $query = $storage->getQuery();
        $queryTotal = $storage->getQuery();

        $query->condition('vid', $taxonomyId);
        $queryTotal->condition('vid', $taxonomyId);

        $query->condition('status', 1);
        if ($sort) {
            $query->sort($sort['field'], $sort['type']);
        }

        $ids = $query->execute();

        $total = $queryTotal
            ->condition('status', 1)
            ->range($page * $items_per_page, $items_per_page)
            ->count()
            ->execute();

        return array(
            'data' => $storage->loadMultiple($ids),
            'total' => intval($total)
        );
    }

    /**
     * @throws InvalidPluginDefinitionException
     * @throws PluginNotFoundException
     */
    static function queryTerm(string $taxonomyId, int $termId)
    {
        $storage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
        $query = $storage->getQuery();
        $queryTotal = $storage->getQuery();

        $query->condition('vid', $taxonomyId);
        $queryTotal->condition('vid', $taxonomyId);

        $query->condition('tid', $termId);
        $queryTotal->condition('tid', $termId);

        $id = $query
            ->condition('status', 1)
            ->execute();

        $total = $queryTotal
            ->condition('status', 1)
            ->count()
            ->execute();

        return array(
            'data' => $storage->loadMultiple($id),
            'total' => intval($total)
        );
    }

}