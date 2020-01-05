<?php
/**
 * Created by PhpStorm.
 * User: sanzhikee
 * Date: 2020-01-05
 * Time: 18:31
 */
namespace api\controllers;

use common\services\TodoService;
use yii\filters\auth\CompositeAuth;
use yii\filters\ContentNegotiator;
use yii\rest\Controller;
use yii\web\Response;

class TodoController extends Controller
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
            'authenticator' => [
                'class' => CompositeAuth::className(),
            ],
        ];
    }
    /**
     * @var array
     */
    public $data = [];
    
    /**
     * @param $action
     * @return bool
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\BadRequestHttpException
     */
    public function beforeAction($action)
    {
        $this->data = \Yii::$app->request->getBodyParams();
        
        return parent::beforeAction($action);
    }
    
    /**
     * @param $page
     * @param $size
     * @return array
     */
    public function actionIndex($page, $size)
    {
        return [
            'data' => TodoService::getTasks($size, $page)
        ];
    }
    
    /**
     * @return array
     */
    public function actionCreate()
    {
        return [
            'success' => TodoService::addTask($this->data['title'])
        ];
    }
    
    /**
     * @return array
     */
    public function actionUpdate()
    {
        return [
            'success' => TodoService::updateTask($this->data['id'], $this->data['title'], $this->data['is_completed'])
        ];
    }
    
    /**
     * @return array
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public function actionDelete()
    {
        return [
            'success' => TodoService::deleteTask($this->data['id'])
        ];
    }
}
