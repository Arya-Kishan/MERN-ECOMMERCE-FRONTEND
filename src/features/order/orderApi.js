import axios from "axios";
import { toast } from "react-toastify";

export function AddOrder(order) {
  return new Promise(async (resolve, reject) => {
    console.log(order);
    try {
      const { data } = await axios.post("/order", order)
      console.log(data);
      toast("ORDER PALCED")
      resolve({ data })
    } catch (error) {
      console.log("ORDER NOT PLACED");
      toast("ORDER NOT PLACED")
      reject({ data: null })
    }

  });
}


export function fetchOrder(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/order/${userId}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function deleteOrder(orderId) {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.delete(`/order/${orderId}`)
      console.log(data);
      toast(`ORDER DELETED ${orderId}`)
      resolve({ data })
    } catch (error) {
      console.log("ORDER NOT DELETED");
      toast("ORDER NOT DELETED")
      reject({ data: null })
    }

  });
}

// DELETING ALL CART ITEM OF USER
export function deleteAllUserCartItem(userId) {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.delete(`/cart/user/${userId}`)
      resolve({ data })
    } catch (error) {
      console.log("CART NOT DELETED AFTER ORDER PLACED");
      reject({ data: null })
    }

  });
}

// SENDING MAIL FOR ORDER PLACED
export function mailOrderReceipt(order) {
  return new Promise(async (resolve, reject) => {
    console.log(order);
    try {
      const { data } = await axios.post(`/order/mailOrder`, order)
      console.log(data);
      toast(`EMAIL SEND FOR ORDER`)
      resolve({ data })
    } catch (error) {
      console.log("MAIL NOT SEND FOR ORDER");
      toast("MAIL NOT SEND FOR ORDER")
      reject({ data: null })
    }

  });
}