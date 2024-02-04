// A mock function to mimic making an async request for data

export function fetchTotalCount(total) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/count`)
    const data = await response.json()
    resolve({ data })
  });
}

// FETCHING ALL USERS
export function fetchAllUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/user`)
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
    const response = await fetch("http://localhost:8080/product", {
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
    const response = await fetch("http://localhost:8080/categories", {
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
    const response = await fetch(`http://localhost:8080/order`)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/order/${order.id}`, {
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
    const response = await fetch(`http://localhost:8080/user/${user.id}`, {
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
    const response = await fetch(`http://localhost:8080/order?sort=${order}`)
    const data = await response.json()
    resolve({ data })
  });
}