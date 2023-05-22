<?php

namespace Drupal\ai_hse_api\model;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Core\Entity\Query\QueryInterface;
use Drupal\user\Entity\User;

class Storage
{
    private const DATE_FORMAT = 'Y-m-d';
    private const dontEditThoseKeys = ['nid', 'tid', 'title', 'changed', 'created', 'name'];


    /**
     * @param array $filterParams
     * @param string $entityTypeId
     * @param string $bundle
     * @return array
     */
    private static function equalizeReceivingKeysWithDbKeysAndAddFieldTypes(array  $filterParams, string $entityTypeId,
                                                                            string $bundle): array
    {
        $entityFieldManager = \Drupal::service('entity_field.manager');
        $fieldDefinitions = $entityFieldManager->getFieldDefinitions($entityTypeId, $bundle);
        $filterParamsEdited = [];

        foreach ($filterParams as $key => $value) {
            if (!in_array($key, self::dontEditThoseKeys))
                $key = 'field_' . $key;
            $filterParamsEdited[$key] = ['value' => $value, 'type' => $fieldDefinitions[$key]->getType()];
            if ($filterParamsEdited[$key]['type'] == 'entity_reference')
                $filterParamsEdited[$key]['isTaxonomy'] =
                    ($fieldDefinitions[$key]->getSettings()['handler'] == 'default:taxonomy_term');

        }

        return $filterParamsEdited;
    }

    /**
     * @param array $filterParams
     * @param QueryInterface $query
     * @param QueryInterface $queryTotal
     * @param string $lang
     * @return void
     */
    private static function filter(array $filterParams, QueryInterface $query, QueryInterface $queryTotal, string $lang): void
    {
        foreach ($filterParams as $key => $param) {
            switch ($param['type']) {
                case 'bigint':
                case 'integer':
                case 'decimal':
                    self::filterNumber($param['value'], $query, $key, $queryTotal);
                    break;
                case 'entity_reference':
                    $id = $param['isTaxonomy'] ? 'tid' : 'nid';
                    $bids = array_map('intval', $param['value']);
                    $query->condition($key . '.entity.' . $id, $bids, 'IN');
                    $queryTotal->condition($key . '.entity.' . $id, $bids, 'IN');
                    break;
                case 'datetime':
                    self::filterDateTime($param['value'], $query, $key, $queryTotal);
                    break;
                case 'boolean':
                    $query->condition($key, $param['value'] == '1');
                    $queryTotal->condition($key, $param['value'] == '1');
                    break;
                case 'string':
                case 'text_long':
                case 'string_long':
                case 'email':
                    $query->condition($key, $param['value'], 'CONTAINS', $lang);
                    $queryTotal->condition($key, $param['value'], 'CONTAINS', $lang);
                    break;
            }
        }
    }

    /**
     * @param $value
     * @param QueryInterface $query
     * @param string $key
     * @param QueryInterface $queryTotal
     * @return void
     */
    private static function filterDateTime($value, QueryInterface $query, string $key, QueryInterface $queryTotal): void
    {
        if (is_array($value)) {
            if (array_key_exists('start', $value)
                && \DateTime::createFromFormat(self::DATE_FORMAT, $value['start'])
                && array_key_exists('to', $value)
                && \DateTime::createFromFormat(self::DATE_FORMAT, $value['end'])) {
                $query->condition($key . '.value', [$value['start'],
                    $value['end']], 'BETWEEN');
                $queryTotal->condition($key . '.value', [$value['start'],
                    $value['end']], 'BETWEEN');
            } elseif (array_key_exists('start', $value)
                && \DateTime::createFromFormat(self::DATE_FORMAT, $value['start'])) {
                $query->condition($key . '.value', $value['start'], '>=');
                $queryTotal->condition($key . '.value', $value['start'], '>=');
            } elseif (array_key_exists('end', $value)
                && \DateTime::createFromFormat(self::DATE_FORMAT, $value['end'])) {
                $query->condition($key . '.value', $value['end'], '<=');
                $queryTotal->condition($key . '.value', $value['end'], '<=');
            }
        } elseif (\DateTime::createFromFormat(self::DATE_FORMAT, $value)) {
            $query->condition($key . '.value', $value);
            $queryTotal->condition($key . '.value', $value);
        }
    }

    /**
     * @param $value
     * @param QueryInterface $query
     * @param string $key
     * @param QueryInterface $queryTotal
     * @return void
     */
    private static function filterNumber($value, QueryInterface $query, string $key, QueryInterface $queryTotal): void
    {
        if (is_array($value)) {
            if (array_key_exists('start', $value)
                && array_key_exists('end', $value)) {
                $query->condition($key, [$value['start'], $value['end']], 'BETWEEN');
                $queryTotal->condition($key, [$value['start'], $value['end']], 'BETWEEN');
            } elseif (array_key_exists('start', $value)) {
                $query->condition($key, $value['start'], '>=');
                $queryTotal->condition($key, $value['start'], '>=');
            } elseif (array_key_exists('end', $value)) {
                $query->condition($key, $value['end'], '<=');
                $queryTotal->condition($key, $value['end'], '<=');
            }
        } else {
            $query->condition($key, $value);
            $queryTotal->condition($key, $value);
        }
    }

    /**
     * @throws InvalidPluginDefinitionException
     * @throws PluginNotFoundException
     */
    static function queryData(string $bundle, array $filterParams, string $lang, int $page = 0, int $items_per_page = 10,
                              array  $sort = [], string $entityTypeId = 'node'): array
    {
        $storage = \Drupal::entityTypeManager()->getStorage($entityTypeId);
        $query = $storage->getQuery();
        $queryTotal = $storage->getQuery();
        $query->condition($entityTypeId == 'node' ? 'type' : 'vid', $bundle);
        $queryTotal->condition($entityTypeId == 'node' ? 'type' : 'vid', $bundle);

        $filterParams = self::equalizeReceivingKeysWithDbKeysAndAddFieldTypes($filterParams, $entityTypeId, $bundle);
        self::filter($filterParams, $query, $queryTotal, $lang);

        if ($sort) {
            $query->sort($sort['field'], $sort['type']);
        }

        $ids = $query
            ->condition('status', 1)
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


    static function getAdminsEMails(): array
    {
        $ids = \Drupal::entityQuery('user')
          ->condition('status', 1)
          ->condition('roles', 'administrator')
          ->execute();
        $users = User::loadMultiple($ids);
        $emails = [];
        foreach($users as $user) {
          if($email = $user->get('mail')->getString()) {
            $emails[] = $email;
          }
        }
        return $emails;
    }
}
