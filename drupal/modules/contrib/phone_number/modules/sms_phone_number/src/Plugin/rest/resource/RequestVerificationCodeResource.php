<?php

namespace Drupal\sms_phone_number\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\rest\ResourceResponse;
use Drupal\sms_phone_number\SmsPhoneNumberUtilInterface;
use Drupal\rest\Plugin\ResourceBase;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Request verification code resource.
 *
 * @RestResource(
 *   id = "request_verification_code",
 *   label = @Translation("SMS Phone Number: request verification code"),
 *   uri_paths = {
 *     "canonical" = "/sms-phone-number/request-code/{number}",
 *   }
 * )
 */
class RequestVerificationCodeResource extends ResourceBase {

  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * The SMS Phone Number field utility.
   *
   * @var \Drupal\sms_phone_number\SmsPhoneNumberUtilInterface
   */
  protected $smsPhoneNumberUtil;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   A current user instance.
   * @param \Drupal\sms_phone_number\SmsPhoneNumberUtilInterface $sms_phone_number_util
   *   The SMS Phone Number field utility.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, AccountProxyInterface $current_user, SmsPhoneNumberUtilInterface $sms_phone_number_util) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->currentUser = $current_user;
    $this->smsPhoneNumberUtil = $sms_phone_number_util;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('sms_phone_number'),
      $container->get('current_user'),
      $container->get('sms_phone_number.util')
    );
  }

  /**
   * Responds send verification code POST request.
   *
   * @param string|null $number
   *   Callable phone number.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The HTTP response object.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   * @throws \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
   * @throws PhoneNumberException
   */
  public function get($number = NULL) {

    if (!$number) {
      throw new BadRequestHttpException('Phone number not provided.');
    }
    $number = "+$number";

    $phone_number = $this->smsPhoneNumberUtil->testPhoneNumber($number);

    if (!$this->smsPhoneNumberUtil->checkFlood($phone_number)) {
      throw new AccessDeniedHttpException('Too many verification attempts, please try again in a few hours.');
    }

    if (!$this->smsPhoneNumberUtil->checkFlood($phone_number, 'sms')) {
      throw new AccessDeniedHttpException('Too many verification code requests, please try again shortly..');
    }

    $message = SmsPhoneNumberUtilInterface::PHONE_NUMBER_DEFAULT_SMS_MESSAGE;
    $code = $this->smsPhoneNumberUtil->generateVerificationCode();
    $token = $this->smsPhoneNumberUtil->sendVerification($phone_number, $message, $code);

    if (!$token) {
      throw new HttpException(500, 'An error occurred while sending sms.');
    }

    return new ResourceResponse(json_encode(['verification_token' => $token]));
  }

}
