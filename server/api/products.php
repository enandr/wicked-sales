<?php

if ($request['method'] === 'GET' || $request['method'] === 'get') {
  $id = $_GET['productId'];
  $link = get_db_link();
  $products = get_all_products($link,$id);
  $response['body'] = $products;
  send($response);
}
function get_all_products($link,$id)
{
  if ($_GET['productId'] >= 1) {
    $sql = "SELECT * FROM `products` WHERE `productId`=$id";
    $res = mysqli_query($link, $sql);
    $output = mysqli_fetch_assoc($res);
  }
  else if ($_GET['productId'] <= 0 && !empty($id)){
    throw new ApiError("ID '$id' is not valid.", 400);
  }
  else{
    $sql = "SELECT `productId`, `name`, `price`, `image`, `shortDescription` FROM `products`";
    $res = mysqli_query($link, $sql);
    $output = [];
    while ($row = mysqli_fetch_assoc($res)) {
      array_push($output, $row);
    }
  }
  if (count($output)===0){
    throw new ApiError("Product with ID '$id' does not exist.", 404);
  }
  return $output;
}
send($response);
