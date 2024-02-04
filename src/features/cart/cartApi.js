// A mock function to mimic making an async request for data

export function AddCartItem(cartItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cartItem)
    })
    const data = await response.json()
    resolve({ data })
  });
}


export function fetchCartItems(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart/${userId}`)
    const data = await response.json()
    resolve({ data })
  });
}

export function deleteCartItem(cartId) {
  return new Promise(async (resolve) => {
    console.log("deleting cart");
    console.log(cartId);
    const response = await fetch(`/cart/${cartId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    console.log(data);
    resolve({ data })
  });
}


export function updateCartItem(cart) {
  return new Promise(async (resolve) => {
    console.log(cart);
    const response = await fetch(`/cart/${cart.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ quantity: cart.quantity })
    })
    const data = await response.json()
    resolve({ data })
  });
}