<?php
// For Gergo
error_reporting(E_ALL);
ini_set('display_errors', 1);

$table = "flappyBirdCenter";

include 'config.inc.php';
$a = $_GET['a'];

switch($a)
{
  case "get":
    get();
    break;
  case "save":
    save();
    break;
  case "create":
    create(untouchedTable());
    break;
}

function db_connect()
{
  global $database_host, $database_user, $database_pass, $group_dbnames, $table;
  $conn = new mysqli($database_host, 
                     $database_user, 
                     $database_pass, 
                     $group_dbnames[0]);
  if($conn->connect_error)
  {
    trigger_error('Database connection failed.', E_USER_ERROR);
  }
  return $conn;  
}

function get()
{
  global $table;
  $conn = db_connect();
  
  $sql = "SELECT id, vDistance, noOfJumps, noOfGoodJumps ".
         "FROM " . $table . ";";
  
  $result = $conn->query($sql);
  if($result === false) 
  {
    trigger_error($conn->error);
  }
  
  $data = array();
  while($row = $result->fetch_row())
  {
    $data[] = array_map('intval',$row);
  }
  echo json_encode($data);
  $conn->close();
}

function save()
{
  global $table;
  $data = json_decode($_POST['data']);
  
  $sql = "DROP TABLE IF EXISTS " . $table . ";";
  $conn = db_connect();
  
  if($conn->query($sql) === false) 
  {
    trigger_error($conn->error);
  }
  
  $conn->close();
  
  create($data);
}


function create($data)
{
  global $group_dbnames, $table;
  $conn = db_connect();
  
  $sql = "SELECT count(*) AS a FROM information_schema.TABLES WHERE (TABLE_SCHEMA = '" . $group_dbnames[0] . "') AND (TABLE_NAME = '" . $table . "')";
  
  $result = $conn->query($sql);
  if($result === false) {
    trigger_error($conn->error);
  }
  
  if($result->fetch_row()[0] == 0){
    $sql = "CREATE TABLE IF NOT EXISTS " . $table . " ".
           "(".
             "id INT(8) NOT NULL PRIMARY KEY AUTO_INCREMENT, ".
             "vDistance INT(8), ".
             "noOfJumps INT(8), ".
             "noOfGoodJumps INT(8) ".
           "); \n";
    if($conn->query($sql) === false) {
      trigger_error($conn->error);
      die;
    }
    
    $sql = "INSERT INTO " . $table . " ".
             "(vDistance, noOfJumps, noOfGoodJumps) ".
           "VALUES ";

    foreach($data as $i => $row) {
      $sql .= "(" . implode(", ", $row) . ")" .
              ((count($data) - 1 != $i) ? ", " : ";");
    }
    
    if($conn->query($sql) === false) {
      trigger_error($conn->error);
      die;
    }
  }
  
  $conn->close();
}




function untouchedTable()
{


  $data = array();


  for($vDistance = $_GET["vDistance_min"]; $vDistance < $_GET["vDistance_max"];
                                           $vDistance += $_GET["vDistance_step"]) {

            $data[] = array($vDistance, 1, 1);
  }

  return $data;
}

?>
