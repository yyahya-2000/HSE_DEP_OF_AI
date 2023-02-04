<?php

namespace Drupal\bigint\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Plugin\Field\FieldFormatter\IntegerFormatter;

/**
 * Plugin implementation of the 'Default' formatter for 'bigint' fields.
 *
 * @FieldFormatter(
 *   id = "bigint_item_default",
 *   label = @Translation("Default"),
 *   field_types = {
 *     "bigint"
 *   }
 * )
 */
class BigIntItemDefaultFormatter extends IntegerFormatter {

  /**
   * {@inheritdoc}
   */
  protected function numberFormat($number) {
    $number = (string) $number;
    return strrev(implode($this->getSetting('thousand_separator'), str_split(strrev($number), 3)));
  }

}
