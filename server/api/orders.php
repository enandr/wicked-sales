<?php
$link = get_db_link();
if ($request['method'] === 'POST') {
  $cartId = getCartId();
  $orderInfo = getOrderInfo($request);
  $sendResponse = sendOrder($link, $cartId, $orderInfo);
  $response['body'] = $sendResponse;
  send($response);
}

function getOrderInfo($request){
  if (!isset($request['body']['name'])) throw new ApiError("'name' not recieved", 400);
  if (!isset($request['body']['creditCard'])) throw new ApiError("'creditCard' not recieved", 400);
  if (!isset($request['body']['shippingAddress'])) throw new ApiError("'shippingAddress' not recieved", 400);
  return [
    "name" => $request['body']['name'],
    "address" => $request['body']['shippingAddress'],
    "creditCard" => $request['body']['creditCard']
  ];
}

function getCartId()
{
  if (isset($_SESSION['cart_id'])) {
    $cartId  = $_SESSION['cart_id'];
    return $cartId;
  }
  throw new ApiError("No shopping card exists", 400);
}

function sendOrder($link, $cartId,$orderInfo){
  $statement = mysqli_prepare($link, "INSERT INTO `orders` (`cartId`, `name`, `creditCard`, `shippingAddress`) VALUES (?, ?, ?, ?)");
  $cart = $cartId;
  $name = $orderInfo['name'];
  $cc = $orderInfo['creditCard'];
  $address = $orderInfo['address'];
  mysqli_stmt_bind_param($statement, 'isss', $cart, $name, $cc, $address);
  mysqli_stmt_execute($statement);
  $insertId = $link->insert_id;
  unset($_SESSION['cart_id']);
  return [
    "orderId"=> $insertId
  ];
}
