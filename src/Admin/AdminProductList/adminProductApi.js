// A mock function to mimic making an async request for data
import axios from "axios";
import { toast } from "react-toastify";

export function fetchTotalCount(total) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/count`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

// FETCHING ALL USERS
export function fetchAllUsers() {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.get(`/user`)
      console.log(data);
      resolve({ data })
    } catch (error) {
      console.log("CANT LOGIN INVALID CREDENTIALS");
      toast("INVALID CREDENTIALS")
      reject({ data: null })
    }


  });
}

export function AddProduct(product) {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/product", product, { headers: config })
      console.log("ADDING PRODUCT");
      toast("PRODUCT ADDED")
      resolve({ data })
    } catch (error) {
      console.log("PRODUCT CAN'T ADDED");
      toast("PRODUCT NOT ADDED")
      reject({ data: null })
    }
  });

}


export function AddCategory(category) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/categories", category)
      toast("CATEOGORY ADDED")
      resolve({ data })
    } catch (error) {
      console.log("CATEGORY NOT ADDED");
      toast("ERROR CATEOGORY NOT ADDED")
      reject({ data: null })
    }
  });
}

export function fetchAllOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("/order")
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/order/${order.id}`, { status: order.status, itemsId: order.items })
      toast("ORDER UPDATED")
      resolve({ data })
    } catch (error) {
      toast("ORDER NOT UPDATED")
      reject({ data: null })
    }

  });
}

export function updateUserRole(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/user/${user.id}`, { role: user.role })
      toast("ROLE UPDATED")
      resolve({ data })
    } catch (error) {
      toast("ROLE NOT UPDATED")
      reject({ data: null })
    }
  });
}

export function deleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    console.log("deleting user");
    try {
      const { data } = await axios.delete(`/user/${userId}`)
      toast("USER DELETED")
      resolve({ data })
    } catch (error) {
      toast("USER NOT DELETED")
      reject({ data: null })
    }
  });
}

export function fetchSortedOrders(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/order?sort=${order}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}