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
    const RES_STATUS_OK = 0;
    const RES_STATUS_EMPTY = 1;
    const RES_STATUS_ERROR = 2;
    const ORGANIZATION_ID = 'organization';
    const PROJECT_ID = 'project';
    const RESEARCH_CENTER_ID = 'research_center';
    const PRODUCT_ID = 'product';
    const USE_CASE_ID = 'use_case';
    const REPORT_ID = 'report';
    const PUBLICATION_ID = 'publication';
    const PERSON_ID = 'person';
    const PATENT_ID = 'patent';
    const DATE_FORMAT = 'Y-m-d';
    private int $page = 0;
    private int $psize = 10;
    private string $lang = 'ru';
    private int $status = self::RES_STATUS_EMPTY;
    private int $total = 0;
    private array $data = [];

    private function setBasicProp(Request $request)
    {
        $this->status = self::RES_STATUS_EMPTY;
        $this->lang = $request->get('lang') == 'en' ? 'en' : 'ru';
        $this->page = intval($request->get('page'));
        if ($this->page < 0) $this->page = 0;
        $this->psize = intval($request->get('psize'));
        if ($this->psize <= 0) $this->psize = 10;
    }

    private function setAnswerParams(string $bundle)
    {
        try {
            $items = Storage::queryNode($bundle, $this->page, $this->psize);
            $this->total = $items['total'];
            $this->data = ResultMapper::mapList($items['data'], 'node',
                $bundle, $this->lang);
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
}


