<?php

namespace Drupal\ai_hse_api\Controller;

use Drupal\ai_hse_api\model\ResultMapper;
use Drupal\ai_hse_api\model\Storage;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;

class APIController extends ControllerBase
{
    private const RES_STATUS_OK = 0;
    private const RES_STATUS_EMPTY = 1;
    private const RES_STATUS_ERROR = 2;
    private const ORGANIZATION_ID = 'organization';
    private const PROJECT_ID = 'project';
    private const RESEARCH_CENTER_ID = 'research_center';
    private const PRODUCT_ID = 'product';
    private const USE_CASE_ID = 'use_case';
    private const REPORT_ID = 'report';
    private const PUBLICATION_ID = 'publication';
    private const PERSON_ID = 'person';
    private const PATENT_ID = 'patent';
    private const AI_TOOLS_ID = 'tools_ai';
    private const STAKEHOLDERS_TAX_ID = 'stakeholders';
    private const AI_METHOD_TAX_ID = 'method_ai';
    private const AI_DOMAIN_TAX_ID = 'domain_ai';
    private const FINANCING_SOURCES_TAX_ID = 'financing_sources';
    private const BUSINESS_PROCESSES_CATEGORIES_TAX_ID = 'business_processes_categories';
    private const PRODUCT_CATEGORY_TAX_ID = 'product_category';
    private const LOCATIONS_TAX_ID = 'locations';
    private const NATIONAL_GOALS_TAX_ID = 'national_goals';
    private const APPLICATION_AREA_TAX_ID = 'application_area';
    private const BARRIERS_TAX_ID = 'barriers';
    private const ORG_SIZE_TAX_ID = 'org_size';
    private const PERSON_ROLE_TAX_ID = 'person_roles';
    private const LINKED_TECH_TAX_ID = 'linked_tech';
    private const USAGE_MODEL_TAX_ID = 'usage_model';
    private const ORG_FUNC_STATUS_TAX_ID = 'org_func_statuse';
    private const MRL_TAX_ID = 'mrl';
    private const STAGE_TAX_ID = 'stage';
    private const IRL_TAX_ID = 'irl';
    private const TRL_TAX_ID = 'trl';
    private const CRL_TAX_ID = 'crl';
    private const EFFECTS_TAX_ID = 'effects';
    private const ORG_ROLE_TAX_ID = 'org_role';
    private const SLIDER_ID = 'slider';

    private int $page = 0;
    private int $psize = 10;
    private string $lang = 'ru';
    private int $status = self::RES_STATUS_EMPTY;
    private int $total = 0;
    private array $data = [];
    private array $filterParams = [];
    private string $viewMode = 'default';

    private function setBasicProp(Request $request)
    {
        $this->status = self::RES_STATUS_EMPTY;
        $this->lang = $request->get('lang') == 'en' ? 'en' : 'ru';
        $this->page = intval($request->get('page'));
        $this->filterParams = array_diff_key($request->query->all(), array_flip(['lang', 'page', 'psize']));
        if (!key_exists('nid', $this->filterParams) && !key_exists('tid', $this->filterParams)) {
            $this->viewMode = 'teaser';
        }
        if ($this->page < 0) $this->page = 0;
        $this->psize = intval($request->get('psize'));
        if ($this->psize <= 0) $this->psize = 10;
    }

    private function setAnswerParams(string $bundle, string $etityType = 'node')
    {
        try {
            $items = Storage::queryData(bundle: $bundle, filterParams: $this->filterParams, lang: $this->lang,
                page: $this->page, items_per_page: $this->psize, entityTypeId: $etityType);
            $this->total = $items['total'];
            $this->data = ResultMapper::mapList($items['data'], $etityType,
                $bundle, $this->lang, $this->viewMode);
            if (count($this->data)) $this->status = APIController::RES_STATUS_OK;
        } catch (Exception) {
            $this->data = [];
            $this->status = APIController::RES_STATUS_ERROR;
        }
    }

