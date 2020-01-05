<?php
/**
 * Created by PhpStorm.
 * User: sanzhikee
 * Date: 2020-01-05
 * Time: 17:42
 */
namespace console\controllers;

use yii\console\Controller;

class TestController extends Controller
{
    public function actionIndex() {
        echo "test\n";
    }
}
