import { toast } from "react-toastify";

// A mock function to mimic making an async request for data
export function fetchAllProducts(page) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product?limit=8&page=${page.page}&sort=${page.sort}&order=${page.order}`)
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories")
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands")
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchFilteredProducts(filters) {
  return new Promise(async (resolve) => {

    let newFilter = null;

    for (let key in filters) {
      newFilter = `${key}=${filters[key]}`
    }

    const response = await fetch("/product?" + newFilter)
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchProductDetail(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product/${id}`)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateProductById(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product/${product.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(product.products)
    })
    if (response.ok) {
      const data = await response.json()
      toast("Updated")
      resolve({ data })
    } else {
      console.log("CANT LOGIN INVALID CREDENTIALS");
      toast("Not Updated")
      reject({ data: null })
    }
  });
}

export function deleteProduct(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product/${productId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  });
}



// FETCHING PRODUCT REVIEWS BY PRODUCT ID FROM REVIEW COLLECTION
export function createProductReviews(review) {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/review`, {
      method: 'POST',
      headers: config,
      body: review
    })
    const data = await response.json()
    resolve({ data })
  });
}

// FETCHING PRODUCT REVIEWS BY PRODUCT ID FROM REVIEW COLLECTION
export function fetchProductReviewsById(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/review/${productId}`)
    const data = await response.json()
    resolve({ data })
  });
}

// FETCHING RELATED PRODUCT
export function fetchRelatedProducts(category) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product/related/${category}`)
    const data = await response.json()
    resolve({ data })
  });
}