<?php
/**
 * Created by PhpStorm.
 * User: sanzhikee
 * Date: 2020-01-05
 * Time: 18:11
 */
namespace common\models;

use yii\db\ActiveRecord;

/**
 * Class Task
 * @package api\controllers
 *
 * @property integer $id
 * @property string $title
 * @property boolean $is_completed
 * @property string $created_date
 * @property string $updated_date
 */
class Task extends ActiveRecord
{
    public static function tableName()
    {
        return "tasks";
    }
    
    public function rules()
    {
        return [
            ['title', 'required'],
            ['title', 'string', 'min' => 1, 'max' => 255],
            ['is_completed', 'boolean'],
            [['created_date', 'updated_date'], 'safe']
        ];
    }
}
