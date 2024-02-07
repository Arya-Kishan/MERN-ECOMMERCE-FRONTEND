import axios from "axios";
import { toast } from "react-toastify";

export function AddCartItem(cartItem) {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.post("/cart", cartItem)
      console.log(data);
      resolve({ data })
    } catch (error) {
      console.log("CART NOT ADDED");
      toast("CART NOT ADDED")
      reject({ data: null })
    }


  });
}

export function fetchCartItems(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/cart/${userId}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function deleteCartItem(cartId) {
  return new Promise(async (resolve, reject) => {
    console.log("deleting cart");
    try {
      const { data } = await axios.delete(`/cart/${cartId}`)
      resolve({ data })
    } catch (error) {
      toast("CART NOT DELETED")
      reject({ data: null })
    }

  });
}


export function updateCartItem(cart) {
  return new Promise(async (resolve, reject) => {
    console.log("UPDATING CART ");
    try {
      const { data } = await axios.patch(`/cart/${cart.id}`, { quantity: cart.quantity })
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}