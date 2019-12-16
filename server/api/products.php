<?php

if ($request['method'] === 'GET') {
  $id = $_GET['productId'];
  $link = get_db_link();
  if(!empty($id)){
    $products = get_single_product($link, $id);
  }
  else{
    $products = get_all_products($link);
  }
  $response['body'] = $products;
  send($response);
}
function get_single_product($link, $id){
  $product = $_GET['productId'];
  if ($product >= 1) {
    $sql = "SELECT * FROM `products` WHERE `productId`=$id";
    $res = mysqli_query($link, $sql);
    $output = mysqli_fetch_assoc($res);
  } else if ($product <= 0) {
    throw new ApiError("ID '$id' is not valid.", 400);
  }
  if (count($output) === 0) {
    throw new ApiError("Product with ID '$id' does not exist.", 404);
  }
  return $output;
}
function get_all_products($link){
    $sql = "SELECT `productId`, `name`, `price`, `image`, `shortDescription` FROM `products`";
    $res = mysqli_query($link, $sql);
    $output = [];
    while ($row = mysqli_fetch_assoc($res)) {
      array_push($output, $row);
    }

  return $output;
}
send($response);