    public function organization(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::ORGANIZATION_ID);


        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function researchCenter(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::RESEARCH_CENTER_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function product(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PRODUCT_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function project(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PROJECT_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function useCase(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::USE_CASE_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function report(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::REPORT_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function publication(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PUBLICATION_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function person(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PERSON_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function patent(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PATENT_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function aiTools(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::AI_TOOLS_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function stakeholders(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::STAKEHOLDERS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function aiMethod(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::AI_METHOD_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function aiDomain(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::AI_DOMAIN_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function financingSources(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::FINANCING_SOURCES_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function businessProcessesCategories(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::BUSINESS_PROCESSES_CATEGORIES_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function productCategory(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PRODUCT_CATEGORY_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function locations(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::LOCATIONS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function nationalGoals(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::NATIONAL_GOALS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function applicationArea(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::APPLICATION_AREA_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function barriers(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::BARRIERS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function orgSize(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::ORG_SIZE_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function personRoles(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::PERSON_ROLE_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function linkedTech(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::LINKED_TECH_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function usageModel(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::USAGE_MODEL_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function orgFuncStatuse(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::ORG_FUNC_STATUS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function stage(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::STAGE_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function irl(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::IRL_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function mrl(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::MRL_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function trl(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::TRL_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function crl(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::CRL_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function effects(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::EFFECTS_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function orgRole(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::ORG_ROLE_TAX_ID, 'taxonomy_term');

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function slider(Request $request): JsonResponse
    {
        $this->setBasicProp($request);
        $this->setAnswerParams(self::SLIDER_ID);

        return new JsonResponse([
            'status' => $this->status,
            'data' => $this->data,
            'total' => $this->total
        ]);
    }

    public function filterFields(Request $request): JsonResponse
    {
        $this->lang = $request->get('lang') == 'en' ? 'en' : 'ru';
        $bundle = $request->get('bundle');

        $fieldsContent = \Drupal::service('entity_display.repository')
            ->getViewDisplay('node', $bundle, 'filter')->get('content');
        $fieldsContent = array_combine(array_keys($fieldsContent), array_column($fieldsContent, 'weight'));
        unset($fieldsContent['uid']);
        unset($fieldsContent['created']);

        asort($fieldsContent);
        $my_node = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', $bundle);

        $answer = array();
        foreach (array_keys($fieldsContent) as $field_name) {
            $fieldInfo = $my_node[$field_name]->toArray();
            $id = str_replace('field_', '', $field_name);
            $type = '';
            $options = [];
            switch ($fieldInfo['field_type']) {
                case 'string':
                case 'text_long':
                case 'email':
                    $type = 'text';
                    break;
                case 'datetime':
                    $type = 'date';
                    break;
                case 'entity_reference':
                    if ($fieldInfo['settings']['handler'] === 'default:node')
                        break;
                    $type = 'multi-select';
                    try {
                        $entityBundle = reset($fieldInfo['settings']['handler_settings']['target_bundles']);
                        $items = Storage::queryData(bundle: $entityBundle, filterParams: $this->filterParams,
                            lang: $this->lang, items_per_page: 50, entityTypeId: 'taxonomy_term');
                        $options = ResultMapper::mapFilterOptions($items['data'], $this->lang);
                    } catch (Exception) {
                        $this->data = [];
                        $this->status = APIController::RES_STATUS_ERROR;
                    }
                    break;
                case 'boolean':
                    $type = 'switch';
                    break;
                case 'decimal':
                case 'integer':
                case 'bigint':
                    $type = 'number';
                    break;

            }
            if ($type === '')
                continue;
            if (!empty($options))
                $answer[] = ['id' => $id, 'label' => $fieldInfo['label'], 'type' => $type, 'options' => $options];
            else
                $answer[] = ['id' => $id, 'label' => $fieldInfo['label'], 'type' => $type];
        }
        return new JsonResponse($answer);
    }
}