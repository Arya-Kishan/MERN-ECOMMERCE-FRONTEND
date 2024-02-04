import { toast } from "react-toastify";

export function AddOrder(order) {
  return new Promise(async (resolve) => {
    console.log(order);
    const response = await fetch("https://my-mern-ecommerce.vercel.app/order", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order)
    })
    const data = await response.json()
    toast("Order Placed")
    resolve({ data })
  });
}


export function fetchOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order/${userId}`)
    const data = await response.json()
    resolve({ data })
  });
}

// DELETING ALL CART ITEM OF USER
export function deleteAllUserCartItem(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/cart/user/${userId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  });
}

// SENDING MAIL FOR ORDER PLACED
export function mailOrderReceipt(order) {
  return new Promise(async (resolve) => {
    console.log(order);
    const response = await fetch("https://my-mern-ecommerce.vercel.app/order/mailOrder", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order)
    })
    const data = await response.json()
    toast("Order Placed")
    console.log(data);
    resolve({ data })
  });
}