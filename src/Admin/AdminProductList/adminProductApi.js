// A mock function to mimic making an async request for data
export function AddProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://my-mern-ecommerce.vercel.app/product", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(product)
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

export function fetchSortedOrders(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://my-mern-ecommerce.vercel.app/order?sort=${order}`)
    const data = await response.json()
    resolve({ data })
  });
}