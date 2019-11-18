<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $message = check_connection($link);
  $response['body'] = [
    'message' => $message
  ];
  send($response);
}
function check_connection($link)
{
  $sql = "SELECT productId,name,price,image,shortDescription FROM products";
  $res = mysqli_query($link,$sql);
  $output =[];
  while ($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
  }
  // $link->query($sql);
  return $output;
}
send($response);
