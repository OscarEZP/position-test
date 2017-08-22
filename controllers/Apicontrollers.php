<?php

class Apicontrollers
{
    public function postData($data){

        $db = Connect();

        for($i=0;$i<count($data); $i++){

            $data[$i]['completed'] = $data[$i]['completed'] == 'true' ? 1 : 0;

            $sql = "INSERT INTO events(user_id, id, title, completed) VALUES ('".$data[$i]['userId']."', '".$data[$i]['id']."', '".$data[$i]['title']."', '".$data[$i]['completed']."')";

            $response = mysqli_query($db, $sql);
        }
        if($response){

            $all = $this->getCountAll();
            $list = $this->getListEvents();


            echo json_encode(array("message" => "Data agregada", "status_code" => "200", "total" => $all[0]['total'], "list" => $list));

        }else{
            echo json_encode(array("message" => "Ha ocurrido un error, por favor intentelo más tarde", "status_code" => "201"));
        }
    }

    public function getCountAll(){
        $db = Connect();

        $sql = "SELECT COUNT(*) as total FROM `events`";

        $result = mysqli_query($db, $sql) or die(mysqli_error($db));

        $data = array();

        while($row = mysqli_fetch_array($result)){

            array_push($data, $row);
        }
        return $data;

    }

    public function getListEvents(){
        $db = Connect();

        $sql = "SELECT SUM(completed = 0) as no, SUM(completed = 1) as yes, user_id FROM `events` GROUP BY user_id";

        $result = mysqli_query($db, $sql) or die(mysqli_error($db));

        $data = array();

        while($row = mysqli_fetch_array($result)){

            array_push($data, $row);
        }
        return $data;
    }
}