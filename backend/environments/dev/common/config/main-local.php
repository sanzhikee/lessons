<?php
$dbHost = getenv('DB_HOST');
$dbPort = getenv('DB_PORT');
$dbName = getenv('DB_NAME');
$dbUser = getenv('DB_USERNAME');
$dbPassword = getenv('DB_PASSWORD');

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host='.$dbHost.':'.$dbPort.';dbname='.$dbName,
            'username' => $dbUser,
            'password' => $dbPassword,
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
    ],
];
