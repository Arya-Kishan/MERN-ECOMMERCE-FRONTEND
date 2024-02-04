// A mock function to mimic making an async request for data

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
    const data = await response.json()
    resolve({ data })
  });
}


export function AddCategory(category) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://my-mern-ecommerce.vercel.app/categories", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(category)
    })
    const data = await response.json()
    resolve({ data })
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
    const data = await response.json()
    resolve({ data })
  });
}

export function updateUserRole(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/user/${user.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: user.role })
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchSortedOrders(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order?sort=${order}`)
    const data = await response.json()
    resolve({ data })
  });
}