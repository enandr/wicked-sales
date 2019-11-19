<?php

if ($request['method'] === 'GET' || $request['method'] === 'get') {
  $link = get_db_link();
  $products = get_all_products($link);
  $response['body'] = $products;
  send($response);
}
function get_all_products($link)
{
  $sql = "SELECT productId,name,price,image,shortDescription FROM products";
  $res = mysqli_query($link,$sql);
  $output =[];
  while ($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
  }
  return $output;
}
send($response);
