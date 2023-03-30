<?php

namespace Drupal\ai_hse_api\model;

use Drupal\image\Entity\ImageStyle;
use Drupal\Core\Url;
use Drupal\Component\Utility\UrlHelper;

class ResultMapper
{
    private const unneededParagraphFieldIds = ["uuid", "revision_id", "langcode", "type", "status", "created",
        "parent_id", "parent_type", "parent_field_name", "behavior_settings", "default_langcode", "revision_default",
        "revision_translation_affected"];

    private static function mapLinkField($link)
    {
        if ($link->uri)
            $res['url'] = Url::fromUri($link->uri)->toString();
        if ($link->title)
            $res['text'] = $link->title;
        return $res;
    }

    private static function mapFileField($file)
    {
        $file_entity = \Drupal\file\Entity\File::load($file->get('target_id')->getValue());
        $res['url'] = \Drupal::service('file_url_generator')->generateAbsoluteString($file_entity->getFileUri());
        $res['description'] = $file->get('description')->getValue();
        return $res;
    }

    private static function mapTerm($term, string $lang = 'ru')
    {
        if ($term->hasTranslation($lang)) {
            $term = $term->getTranslation($lang);
        }
        $res['id'] = intval($term->id());
        $res['name'] = $term->getName();
        $res['bundle'] = $term->bundle();
        if ($term->getDescription())
            $res['description'] = $term->getDescription();
        return $res;
    }

    private static function mapNode($item, string $lang = 'ru')
    {
        if ($item->hasTranslation($lang)) {
            $item = $item->getTranslation($lang);
        }
        $res['id'] = intval($item->id());
        $res['name'] = $item->getTitle();
        $res['bundle'] = $item->bundle();
        return $res;
    }

    private static function mapParagraph($entity, string $lang): array
    {
        $fieldIds = array_diff(array_keys($entity->getFieldDefinitions()),
            self::unneededParagraphFieldIds);
        return self::mapItem($entity, $fieldIds, $lang);

    }

    private static function mapFieldByType($fieldEntity, string $fieldType, int $fieldCount, string $lang = 'ru'): array
    {
        $values = [];
        for ($i = 0; $i < $fieldCount; $i++) {
            switch ($fieldType) {
                case 'link':
                    $values[] = self::mapLinkField($fieldEntity->get($i));
                    break;
                case 'file':
                    $values[] = self::mapFileField($fieldEntity->get($i));
                    break;
                case 'entity_reference':
                    if ($fieldEntity->getFieldDefinition()->getSettings()['handler'] == 'default:taxonomy_term') {
                        $values[] = self::mapTerm($fieldEntity->referencedEntities()[$i],
                            $lang);
                    } elseif ($fieldEntity->getFieldDefinition()->getSettings()['handler'] == 'default:node') {
                        $values[] = self::mapNode($fieldEntity->referencedEntities()[$i],
                            $lang);
                    }
                    break;
                case 'entity_reference_revisions':
                    if ($fieldEntity->getFieldDefinition()->getSettings()['handler'] == 'default:paragraph') {
                        $values[] = self::mapParagraph($fieldEntity->referencedEntities()[$i],
                            $lang);
                    }
                    break;
                    case 'image':
                        $imgUri = $fieldEntity->get(0)->entity->getFileUri();
                        $values[] = ImageStyle::load('slider_photo')->buildUrl($imgUri);
                    break;
                case 'bigint':
                case 'integer':
                case 'boolean':
                case 'string':
                case 'text_long':
                case 'string_long':
                case 'datetime':
                case 'email':
                case 'decimal':
                    //default:
                    $values[] = $fieldEntity->get($i)->value;
                    break;
            }
        }
        return $values;
    }

    private static function isNumber(string $fieldType): bool
    {
        $numberTypes = ['bigint', 'integer', 'decimal'];
        return in_array($fieldType, $numberTypes);
    }

    private static function mapItem($item, array $fields, string $lang)
    {
        if ($item->hasTranslation($lang)) {
            $item = $item->getTranslation($lang);
        }
        $mappedItem = [];
        foreach ($fields as $field) {
            $fieldEntity = $item->get($field);
            $fieldCount = $fieldEntity->count();
            $key = str_replace('field_', '', $field);
            //$fieldType = $fieldEntity->getFieldDefinition()->get('field_type');
            $fieldType = $fieldEntity->getFieldDefinition()->getType();
            $mappedItem[$key]['label'] = $fieldEntity->getFieldDefinition()->getLabel();
            if (self::isNumber($fieldType) && $suffix = $fieldEntity->getFieldDefinition()->getSettings()['suffix'])
                $mappedItem[$key]['suffix'] = $suffix;
            $mappedItem[$key]['value'] = self::mapFieldByType($fieldEntity, $fieldType, $fieldCount, $lang);
            $mappedItem[$key]['type'] = $fieldEntity->getFieldDefinition()->getType();
        }
        return $mappedItem;
    }

    public static function mapList($list, string $entityType, string $bundle, string $lang, string $viewMode): array
    {
        $fieldsContent = \Drupal::service('entity_display.repository')
            ->getViewDisplay($entityType, $bundle, $viewMode)->get('content');
        $fieldsContent = array_combine(array_keys($fieldsContent), array_column($fieldsContent, 'weight'));
        unset($fieldsContent['uid']);
        unset($fieldsContent['created']);
        asort($fieldsContent);
        $fields = array_keys($fieldsContent);
        array_unshift($fields, $entityType == 'node' ? 'nid' : 'tid');
        $mappedList = [];
        foreach ($list as $item) {
            $mappedList[] = self::mapItem($item, $fields, $lang);
        }
        return $mappedList;
    }

    public static function mapFilterOptions($list, string $lang): array
    {
        $mappedList = [];
        foreach ($list as $item) {
            $mappedList[] = self::mapFilterOption($item, $lang);
        }
        return $mappedList;
    }

    private static function mapFilterOption($item, string $lang)
    {
        if ($item->hasTranslation($lang)) {
            $item = $item->getTranslation($lang);
        }
        return ['id' => intval($item->id()), 'label' => $item->getName()];
    }
}