<?php
if ($request['method'] === 'GET') {
  if (!isset($_SESSION['cart_id'])){
    $response['body'] =[];
    send($response);
  }
  else{
    $cartId  = $_SESSION['cart_id'];
    $cartGetSql = "SELECT * FROM `cartItems` WHERE `cartId` = $cartId";
    $cartGetRes = mysqli_query($link, $cartGetSql);
    $output = [];
    while ($row = mysqli_fetch_assoc($res)) {
      array_push($output, $row);
    }
    $response['body'] = $output;
    send($response);
  }
}
  if ($request['method'] === 'POST') {
    $product = $request['body']['productId'];
    if (!isset($product)) {
      throw new ApiError("'$product' is not a valid ID",400);
    }
    $link = get_db_link();
    $sqlPrice = "SELECT `price` FROM `products` WHERE `productId` = $product";
    $sqlTime = "INSERT INTO `carts` (`createdAt`) VALUES (CURRENT_TIMESTAMP)";
    $resPrice = mysqli_query($link, $sqlPrice);
    $resTime = mysqli_query($link, $sqlTime);
    $timeInsertId = mysqli_insert_id($link);
    $sqlCartInsert = "INSERT INTO `cartItems` (`cartId`, `productId`, `price`) VALUES ($timeInsertId, $product, $price)";
    $resCartInsert = mysqli_query($link, $sqlCartInsert);
    $cartInsertId = mysqli_insert_id($link);
    $resCartJoin = "SELECT cartItems.cartItemId, products.productId,products.name,products.price,products.image,products.shortDescription FROM cartItems INNER JOIN products ON cartItems.productId=products.productId";
    $response['body'] = mysqli_query($link, $resCartJoin);
    $_SESSION['cart_id'] = $timeInsertId;
    send($response);
  }
