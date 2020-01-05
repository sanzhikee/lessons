<?php
/**
 * Created by PhpStorm.
 * User: sanzhikee
 * Date: 2020-01-05
 * Time: 18:23
 */

namespace common\services;

use common\models\Task;

/**
 * Сервис для работы с задачами (чтение, запись в бд)
 *
 * Class TodoService
 * @package common\services
 */
class TodoService
{
    /**
     * Функция скервиса для добавляения задачи в бд
     *
     * @param string $title
     * @return bool
     */
    public static function addTask($title)
    {
        $newTask = new Task([
            'title' => $title
        ]);
        
        return $newTask->save();
    }
    
    /**
     * @param integer $id
     * @param string $title
     * @param boolean $is_completed
     * @return bool
     */
    public static function updateTask($id, $title, $is_completed)
    {
        $newTask = Task::findOne($id);
        $newTask->title = $title;
        $newTask->is_completed = $is_completed;
        $newTask->updated_date = date('Y-m-d H:i:s');
    
        return $newTask->save();
    }
    
    /**
     * @param integer $id
     * @return boolean
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public static function deleteTask($id)
    {
        return (Task::findOne($id))->delete();
    }
    
    /**
     * @param int $size
     * @param int $page
     * @return Task[]
     */
    public static function getTasks($size = 5, $page = 1)
    {
        $tasks = Task::find()
            ->limit($size)
            ->offset($page - 1)
            ->all();
        
        return $tasks;
    }
}
