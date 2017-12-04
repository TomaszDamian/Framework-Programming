<?php
    //If the IP of the connection doesn't match the Server IP, kill the connection
    if($_SERVER['SERVER_ADDR'] !== $_SERVER['REMOTE_ADDR']){
        die();
    }

    if(isset($_POST['userName']) && isset($_POST['userScore'])){
        $user = $_POST['userName'];
        $score = $_POST['userScore'];

        $file = file_get_contents('./userScores.json', true);
        $data = json_decode($file, true);
        unset($file);
        //you need to add new data as next index of data.
        $data[] = array('user' => $user, 'score' => $score);
        $result=json_encode($data, 128);
        file_put_contents('./userScores.json', $result);
        unset($result);
        die();
    }
?>
