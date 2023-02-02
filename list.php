<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");

    include "config.php";
    
    sleep(1);
    $default_limit = 9;
    $limit = $_REQUEST["limit"] ?? $default_limit;
    $offset = $_REQUEST["offset"] ?? 0;

    $con = new mysqli($host,$user,$pass,$db);

    $se = "SELECT count(id) from $table";
    $consulta = $con->prepare($se);
    $consulta->bind_result($length);
    $consulta->execute();
    $consulta->fetch();
    $consulta->close();

    $data["total"] = $length;
    $se = "SELECT * from $table LIMIT $offset, $limit";
    $consulta = $con->query($se);
    
    $matrix = [];
    while($row = $consulta->fetch_array())
    {
        $matrix[] = $row;
    }

    $data["list"] = $matrix;

    $URL_pattern=explode("?",$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"])[0];

    $new_offset = $offset + $limit;
    if($new_offset < $length)
    {
        $next_offset = $new_offset;
        if($new_offset + $limit > $length)
        {
            $next_limit = $length - $new_offset;
        }else{
            $next_limit = $limit;
        }
        $data["next"] = $URL_pattern."?offset=$next_offset&limite=$next_limit";
    }else{
        $data["next"] = "null";
    }

    $new_offset = $offset - $limit;

    if($offset==0)
    {
        $data["previous"]="null";
    }else{
        if($new_offset > 0)
        {
            $previous_limit = $default_limit;
            $new_offset = $offset - $default_limit;
            $previous_offset = $new_offset;
        }else{
            $previous_limit = $offset;
            $previous_offset = 0;
        }
        $data["previous"] = $URL_pattern."?offset=$previous_offset&limite=$previous_limit";
    }
    
    echo json_encode($data);
?>