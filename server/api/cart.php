<?php
$link = get_db_link();


  if ($request['method'] === 'GET') {
    $cartId  = getCartId($link);
    $response['body'] = getCartItems($link, $cartId);
    send($response);
  }

  if ($request['method'] === 'POST') {
    $product = $request['body']['productId'];
    if(!empty($request['body']['discount'])){
      $discount = $request['body']['discount'];
    }
    else{
      $discount = null;
    }
    if (!empty($request['body']['hasDiscount'])) {
      $hasDiscount = $request['body']['hasDiscount'];
      terminal_log($hasDiscount);
    } else {
      $hasDiscount = false;
    }
    $cartId = getCartId($link);
    $addedItem = addToCart($link, $cartId, $product,$discount,$hasDiscount);
    $response['body'] = $addedItem;
    send($response);
  }

  if ($request['method'] === 'DELETE'){
    $product = $request['body']['productId'];
    deleteFromCart($link, $product);
    $response['body'] = "Item Deleted";
    send($response);
  }
  // !---------------------------
  function getPrice($link, $product){
    if (!isset($product)) {
      throw new ApiError("'$product' is not a valid ID", 400);
    }
    $sqlPrice = "SELECT `price` FROM `products` WHERE `productId` = $product";
    $resPrice = mysqli_query($link, $sqlPrice);
    $resPrice =  mysqli_fetch_assoc($resPrice);
    if (!isset($resPrice)) {
      throw new ApiError("ID '$product' could not be found", 404);
    }
    return $resPrice;
  }

  function newCart($link){
    $sqlTime = "INSERT INTO `carts` (`createdAt`) VALUES (CURRENT_TIMESTAMP)";
    mysqli_query($link, $sqlTime);
    $cartId = $link->insert_id;
    $_SESSION['cart_id'] = $cartId;
    return $cartId;
  }

  function addToCart($link, $cartId, $product,$discount,$hasDiscount){
    terminal_log($discount);
    if ($discount === null){
    $price = getPrice($link, $product);
    $price = $price['price'];
    }
    else{
      $price = $discount;
    }
    // $price = $price['price'];
    $sqlCartInsert = "INSERT INTO `cartItems` (`cartId`, `productId`, `price`,`hasDiscount`) VALUES ($cartId, $product, $price,$hasDiscount)";
    mysqli_query($link, $sqlCartInsert);
    $insertId = $link -> insert_id;
    $resCartJoinSql = "SELECT cartItems.cartItemId, products.productId,products.name,products.price,products.image,products.shortDescription FROM cartItems INNER JOIN products ON cartItems.productId=products.productId WHERE `cartItemId` = $insertId";
    $addedItemRes = mysqli_query($link, $resCartJoinSql);
    $response = mysqli_fetch_assoc($addedItemRes);
    return $response;
  }

  function getCartId($link){
    if (!isset($_SESSION['cart_id'])) {
      $cartId = newCart($link);
    } else {
      $cartId  = $_SESSION['cart_id'];
    }
    return $cartId;
  }

  function getCartItems($link,$cartId){
    $cartGetSql = "SELECT cartItems.cartItemId, products.productId,products.name,cartItems.price,products.image,products.shortDescription,cartItems.hasDiscount FROM cartItems INNER JOIN products ON cartItems.productId=products.productId WHERE `cartId` = $cartId";
    $cartGetRes = mysqli_query($link, $cartGetSql);
    $output = [];
    while ($row = mysqli_fetch_assoc($cartGetRes)) {
      array_push($output, $row);
    }
    return $output;
  }

  function deleteFromCart($link, $product){
    $itemDeleteSql = "DELETE FROM cartItems WHERE cartItemId = $product";
    mysqli_query($link, $itemDeleteSql);
  }
