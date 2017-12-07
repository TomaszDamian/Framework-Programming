<?php
    //PHP script written by Filip Ekström/Tromodolo
    //https://github.com/Tromodolo/

    if(isset($_POST['userName']) && isset($_POST['userScore'])){
	
        $user = $_POST['userName'];
        $score = $_POST['userScore'];

        $file = file_get_contents('./userScores.json', true);

        $data = json_decode($file, true);
        //you need to add new data as next index of data.
        $data[] = array('user' => $user, 'score' => $score);
	
        $result = json_encode($data, 128);
	
        file_put_contents('./userScores.json', $result);

        die();
    }
?>
