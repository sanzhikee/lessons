<?php
namespace api\controllers;

use yii\filters\ContentNegotiator;
use yii\filters\VerbFilter;
use yii\rest\Controller;
use yii\web\Response;

class SiteController extends Controller
{
    public function behaviors()
    {
        return [
            'contentNegotiator' => [
                'class' => ContentNegotiator::className(),
                'formats' => [
                    'application/json' => Response::FORMAT_JSON,
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        return [
            'test' => true
        ];
    }
}
