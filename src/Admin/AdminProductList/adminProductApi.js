// A mock function to mimic making an async request for data
import { toast } from "react-toastify";

export function fetchTotalCount(total) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/count`)
    const data = await response.json()
    resolve({ data })
  });
}

// FETCHING ALL USERS
export function fetchAllUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/user`)
    const data = await response.json()
    resolve({ data })
  });
}

export function AddProduct(product) {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  return new Promise(async (resolve) => {
    const response = await fetch("https://my-mern-ecommerce.vercel.app/product", {
      method: 'POST',
      headers: config,
      body: product
    })
    if (response.ok) {
      const data = await response.json()
      toast("PRODUCT ADDED")
      resolve({ data })
    } else {
      resolve({ data: null })
    }
  });
}


export function AddCategory(category) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://my-mern-ecommerce.vercel.app/categories", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(category)
    })
    if (response.ok) {
      const data = await response.json()
      toast("CATEOGORY ADDED")
      resolve({ data })
    } else {
      toast("ERROR CATEOGORY NOT ADDED")
      resolve({ data: null })
    }
  });
}

export function fetchAllOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order`)
    const data = await response.json()
    resolve({ data })

  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order/${order.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: order.status, itemsId: order.items })
    })
    if (response.ok) {
      const data = await response.json()
      toast("ORDER UPDATED")
      resolve({ data })
    } else {
      toast("ERROR ORDER NOT UPDATED")
      resolve({ data: null })
    }
  });
}

export function updateUserRole(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/user/${user.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: user.role })
    })
    if (response.ok) {
      const data = await response.json()
      toast("ROLE UPDATED")
      resolve({ data })
    } else {
      toast("ERROR ROLE NOT UPDATED")
      resolve({ data: null })
    }
  });
}

export function deleteUser(userId) {
  return new Promise(async (resolve) => {
    console.log("deleting user");
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/user/${userId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    if (response.ok) {
      const data = await response.json()
      toast("USER DELETED")
      resolve({ data })
    } else {
      toast("USER NOT DELETED")
      resolve({ data: null })
    }
  });
}

export function fetchSortedOrders(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order?sort=${order}`)
    const data = await response.json()
    resolve({ data })
  });
}