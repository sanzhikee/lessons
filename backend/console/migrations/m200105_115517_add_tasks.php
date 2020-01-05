<?php

use yii\db\Migration;

/**
 * Class m200105_115517_add_tasks
 */
class m200105_115517_add_tasks extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('tasks', [
            'id' => $this->primaryKey(),
            'title' => $this->string(255)->notNull(),
            'is_completed' => $this->boolean()->defaultValue(false),
            'created_date' => $this->timestamp()->defaultExpression('NOW()'),
            'updated_date' => $this->timestamp()->defaultValue("1970-01-01 00:00:01")->null()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('tasks');
    }
}
